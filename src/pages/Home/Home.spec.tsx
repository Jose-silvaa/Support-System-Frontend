import { describe, it, expect } from "vitest"
import { render, screen } from "@/test/utils"
import { HomePage } from "./index"

describe("HomePage", () => {
  it("renders heading and content", () => {
    render(<HomePage />)
    expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument()
    expect(screen.getByText(/página inicial/i)).toBeInTheDocument()
  })
})
