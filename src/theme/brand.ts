/**
 * Tokens visuais da marca Ticket Desk, usados nas páginas públicas
 * (Home, Login, Register) que têm layout próprio (fora do MainLayout padrão).
 */
export const AUTH_FORM_MAX_W = "393px"

export const brand = {
  /** Roxo quase-preto — mesmo matiz do gradiente, não um preto neutro. */
  panelDark: "#1c1730",
  /** Superfície elevada (cards) sobre o panelDark. */
  surface: "#241c3d",
  surfaceHover: "#2b2249",
  border: "rgba(255,255,255,0.09)",
  borderStrong: "rgba(255,255,255,0.16)",

  /** Começa perto do tom do painel escuro e clareia até o roxo vibrante, criando transição contínua entre seções/colunas. */
  welcomeGradient: "linear-gradient(160deg, #2c2049 0%, #6f4bd1 55%, #a06de8 100%)",
  heroGlow: "radial-gradient(60% 55% at 50% 0%, rgba(124,79,219,0.35) 0%, rgba(28,23,48,0) 70%)",

  accent: "#9c6fe4",
  accentHover: "#8a5cd6",
  accentActive: "#7a4bc4",
  accentSoft: "rgba(156,111,228,0.14)",

  buttonSecondary: "#2b2245",
  buttonSecondaryHover: "#392c5c",

  textMuted: "rgba(255,255,255,0.68)",
  textFaint: "rgba(255,255,255,0.5)",

  label: "rgba(255,255,255,0.62)",
  subtitle: "rgba(255,255,255,0.72)",
  welcomeText: "rgba(255,255,255,0.88)",

  inputBorder: "rgba(255,255,255,0.24)",
  inputFocusBorder: "#b391ec",
  inputPlaceholder: "rgba(255,255,255,0.4)",

  errorBg: "rgba(248,113,113,0.12)",
  errorBorder: "rgba(248,113,113,0.32)",
  errorText: "#ffb4b4",

  success: "#34d399",
  successBg: "rgba(52,211,153,0.14)",
  warning: "#fbbf24",
  warningBg: "rgba(251,191,36,0.14)",
  info: "#60a5fa",
  infoBg: "rgba(96,165,250,0.14)",
} as const
