import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { render, screen } from "@/test/utils"
import { HomePage } from "./index"

describe("HomePage", () => {
  it("renders the hero heading and primary CTA", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByRole("heading", { name: /report issues/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /report an issue/i })).toBeInTheDocument()
  })
})
