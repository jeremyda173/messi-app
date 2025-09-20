"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import type { Match } from "@/lib/types"

interface StatsFiltersProps {
  matches: Match[]
  onFilterChange: (filteredMatches: Match[]) => void
}

export function StatsFilters({ matches, onFilterChange }: StatsFiltersProps) {
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedCompetition, setSelectedCompetition] = useState<string>("all")
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [selectedResult, setSelectedResult] = useState<string>("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  // Get unique values for filter options
  const years = Array.from(new Set(matches.map((match) => new Date(match.date).getFullYear().toString())))
    .sort()
    .reverse()
  const competitions = Array.from(new Set(matches.map((match) => match.competition))).sort()
  const teams = Array.from(new Set(matches.map((match) => match.team))).sort()

  useEffect(() => {
    let filtered = matches

    // Year filter
    if (selectedYear !== "all") {
      filtered = filtered.filter((match) => new Date(match.date).getFullYear().toString() === selectedYear)
    }

    // Competition filter
    if (selectedCompetition !== "all") {
      filtered = filtered.filter((match) => match.competition === selectedCompetition)
    }

    // Team filter
    if (selectedTeam !== "all") {
      filtered = filtered.filter((match) => match.team === selectedTeam)
    }

    // Result filter
    if (selectedResult !== "all") {
      filtered = filtered.filter((match) => match.result === selectedResult)
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter((match) => match.date >= dateFrom)
    }
    if (dateTo) {
      filtered = filtered.filter((match) => match.date <= dateTo)
    }

    onFilterChange(filtered)
  }, [matches, selectedYear, selectedCompetition, selectedTeam, selectedResult, dateFrom, dateTo, onFilterChange])

  const clearFilters = () => {
    setSelectedYear("all")
    setSelectedCompetition("all")
    setSelectedTeam("all")
    setSelectedResult("all")
    setDateFrom("")
    setDateTo("")
  }

  const hasActiveFilters =
    selectedYear !== "all" ||
    selectedCompetition !== "all" ||
    selectedTeam !== "all" ||
    selectedResult !== "all" ||
    dateFrom ||
    dateTo

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filtros de Análisis</span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2">
            <X className="w-3 h-3 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Year */}
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger>
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los años</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Competition */}
        <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
          <SelectTrigger>
            <SelectValue placeholder="Competencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las competencias</SelectItem>
            {competitions.map((competition) => (
              <SelectItem key={competition} value={competition}>
                {competition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Team */}
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Equipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los equipos</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team} value={team}>
                {team}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Result */}
        <Select value={selectedResult} onValueChange={setSelectedResult}>
          <SelectTrigger>
            <SelectValue placeholder="Resultado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los resultados</SelectItem>
            <SelectItem value="win">Victoria</SelectItem>
            <SelectItem value="draw">Empate</SelectItem>
            <SelectItem value="loss">Derrota</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
        <div>
          <label className="text-sm font-medium mb-1 block">Desde</label>
          <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Hasta</label>
          <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedYear !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedYear}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedYear("all")} />
            </Badge>
          )}
          {selectedCompetition !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedCompetition}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCompetition("all")} />
            </Badge>
          )}
          {selectedTeam !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedTeam}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTeam("all")} />
            </Badge>
          )}
          {selectedResult !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedResult === "win" ? "Victoria" : selectedResult === "draw" ? "Empate" : "Derrota"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedResult("all")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
