import { describe, it, expect } from "vitest"
import { render, screen } from "@/test/utils"
import { AppCard } from "./index"

describe("AppCard", () => {
  it("renders children", () => {
    render(<AppCard>Conteúdo</AppCard>)
    expect(screen.getByText("Conteúdo")).toBeInTheDocument()
  })

  it("renders title when provided", () => {
    render(
      <AppCard title="Título">
        <span>Conteúdo</span>
      </AppCard>,
    )
    expect(screen.getByText("Título")).toBeInTheDocument()
    expect(screen.getByText("Conteúdo")).toBeInTheDocument()
  })
})
