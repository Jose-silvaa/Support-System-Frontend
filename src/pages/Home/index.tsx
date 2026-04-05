import { Heading, Text, VStack, HStack, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { AppCard } from "@/components"
import { homePageStyles } from "./styles"
import { ROUTES } from "@/routes"

export function HomePage() {
  const navigate = useNavigate()
  return (
    <VStack align="stretch" gap="6" {...homePageStyles.container}>
      <Heading size="xl" textStyle="headline">
        Home
      </Heading>
      <Text textStyle="body">Página inicial da aplicação.</Text>
      <HStack gap="2" flexWrap="wrap">
        <Button size="sm" colorPalette="blue" onClick={() => navigate(ROUTES.LOGIN)}>
          Login
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate(ROUTES.REGISTER)}>
          Registo
        </Button>
      </HStack>
      <AppCard title="Exemplo de card">
        Componentes usados apenas nesta página ficam em <code>pages/Home/components/</code>.
      </AppCard>
    </VStack>
  )
}
