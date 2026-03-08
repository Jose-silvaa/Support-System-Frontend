# Rotas e fluxo Login / Registo

## Rotas definidas em `src/routes/index.tsx`

| Rota            | Path           | Página         |
|-----------------|----------------|----------------|
| `ROUTES.HOME`   | `/`            | HomePage       |
| `ROUTES.LOGIN`  | `/login`       | LoginPage      |
| `ROUTES.REGISTER` | `/register`  | RegisterPage   |
| `ROUTES.DASHBOARD` | `/dashboard` | DashboardPage  |
| `ROUTES.DESIGN_SYSTEM` | `/design-system` | DesignSystemPage |

Qualquer outro path redireciona para `/`.

## Como ficam Login e Registo como rotas

- **`/login`** → `MainLayout` + `LoginPage`. O utilizador preenche email/password e submete; a página chama `login()` (ou `loginViaApi()` quando tiver backend) e, em caso de sucesso, redireciona para `ROUTES.DASHBOARD`.
- **`/register`** → `MainLayout` + `RegisterPage`. O utilizador preenche nome, email e password; a página chama `register()` (ou `registerViaApi()` quando tiver backend) e, em caso de sucesso, redireciona para `ROUTES.DASHBOARD`.

Navegação entre rotas:

- Links na barra (MainLayout): Home, Login, Registo, Dashboard, Design System.
- Na Home: botões para Login, Registo, Design System.
- Em Login: botão “Criar conta” → `navigate(ROUTES.REGISTER)`.
- Em Registo: botão “Já tenho conta” → `navigate(ROUTES.LOGIN)`.

## Resend (email) e backend

- **Frontend:** nas páginas de login/registo usa-se `login()` / `register()` (mock) ou `loginViaApi()` / `registerViaApi()` que fazem `fetch` para a sua API (ex.: `POST /api/login`, `POST /api/register`).
- **Backend:** no handler de registo (ex.: `POST /api/register`) depois de criar o utilizador pode chamar `sendWelcomeEmail` de `src/services/email.service.ts` (Resend). Esse ficheiro **não** deve ser importado no frontend (para não expor `RESEND_API_KEY`).
- **Resend:** instale com `npm i resend`. Configure `RESEND_API_KEY` (e opcionalmente `RESEND_FROM`) no ambiente do backend. Domínio em https://resend.com/domains.

Exemplo no backend (Node):

```ts
import { sendWelcomeEmail } from "./services/email.service"

// POST /api/register
// 1. Criar user na BD
// 2. await sendWelcomeEmail({ to: user.email, name: user.name })
// 3. Devolver user/token
```
