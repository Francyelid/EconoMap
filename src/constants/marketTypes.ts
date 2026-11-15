import type { MarketType } from "@/models/MarketType"

export const MARKET_TYPE_DESCRIPTIONS: Record<MarketType, string> = {
  Supermercado: "Estabelecimento com variedade de alimentos, bebidas, produtos de limpeza e higiene.",
  Hipermercado: "Mercado de grande porte, com alimentos, eletrodomésticos, roupas e outros produtos.",
  Minimercado: "Pequeno comércio com produtos essenciais do dia a dia.",
  "Mercado de bairro": "Comércio local, geralmente menor, voltado aos moradores da região.",
  Atacarejo: "Combina atacado e varejo, com preços diferenciados por quantidade.",
  Atacadista: "Comercializa produtos em grandes quantidades, geralmente para comerciantes.",
  Mercearia: "Pequeno estabelecimento com alimentos básicos e produtos domésticos.",
  Empório: "Comércio com produtos selecionados, artesanais, importados ou especiais.",
  Hortifrúti: "Especializado em frutas, verduras e legumes.",
  Sacolão: "Comércio de frutas, verduras e legumes, geralmente com preços populares.",
  Açougue: "Especializado em carnes bovinas, suínas e aves.",
  Peixaria: "Especializada em peixes e frutos do mar.",
  Padaria: "Comercializa pães, bolos, doces e outros alimentos.",
  "Loja de conveniência": "Pequeno comércio com alimentos, bebidas e produtos de consumo rápido.",
  "Mercado municipal": "Espaço que reúne diferentes comerciantes de alimentos e outros produtos.",
  "Feira livre": "Comércio realizado em barracas, geralmente em dias e locais específicos.",
  "Mercado orgânico": "Especializado em alimentos orgânicos e produtos naturais.",
  "Mercado online": "Estabelecimento que comercializa produtos pela internet, com entrega ou retirada.",
}
