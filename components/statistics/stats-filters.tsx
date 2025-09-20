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
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedCompetition, setSelectedCompetition] = useState("all")
  const [selectedTeam, setSelectedTeam] = useState("all")
  const [selectedResult, setSelectedResult] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  // valores únicos
  const years = Array.from(new Set(matches.map((m) => new Date(m.date).getFullYear().toString())))
    .sort()
    .reverse()
  const competitions = Array.from(new Set(matches.map((m) => m.competition))).sort()
  const teams = Array.from(new Set(matches.map((m) => m.team))).sort()

  useEffect(() => {
    let filtered = matches

    if (selectedYear !== "all") {
      filtered = filtered.filter(
        (m) => new Date(m.date).getFullYear().toString() === selectedYear
      )
    }
    if (selectedCompetition !== "all") {
      filtered = filtered.filter((m) => m.competition === selectedCompetition)
    }
    if (selectedTeam !== "all") {
      filtered = filtered.filter((m) => m.team === selectedTeam)
    }
    if (selectedResult !== "all") {
      filtered = filtered.filter((m) => m.result === selectedResult)
    }

    if (dateFrom) {
      const from = new Date(dateFrom)
      filtered = filtered.filter((m) => new Date(m.date) >= from)
    }
    if (dateTo) {
      const to = new Date(dateTo)
      filtered = filtered.filter((m) => new Date(m.date) <= to)
    }

    onFilterChange(filtered)
    // 👇 evitamos dependencia de onFilterChange (ya es estable con useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, selectedYear, selectedCompetition, selectedTeam, selectedResult, dateFrom, dateTo])

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
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2">
            <X className="w-3 h-3 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Selects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Año */}
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

        {/* Competencia */}
        <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
          <SelectTrigger>
            <SelectValue placeholder="Competencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las competencias</SelectItem>
            {competitions.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Equipo */}
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Equipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los equipos</SelectItem>
            {teams.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Resultado */}
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

      {/* Rango de fechas */}
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

      {/* Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedYear !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedYear}
              <button type="button" onClick={() => setSelectedYear("all")}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedCompetition !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedCompetition}
              <button type="button" onClick={() => setSelectedCompetition("all")}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedTeam !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedTeam}
              <button type="button" onClick={() => setSelectedTeam("all")}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedResult !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedResult === "win" ? "Victoria" : selectedResult === "draw" ? "Empate" : "Derrota"}
              <button type="button" onClick={() => setSelectedResult("all")}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
