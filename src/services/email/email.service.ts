/**
 * Serviço de email com Resend.
 * Usar apenas no backend (Node). Não importe este ficheiro no frontend
 * para não expor RESEND_API_KEY. O frontend deve chamar a sua API
 * (ex.: POST /api/register), e o backend chama sendWelcomeEmail.
 *
 * Configuração no backend:
 * - Defina RESEND_API_KEY (e opcionalmente RESEND_FROM).
 * - Domínio verificado em https://resend.com/domains
 */
/// <reference types="node" />

import { Resend } from "resend"

const apiKey = process.env.RESEND_API_KEY ?? ""
const fromEmail =
  process.env.RESEND_FROM ?? "onboarding@resend.dev"

const resend = apiKey ? new Resend(apiKey) : null

export interface SendWelcomeEmailParams {
  to: string
  name: string
}

/**
 * Envia email de boas-vindas após registo.
 * Chamar no backend após criar o utilizador (ex.: no handler de POST /api/register).
 */
export async function sendWelcomeEmail({
  to,
  name,
}: SendWelcomeEmailParams): Promise<{ id?: string; error?: unknown }> {
  if (!resend) {
    console.warn("RESEND_API_KEY não definida; email não enviado.")
    return {}
  }
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [to],
    subject: "Bem-vindo",
    html: `
      <p>Olá <strong>${name}</strong>,</p>
      <p>Obrigado por te registares. Bem-vindo à aplicação.</p>
    `,
  })
  if (error) return { error }
  return { id: data?.id }
}
