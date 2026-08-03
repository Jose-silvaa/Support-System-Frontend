# Arquitetura da aplicação (React)

Estrutura baseada no artigo [Arquitetura para aplicações React](https://vinniciusgomes.medium.com/arquitetura-para-aplicacoes-react-d77361bf2d49).

## Pastas em `src/`

| Pasta | Descrição |
|-------|-----------|
| **assets** | Imagens, fontes, mocks e outros ficheiros estáticos |
| **components** | Componentes reutilizáveis em toda a app (ex.: `AppCard`, `ui/provider`) |
| **configs** | Configurações globais (env, app name, etc.) |
| **contexts** | Contextos React para estado global (ex.: `TicketContext`) |
| **hooks** | Hooks customizados globais |
| **layout** | Layouts (navbar + conteúdo, etc.) |
| **lib** | Integrações com libs externas (ex.: Axios, API client) |
| **pages** | Páginas da aplicação; cada página pode ter `components/`, `styles.ts`, `interfaces.ts` |
| **routes** | Definição e gestão de rotas |
| **services** | Serviços (Analytics, notificações, etc.) |
| **styles** | Estilos globais |
| **theme** | Design system (Chakra UI: tokens, textStyles, recipes) |
| **utils** | Funções utilitárias (formatação de moeda, data, etc.) |

## Estrutura de um componente (ex.: `components/AppCard/`)

```
AppCard/
  index.tsx          → componente
  interfaces.ts      → tipos/interfaces
  styles.ts          → estilos (Chakra/system)
  AppCard.spec.tsx   → testes
  AppCard.stories.tsx → Storybook (opcional)
```

## Estrutura de uma página (ex.: `pages/Home/`)

```
Home/
  index.tsx          → página
  interfaces.ts
  styles.ts
  Home.spec.tsx
  components/        → componentes usados só nesta página (mesma estrutura de components/)
```

Tipos/interfaces usados por múltiplas camadas (ex.: `DashboardCard`, consumido por `services/tickets`, `contexts/TicketContext` e `pages/Dashboard`) devem morar junto do `service` a que pertencem (ex.: `services/tickets/interfaces.ts`), não dentro de uma página específica.
