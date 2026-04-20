import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { Biography } from "@/components/home/biography"
import { QuickStats } from "@/components/home/quick-stats"
import { NextMatch } from "@/components/home/next-match"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />
      <main className="flex-1 px-4 md:px-8 py-8">
        <Hero />
        <NextMatch />
        <Biography />
        <QuickStats />
      </main>
      <Footer />
    </div>
  )
}
