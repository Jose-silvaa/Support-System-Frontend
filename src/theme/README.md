# Design System (Chakra UI)

Este projeto usa [Chakra UI v3](https://chakra-ui.com/) como base do design system, com tema customizado para reutilizar em todos os seus frontends.

## Estrutura

- **`tokens.ts`** — Tokens de design: cores (primary, secondary), fontes, animações. Ajuste aqui a identidade visual.
- **`text-styles.ts`** — Tipografia: `headline`, `subheadline`, `body`, `caption`, `label`. Use via `textStyle="headline"` nos componentes.
- **`recipes.ts`** — Receitas de componentes (ex.: `primaryButton`). Adicione novas recipes para botões, cards, etc.
- **`system.ts`** — Combina o tema padrão do Chakra com o tema customizado e exporta o `system` usado pelo Provider.
- **`index.ts`** — Reexporta sistema, tema, tokens, textStyles e recipes para uso em outros módulos.

## Uso nos próximos frontends

1. **Provider** — Envolva a app com `<Provider>` (em `@/components/ui/provider`). Já configurado em `main.tsx`.

2. **Componentes Chakra** — Importe de `@chakra-ui/react`:
   ```tsx
   import { Button, Box, Container } from "@chakra-ui/react"
   ```

3. **Cores do tema** — Use os tokens no código:
   ```tsx
   <Box bg="primary.500" color="white" />
   <Button colorPalette="blue">Padrão</Button>
   <Button recipe={primaryButtonRecipe}>Design System</Button>
   ```

4. **Tipografia** — Use os text styles:
   ```tsx
   <Text textStyle="headline">Título</Text>
   <Text textStyle="body">Parágrafo</Text>
   ```

5. **Customizar** — Edite `tokens.ts`, `text-styles.ts` e `recipes.ts` e o tema será refletido em toda a aplicação.

## Path alias

O alias `@/*` aponta para `./src/*`. Configurado em `tsconfig.app.json` e `vite.config.ts` (via `vite-tsconfig-paths`).
