/**
 * Funções utilitárias da aplicação.
 * Ex.: formatação de moeda, data, máscaras, etc.
 */

export function formatCurrency(value: number, locale = "pt-BR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(date: Date | string, locale = "pt-BR"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date)
}
