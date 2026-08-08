import { Box } from "@chakra-ui/react"
import { brand } from "@/theme/brand"
import { CallToAction, Features, Footer, Hero, HowItWorks, RecentTickets } from "./components"

export function HomePage() {
  return (
    <Box bg={brand.panelDark} color="white">
      <Hero />
      <Features />
      <HowItWorks />
      <RecentTickets />
      <CallToAction />
      <Footer />
    </Box>
  )
}
