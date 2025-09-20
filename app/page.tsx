import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { Biography } from "@/components/home/biography"
import { QuickStats } from "@/components/home/quick-stats"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col p-2">
      <HeaderNav />
      <main className="flex-1 px-4 md:px-8 py-8">
        <Hero />
        <Biography />
        <QuickStats />
      </main>
      <Footer />
    </div>
  )
}
