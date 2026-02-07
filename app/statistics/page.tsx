"use client"

import { useState, useEffect, useCallback } from "react"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { StatsFilters } from "@/components/statistics/stats-filters"
import { storage } from "@/lib/storage"
import { seedMatches } from "@/lib/seed-data"
import type { Match } from "@/lib/types"
import dynamic from "next/dynamic"

const CareerStats = dynamic(() => import("@/components/statistics/career-stats").then((mod) => mod.CareerStats), {
  loading: () => <div className="h-96 w-full animate-pulse bg-muted/20 rounded-3xl" />,
})
const StatsKpis = dynamic(() => import("@/components/statistics/stats-kpis").then((mod) => mod.StatsKpis), {
  loading: () => <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-32 animate-pulse" />,
})
const StatsCharts = dynamic(() => import("@/components/statistics/stats-charts").then((mod) => mod.StatsCharts), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse bg-muted/20 rounded-xl" />,
})
const OpponentsTable = dynamic(
  () => import("@/components/statistics/opponents-table").then((mod) => mod.OpponentsTable),
  {
    loading: () => <div className="h-96 w-full animate-pulse bg-muted/20 rounded-xl" />,
  },
)

export default function StatisticsPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([])
  const [apiStats, setApiStats] = useState({
    statistics: [{
        team: { name: "Inter Miami CF" },
        games: { appearences: 29, rating: "8.2", minutes: 2360 },
        goals: { total: 25, assists: 16 }
    }]
  })
  const [loadingApi, setLoadingApi] = useState(false)

  useEffect(() => {
    // 1. Load local matches
    let loadedMatches = storage.getMatches()
    if (loadedMatches.length === 0) {
      storage.saveMatches(seedMatches)
      loadedMatches = seedMatches
    }
    setMatches(loadedMatches)
    setFilteredMatches(loadedMatches)
  }, [])

  const handleFilterChange = useCallback((filtered: Match[]) => {
    setFilteredMatches(filtered)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />
      <main className="flex-1 px-4 md:px-8 pt-32 pb-8">
        <div className="flex flex-col space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Estadísticas</h1>
            <p className="text-muted-foreground">Análisis completo del rendimiento de Lionel Messi</p>
          </div>

          <StatsFilters matches={matches} onFilterChange={handleFilterChange} />

          <StatsKpis matches={filteredMatches} />

          <StatsCharts matches={filteredMatches} />

          <OpponentsTable matches={filteredMatches} />
          
          <CareerStats />
        </div>
      </main>
      <Footer />
    </div>
  )
}
