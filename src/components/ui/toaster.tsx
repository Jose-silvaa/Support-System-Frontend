"use client"

import { createToaster, Toaster as ChakraToaster, Toast } from "@chakra-ui/react"

const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
})

export { toaster }

/**
 * Renderizar uma vez no root (ex.: em main ou no layout) para mostrar toasts.
 * Uso: toaster.create({ title: "Sucesso", description: "...", type: "success" })
 */
export function Toaster() {
  return (
    <ChakraToaster toaster={toaster}>
      {(props) => (
        <Toast.Root minW="300px" overflow="visible">
          {props.title != null && <Toast.Title>{props.description}</Toast.Title>}
        </Toast.Root>
      )}
    </ChakraToaster>
  )
}
