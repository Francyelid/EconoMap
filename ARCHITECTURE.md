# Arquitetura do EconoMap

## Organização

```text
src/
  app/                Composição e navegação da aplicação
  models/             Modelos de dados compartilhados
  business/           Regras de negócio executadas no front
  services/
    api/              Comunicação HTTP com o futuro backend
    demo/             Acesso aos dados de demonstração atuais
  mocks/              Dados fictícios, sem regras ou componentes
  screen/             Telas, componentes locais, estilos e tipos de apresentação
  components/         Componentes visuais reutilizáveis
  constants/          Constantes e recursos compartilhados
  utils/              Funções genéricas de apresentação, como formatação de datas
```

## Responsabilidades

**models** define os contratos dos dados, como `StockItem`, `ShoppingItem`,
`Market`, `PriceHistory` e `CommunityRecord`. Não importa React, telas ou serviços.
Tipos de props, paletas e estado visual continuam próximos dos componentes.

**business** contém funções sem dependência de React ou chamadas HTTP:

- `stock.ts`: cálculo de dias até o vencimento e classificação da validade.
- `shopping.ts`: cálculo compartilhado dos totais da lista e dos grupos por mercado.
- `market.ts`: filtragem e ordenação dos mercados por preço.

As regras extraídas preservam o comportamento existente. O estoque ainda usa a
data de referência da demonstração (`2026-08-23`), e as quantidades da lista
continuam sendo interpretadas com `parseFloat`.

**services/api** concentra a comunicação com o backend. O cliente HTTP é uma
base preparada para receber os serviços por recurso quando os endpoints forem
definidos; ele ainda não é usado pelas telas. Trata status de erro e respostas
204, aceita opções de `fetch` e exige `VITE_API_BASE_URL`.
O tipo genérico descreve o retorno esperado; não valida o JSON recebido.

**services/demo** expõe os dados fictícios usados atualmente pelas telas.
Esse acesso continua síncrono e não representa persistência ou uma API simulada.
Alterações da lista e do estoque continuam no estado local das telas.

**screen/components** apresentam os dados, controlam interação e estado visual.
Regras adicionais ainda presentes nos componentes podem ser extraídas conforme
essas funcionalidades evoluírem. Cores e ícones permanecem na apresentação.

## Integração das futuras APIs

1. Defina os contratos em `models` (e DTOs separados se o backend usar outro formato).
2. Configure `VITE_API_BASE_URL` em `.env.local`. Variáveis `VITE_*` são públicas;
   não coloque segredos nelas.
3. Crie serviços por recurso em `services/api`, importando `httpClient.ts`.
   Defina caminhos, métodos e conversões conforme o contrato real do backend.
   Para enviar JSON, use `JSON.stringify` e o cabeçalho `Content-Type: application/json`.
4. Substitua os imports de `services/demo` por chamadas aos serviços reais.
   Como essas chamadas serão assíncronas, trate carregamento, erro e resultado vazio
   na tela ou em hooks específicos.
5. Aplique as funções de `business` aos dados retornados, sem acoplar essas funções
   ao transporte HTTP. Validações de segurança e regras autoritativas também devem
   existir no backend.

Evite importar telas dentro de modelos, regras ou serviços. Componentes não devem
precisar conhecer a estrutura dos arquivos de mocks.

## Validação

```sh
npm run build
npx tsc --noEmit
```
