import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { test } from "node:test"
import ts from "typescript"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

// Usa o TypeScript já instalado para carregar os módulos com o alias do Vite.
const cache = new Map()
function moduleUrl(file) {
  file = resolve(file)
  if (cache.has(file)) return cache.get(file)
  let source = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText
  source = source.replace(
    /(from\s+)["']([^"']+)["']/g,
    (_, prefix, specifier) => {
      if (!specifier.startsWith("@/") && !specifier.startsWith("."))
        return prefix + JSON.stringify(import.meta.resolve(specifier))
      const base = specifier.startsWith("@/")
        ? resolve("src", specifier.slice(2))
        : resolve(dirname(file), specifier)
      const target = [base + ".ts", base + ".tsx"].find(existsSync)
      assert.ok(target, base)
      return prefix + JSON.stringify(moduleUrl(target))
    },
  )
  const url =
    "data:text/javascript;base64," + Buffer.from(source).toString("base64")
  cache.set(file, url)
  return url
}
const { basketHistory, hasCompleteHistory, commonPriceProducts, priceMarkets } =
  await import(moduleUrl("src/business/priceAnalysis.ts"))
const data = {
  Arroz: { A: [10, 12, 14], B: [9, 10, 11] },
  Feijao: { A: [4, 5, 6], B: [3, 4, 5] },
  Leite: { A: [2, 3, 4], C: [2, 2, 3] },
}

test("compara apenas produtos em comum e exige dois mercados", () => {
  assert.deepEqual(commonPriceProducts(data, []), [])
  assert.deepEqual(commonPriceProducts(data, ["A"]), [])
  assert.deepEqual(commonPriceProducts(data, ["A", "B"]), ["Arroz", "Feijao"])
  assert.deepEqual(commonPriceProducts(data, ["A", "B", "C"]), [])
  assert.deepEqual(priceMarkets(data), ["A", "B", "C"])
})
test("combina busca e teto de preço sem incluir produtos ausentes", () => {
  assert.deepEqual(commonPriceProducts(data, ["A", "B"], " ARROZ "), ["Arroz"])
  assert.deepEqual(commonPriceProducts(data, ["A", "B"], "", "5"), ["Feijao"])
  assert.deepEqual(commonPriceProducts(data, ["A", "B"], "leite"), [])
})
test("soma a mesma cesta em todos os períodos e no mercado selecionado", () => {
  const before = JSON.stringify(data)
  assert.deepEqual(
    basketHistory(data, ["Arroz", "Feijao"], "A", 3),
    [14, 17, 20],
  )
  assert.deepEqual(
    basketHistory(data, ["Arroz", "Feijao"], "B", 3),
    [12, 14, 16],
  )
  assert.deepEqual(basketHistory(data, ["Arroz"], "A", 3), [10, 12, 14])
  assert.equal(JSON.stringify(data), before)
})
test("cesta vazia ou incompleta não vira total zero ou parcial", () => {
  assert.equal(basketHistory(data, [], "A", 3), null)
  assert.equal(basketHistory(data, ["Arroz", "Leite"], "B", 3), null)
  assert.equal(basketHistory(data, ["Arroz"], "A", 4), null)
})
test("rejeita lacunas, valores inválidos e preços negativos, aceitando zero registrado", () => {
  for (const series of [
    undefined,
    [],
    [1, 2],
    [1, NaN, 3],
    [1, Infinity, 3],
    [1, -2, 3],
    [1, , 3],
  ]) {
    assert.equal(hasCompleteHistory(series, 3), false)
  }
  assert.equal(hasCompleteHistory([0, 2, 3], 3), true)
})
test("a seção contém duas abas e dois painéis, sem modal nem navegação para calculadora", async () => {
  const { default: PricesScreen } = await import(
    moduleUrl("src/screen/Prices/PricesScreen.tsx")
  )
  const html = renderToStaticMarkup(createElement(PricesScreen))
  assert.equal((html.match(/role="tab"/g) ?? []).length, 2)
  assert.equal((html.match(/role="tabpanel"/g) ?? []).length, 2)
  assert.equal((html.match(/<h1/g) ?? []).length, 1)
  assert.ok(html.includes("Por produto") && html.includes("Por cesta"))
  assert.ok(html.includes('hidden=""'))
  assert.ok(html.includes("Selecione pelo menos dois mercados"))
  assert.ok(!html.includes("Calcular Compras") && !html.includes("Voltar"))
})

const { productPriceMarkets, searchPriceProducts } = await import(
  moduleUrl("src/business/priceAnalysis.ts")
)
test("descobre somente mercados com preço válido do produto buscado", () => {
  assert.deepEqual(productPriceMarkets(data, "Leite"), ["A", "C"])
  assert.deepEqual(productPriceMarkets(data, "Inexistente"), [])
  const incomplete = {
    Produto: {
      Vazio: [],
      Invalido: [NaN],
      Negativo: [-1],
      Gratis: [0],
      Valido: [3],
    },
  }
  assert.deepEqual(productPriceMarkets(incomplete, "Produto"), [
    "Gratis",
    "Valido",
  ])
})
test("busca global funciona sem selecionar mercados e ignora acentos e maiúsculas", () => {
  const catalog = { ...data, Café: { A: [2, 3] }, "Sem histórico": { A: [] } }
  assert.deepEqual(searchPriceProducts(catalog, "  CAFE "), ["Café"])
  assert.deepEqual(searchPriceProducts(catalog, "leite"), ["Leite"])
  assert.deepEqual(searchPriceProducts(catalog, ""), [])
  assert.deepEqual(searchPriceProducts(catalog, "sem histórico"), [])
  assert.deepEqual(searchPriceProducts(catalog, "desconhecido"), [])
})

const { filterPriceMonths } = await import(
  moduleUrl("src/business/priceAnalysis.ts")
)
test("datas filtram meses inclusivos, inclusive intervalos abertos e invertidos", () => {
  const months = ["2026-01", "2026-02", "2026-03"]
  const selected = filterPriceMonths(data, months, "2026-02-15", "2026-03-10")
  assert.deepEqual(selected.months, ["2026-02", "2026-03"])
  assert.deepEqual(selected.data.Arroz.A, [12, 14])
  assert.deepEqual(
    filterPriceMonths(data, months, "", "2026-02-01").data.Arroz.A,
    [10, 12],
  )
  assert.deepEqual(
    filterPriceMonths(data, months, "2026-03-01", "").data.Arroz.A,
    [14],
  )
  assert.deepEqual(filterPriceMonths(data, months, "2027-01-01", "").months, [])
  assert.deepEqual(
    filterPriceMonths(data, months, "2026-03-10", "2026-03-01").months,
    [],
  )
  assert.deepEqual(filterPriceMonths(data, months).data.Arroz.A, [10, 12, 14])
  assert.deepEqual(commonPriceProducts(selected.data, ["A", "B"], "", "10"), [
    "Feijao",
  ])
})
