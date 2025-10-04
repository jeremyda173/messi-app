"use client"

import { useState, useEffect, useCallback } from "react"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { StatsKpis } from "@/components/statistics/stats-kpis"
import { StatsCharts } from "@/components/statistics/stats-charts"
import { StatsFilters } from "@/components/statistics/stats-filters"
import { OpponentsTable } from "@/components/statistics/opponents-table"
import { storage } from "@/lib/storage"
import { seedMatches } from "@/lib/seed-data"
import type { Match } from "@/lib/types"

export default function StatisticsPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([])

  useEffect(() => {
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
      <main className="flex-1 px-4 md:px-8 py-8">
        <div className="flex flex-col space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Estadísticas</h1>
            <p className="text-muted-foreground">
              Análisis completo del rendimiento de Lionel Messi
            </p>
          </div>

          <StatsFilters matches={matches} onFilterChange={handleFilterChange} />

          <StatsKpis matches={filteredMatches} />

          <StatsCharts matches={filteredMatches} />

          <OpponentsTable matches={filteredMatches} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
