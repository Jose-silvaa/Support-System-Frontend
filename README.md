# React + TypeScript + Vite

Template com design system (Chakra UI), rotas, auth de exemplo, serviços e arquitetura de pastas. Serve de base para criar novos frontends.

## Começar um novo frontend

1. **Copiar variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Editar `.env` e definir pelo menos `VITE_API_BASE_URL` (e opcionalmente `VITE_APP_NAME`). Nunca commitar `.env`.

2. **Instalar e correr**
   ```bash
   npm install
   npm run dev
   ```

3. **Estrutura** — Ver `src/ARCHITECTURE.md` para pastas (pages, features, services, etc.). Rotas em `src/routes/index.tsx`; adicionar novas páginas em `src/pages/` e registar em `ROUTES`.

## Como criar uma página nova

1. **Criar a pasta da página** em `src/pages/` (ex.: `src/pages/MinhaPagina/`).

2. **Ficheiros mínimos:**
   - `index.tsx` — componente da página (exportar uma função, ex.: `export function MinhaPagina() { ... }`).
   - Opcional: `interfaces.ts`, `styles.ts`, `MinhaPagina.spec.tsx`; se a página tiver componentes só seus, criar `components/` dentro da pasta.

3. **Registar a rota** em `src/routes/index.tsx`:
   - Adicionar o path em `ROUTES`, ex.: `MINHA_PAGINA: "/minha-pagina"`.
   - Adicionar um objeto ao array `routes` com `path` e `element` (usar `MainLayout` e o componente da página), por exemplo:
     ```tsx
     {
       path: ROUTES.MINHA_PAGINA,
       element: (
         <MainLayout>
           <MinhaPagina />
         </MainLayout>
       ),
     },
     ```
   - Importar o componente da página no topo do ficheiro (ex.: `import { MinhaPagina } from "@/pages/MinhaPagina"` ou exportar em `src/pages/index.ts`).

4. **Navegação** — Usar o path em links ou `navigate()`:
   - `<Link to={ROUTES.MINHA_PAGINA}>...</Link>` ou
   - `navigate(ROUTES.MINHA_PAGINA)` (com `useNavigate()` do react-router-dom).

Exemplo de estrutura da pasta:

```
src/pages/MinhaPagina/
  index.tsx
  interfaces.ts   (opcional)
  styles.ts       (opcional)
  components/     (opcional, para componentes só desta página)
```

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
