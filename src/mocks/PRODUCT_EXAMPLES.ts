import type { ProductCategory } from "@/models/ProductCategory"
import type { Product } from "@/models/Product"

export const PRODUCT_EXAMPLES: Record<ProductCategory, readonly string[]> = {
  "Mercearia básica": ["Arroz", "Feijão", "Açúcar", "Sal", "Farinha", "Óleo"],
  "Massas e molhos": [
    "Macarrão",
    "Lasanha",
    "Massa instantânea",
    "Molho de tomate",
  ],
  "Cafés e chás": ["Café em pó", "Café solúvel", "Café em cápsulas", "Chá"],
  "Leites e derivados": [
    "Leite",
    "Creme de leite",
    "Leite condensado",
    "Leite em pó",
  ],
  "Laticínios e frios": [
    "Queijo",
    "Iogurte",
    "Manteiga",
    "Requeijão",
    "Presunto",
  ],
  "Carnes e aves": ["Carne bovina", "Carne suína", "Frango"],
  "Peixes e frutos do mar": ["Peixes", "Camarão", "Frutos do mar"],
  Hortifrúti: ["Frutas", "Verduras", "Legumes", "Temperos frescos"],
  "Padaria e confeitaria": ["Pães", "Bolos", "Torradas", "Bisnaguinhas"],
  "Biscoitos e snacks": ["Bolachas", "Salgadinhos", "Pipoca", "Amendoim"],
  "Doces e sobremesas": ["Chocolates", "Balas", "Gelatinas", "Doces"],
  Bebidas: ["Água", "Refrigerante", "Suco", "Energético", "Bebidas alcoólicas"],
  Congelados: [
    "Pizza",
    "Lasanha congelada",
    "Hambúrguer",
    "Vegetais congelados",
  ],
  "Enlatados e conservas": ["Milho", "Ervilha", "Atum", "Sardinha", "Azeitona"],
  "Temperos e condimentos": [
    "Ketchup",
    "Mostarda",
    "Maionese",
    "Vinagre",
    "Especiarias",
  ],
  "Cereais e matinais": ["Aveia", "Granola", "Cereal matinal"],
  "Produtos naturais e dietéticos": [
    "Produtos sem glúten",
    "Produtos sem lactose",
    "Produtos diet",
    "Suplementos alimentares",
  ],
  "Higiene pessoal": ["Shampoo", "Sabonete", "Creme dental", "Desodorante"],
  "Limpeza doméstica": [
    "Detergente",
    "Sabão em pó",
    "Desinfetante",
    "Água sanitária",
  ],
  "Papel e descartáveis": [
    "Papel higiênico",
    "Papel-toalha",
    "Guardanapos",
    "Sacos de lixo",
  ],
  "Bebês e infantil": ["Fraldas", "Lenços umedecidos", "Alimentos infantis"],
  "Pet shop": ["Ração", "Petiscos", "Areia sanitária", "Higiene animal"],
  "Utilidades domésticas": [
    "Esponjas",
    "Papel-alumínio",
    "Filtros de café",
    "Utensílios",
  ],
}

export const EXAMPLE_PRODUCTS: Product[] = Object.entries(
  PRODUCT_EXAMPLES,
).flatMap(([category, names], categoryIndex) =>
  names.map((name, index) => ({
    id: `example-${categoryIndex}-${index}`,
    name,
    category: category as ProductCategory,
    unit: ["Carnes e aves", "Peixes e frutos do mar", "Hortifrúti"].includes(
      category,
    )
      ? "kg"
      : "un",
  })),
)
