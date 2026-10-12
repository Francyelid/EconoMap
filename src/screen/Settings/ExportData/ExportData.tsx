import { exportDataClasses, exportDataStyles } from "./ExportData.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import { PRICE_DATA } from "@/mocks/PRICE_DATA"

type ExportDataProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ExportData({ isOpen, onClose }: ExportDataProps) {
  const pal = dmPalette(useDark())
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "xlsx">(
    "csv",
  )

  const [exportFields, setExportFields] = useState([
    "compras",
    "precos",
    "estoque",
    "lista",
  ])

  const toggleExportField = (f: string) =>
    setExportFields((p) =>
      p.includes(f) ? p.filter((x) => x !== f) : [...p, f],
    )

  const [exportDateFrom, setExportDateFrom] = useState("")

  const [exportDateTo, setExportDateTo] = useState("")

  const exportAllProducts = Object.keys(PRICE_DATA)

  const exportAllMarkets = [
    "Atacadão Sul",
    "Feira Livre Central",
    "Supermercado Bom Preço",
    "Mercadinho do Bairro",
    "Hortifruti Verde Vida",
  ]

  const [exportProducts, setExportProducts] = useState<string[]>([])

  const [exportMarkets, setExportMarkets] = useState<string[]>([])

  const [exportProdSearch, setExportProdSearch] = useState("")

  const toggleExportProd = (p: string) =>
    setExportProducts((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    )

  const toggleExportMkt = (m: string) =>
    setExportMarkets((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    )

  if (!isOpen) return null

  return (
    <div
      className={sharedClasses.overlay}
      style={sharedStyles.dialogOverlay}
      onClick={onClose}
    >
      <div
        className={sharedClasses.sheet}
        style={exportDataStyles.sheet(pal)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle + header */}
        <div
          className={exportDataClasses.header}
          style={exportDataStyles.header(pal)}
        >
          <div
            className={sharedClasses.compactDialogHandle}
            style={sharedStyles.handle(pal)}
          />
          <div className={sharedClasses.alignedRow}>
            <div
              className={exportDataClasses.icon}
              style={sharedStyles.greenMutedBackground(pal)}
            >
              ⬇️
            </div>
            <div>
              <h3
                className={sharedClasses.formTitle}
                style={sharedStyles.sectionTitle(pal)}
              >
                Exportar Dados
              </h3>
              <p
                className={sharedClasses.metadata}
                style={sharedStyles.secondaryText(pal)}
              >
                Configure os filtros e o formato
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div
          className={exportDataClasses.content}
          style={sharedStyles.pageBackground(pal)}
        >
          {/* Dados a exportar */}
          <div>
            <p
              className={exportDataClasses.sectionLabel}
              style={sharedStyles.secondaryText(pal)}
            >
              Dados a exportar
            </p>
            <div className={exportDataClasses.fieldGrid}>
              {([
                { k: "compras", label: "Histórico de compras", icon: "🛒" },

                { k: "precos", label: "Histórico de preços", icon: "📈" },

                { k: "estoque", label: "Estoque atual", icon: "📦" },

                { k: "lista", label: "Lista de compras", icon: "📋" },
              ] as const).map(({ k, label, icon }) => {
                const on = exportFields.includes(k)

                return (
                  <button
                    key={k}
                    onClick={() => toggleExportField(k)}
                    className={exportDataClasses.fieldOption}
                    style={exportDataStyles.fieldOption(on, pal)}
                  >
                    <div
                      className={exportDataClasses.checkbox}
                      style={exportDataStyles.checkbox(on, pal)}
                    >
                      {on && (
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 10 10"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                        >
                          <polyline points="1.5,5.5 4,8 8.5,2" />
                        </svg>
                      )}
                    </div>
                    <p
                      className={sharedClasses.tinyBoldText}
                      style={exportDataStyles.fieldLabel(on, pal)}
                    >
                      {icon} {label}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Período */}
          <div>
            <div className={exportDataClasses.sectionHeader}>
              <p
                className={exportDataClasses.filterLabel}
                style={sharedStyles.secondaryText(pal)}
              >
                Período
              </p>
              <button
                onClick={() => {
                  setExportDateFrom("")
                  setExportDateTo("")
                }}
                className={exportDataClasses.resetPeriod}
                style={exportDataStyles.resetPeriod(
                  exportDateFrom,
                  exportDateTo,
                  pal,
                )}
              >
                {!exportDateFrom && !exportDateTo
                  ? "✓ Todo o período"
                  : "Todo o período"}
              </button>
            </div>
            <div className={sharedClasses.filterRow}>
              <div className={sharedClasses.fill}>
                <label
                  className={exportDataClasses.dateLabel}
                  style={sharedStyles.mutedText(pal)}
                >
                  De
                </label>
                <input
                  type="date"
                  className={exportDataClasses.dateInput}
                  style={exportDataStyles.dateInput(
                    pal,
                    exportDateFrom,
                    exportDateTo,
                  )}
                  value={exportDateFrom}
                  onChange={(e) => setExportDateFrom(e.target.value)}
                />
              </div>
              <div className={sharedClasses.fill}>
                <label
                  className={exportDataClasses.dateLabel}
                  style={sharedStyles.mutedText(pal)}
                >
                  Até
                </label>
                <input
                  type="date"
                  className={exportDataClasses.dateInput}
                  style={exportDataStyles.dateInput(
                    pal,
                    exportDateFrom,
                    exportDateTo,
                  )}
                  min={exportDateFrom}
                  value={exportDateTo}
                  onChange={(e) => setExportDateTo(e.target.value)}
                />
              </div>
            </div>
            {!exportDateFrom && !exportDateTo && (
              <p
                className={exportDataClasses.hint}
                style={sharedStyles.mutedText(pal)}
              >
                Exportando todos os registros disponíveis
              </p>
            )}
          </div>

          {/* Produtos */}
          <div>
            <div className={exportDataClasses.sectionHeader}>
              <p
                className={exportDataClasses.filterLabel}
                style={sharedStyles.secondaryText(pal)}
              >
                Produtos
              </p>
              <button
                onClick={() =>
                  setExportProducts(
                    exportProducts.length === exportAllProducts.length
                      ? []
                      : [...exportAllProducts],
                  )
                }
                className={sharedClasses.tinyBoldText}
                style={sharedStyles.brandText}
              >
                {exportProducts.length === exportAllProducts.length
                  ? "Desmarcar tudo"
                  : "Todos"}
              </button>
            </div>
            <div
              className={exportDataClasses.search}
              style={sharedStyles.searchContainer(pal)}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke={pal.textSecondary}
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className={exportDataClasses.searchInput}
                style={sharedStyles.primaryText(pal)}
                placeholder="Buscar produto registrado…"
                value={exportProdSearch}
                onChange={(e) => setExportProdSearch(e.target.value)}
              />
              {exportProdSearch && (
                <button
                  onClick={() => setExportProdSearch("")}
                  className={sharedClasses.smallText}
                  style={sharedStyles.mutedText(pal)}
                >
                  ✕
                </button>
              )}
            </div>
            <div className={exportDataClasses.productList}>
              {exportAllProducts
                .filter((p) =>
                  p.toLowerCase().includes(exportProdSearch.toLowerCase()),
                )
                .map((p) => {
                  const on = exportProducts.includes(p)

                  return (
                    <button
                      key={p}
                      onClick={() => toggleExportProd(p)}
                      className={exportDataClasses.productOption}
                      style={exportDataStyles.productOption(on, pal)}
                    >
                      {p}
                    </button>
                  )
                })}
              {exportAllProducts.filter((p) =>
                p.toLowerCase().includes(exportProdSearch.toLowerCase()),
              ).length === 0 && (
                <p
                  className={sharedClasses.tinyText}
                  style={sharedStyles.mutedText(pal)}
                >
                  Nenhum produto encontrado
                </p>
              )}
            </div>
            {exportProducts.length === 0 && (
              <p
                className={exportDataClasses.hint}
                style={sharedStyles.mutedText(pal)}
              >
                Nenhum selecionado = todos os produtos
              </p>
            )}
          </div>

          {/* Mercados */}
          <div>
            <div className={exportDataClasses.sectionHeader}>
              <p
                className={exportDataClasses.filterLabel}
                style={sharedStyles.secondaryText(pal)}
              >
                Mercados
              </p>
              <button
                onClick={() =>
                  setExportMarkets(
                    exportMarkets.length === exportAllMarkets.length
                      ? []
                      : [...exportAllMarkets],
                  )
                }
                className={sharedClasses.tinyBoldText}
                style={sharedStyles.brandText}
              >
                {exportMarkets.length === exportAllMarkets.length
                  ? "Desmarcar tudo"
                  : "Todos"}
              </button>
            </div>
            {/* Search field */}
            <div
              className={exportDataClasses.search}
              style={sharedStyles.searchContainer(pal)}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke={pal.textSecondary}
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className={exportDataClasses.searchInput}
                style={sharedStyles.primaryText(pal)}
                placeholder="Filtrar mercados registrados…"
                id="exportMktSearch"
                onChange={(e) => {
                  const q = e.target.value.toLowerCase()

                  const el = document.getElementById("exportMktList")

                  if (el)
                    el.querySelectorAll("[data-mkt]").forEach((btn) => {
                      const name = (btn as HTMLElement).dataset.mkt ?? ""
                      ;(btn as HTMLElement).style.display = name
                        .toLowerCase()
                        .includes(q)
                        ? ""
                        : "none"
                    })
                }}
              />
            </div>
            <div id="exportMktList" className={exportDataClasses.marketList}>
              {exportAllMarkets.map((m) => {
                const on = exportMarkets.includes(m)

                return (
                  <button
                    key={m}
                    data-mkt={m}
                    onClick={() => toggleExportMkt(m)}
                    className={exportDataClasses.marketOption}
                    style={exportDataStyles.marketOption(on, pal)}
                  >
                    <div
                      className={exportDataClasses.checkbox}
                      style={exportDataStyles.checkbox(on, pal)}
                    >
                      {on && (
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 10 10"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                        >
                          <polyline points="1.5,5.5 4,8 8.5,2" />
                        </svg>
                      )}
                    </div>
                    <p
                      className={sharedClasses.textButton}
                      style={exportDataStyles.fieldLabel(on, pal)}
                    >
                      🏪 {m}
                    </p>
                  </button>
                )
              })}
            </div>
            {exportMarkets.length === 0 && (
              <p
                className={exportDataClasses.hint}
                style={sharedStyles.mutedText(pal)}
              >
                Nenhum selecionado = todos os mercados
              </p>
            )}
          </div>

          {/* Formato */}
          <div>
            <p
              className={exportDataClasses.sectionLabel}
              style={sharedStyles.secondaryText(pal)}
            >
              Formato do arquivo
            </p>
            <div className={sharedClasses.filterRow}>
              {([
                { k: "csv", label: "CSV", icon: "📊" },

                { k: "json", label: "JSON", icon: "🗂️" },

                { k: "xlsx", label: "XLSX", icon: "📋" },
              ] as const).map(({ k, label, icon }) => (
                <button
                  key={k}
                  onClick={() => setExportFormat(k)}
                  className={exportDataClasses.formatOption}
                  style={exportDataStyles.formatOption(exportFormat, k, pal)}
                >
                  <span className={exportDataClasses.formatIcon}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div
          className={exportDataClasses.footer}
          style={exportDataStyles.footer(pal)}
        >
          <button
            onClick={onClose}
            className={sharedClasses.formCancelButton}
            style={sharedStyles.dialogCancelButton(pal)}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (exportFields.length > 0) onClose()
            }}
            className={exportDataClasses.exportButton}
            style={exportDataStyles.exportButton(exportFields, pal)}
          >
            Exportar .{exportFormat}
          </button>
        </div>
      </div>
    </div>
  )
}
