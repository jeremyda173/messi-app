"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, Filter, Search, Calendar, Trophy, Users, MapPin, Target } from "lucide-react"
import type { Match } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

interface MatchFiltersProps {
  matches: Match[]
  onFilterChange: (filteredMatches: Match[]) => void
}

export function MatchFilters({ matches, onFilterChange }: MatchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompetition, setSelectedCompetition] = useState<string>("all")
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [selectedResult, setSelectedResult] = useState<string>("all")
  const [selectedVenue, setSelectedVenue] = useState<string>("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [minGoals, setMinGoals] = useState("")
  const [minAssists, setMinAssists] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Get unique values for filter options
  const competitions = Array.from(new Set(matches.map((match) => match.competition))).sort()
  const teams = Array.from(new Set(matches.map((match) => match.team))).sort()
  const opponents = Array.from(new Set(matches.map((match) => match.opponent))).sort()

  useEffect(() => {
    let filtered = matches

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (match) =>
          match.opponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.competition.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.team.toLowerCase().includes(searchTerm.toLowerCase()),
      )
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

    // Venue filter
    if (selectedVenue !== "all") {
      filtered = filtered.filter((match) => match.venue === selectedVenue)
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter((match) => match.date >= dateFrom)
    }
    if (dateTo) {
      filtered = filtered.filter((match) => match.date <= dateTo)
    }

    if (minGoals) {
      filtered = filtered.filter((match) => match.goals >= Number.parseInt(minGoals))
    }
    if (minAssists) {
      filtered = filtered.filter((match) => match.assists >= Number.parseInt(minAssists))
    }

    onFilterChange(filtered)
  }, [
    matches,
    searchTerm,
    selectedCompetition,
    selectedTeam,
    selectedResult,
    selectedVenue,
    dateFrom,
    dateTo,
    minGoals,
    minAssists,
    onFilterChange,
  ])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCompetition("all")
    setSelectedTeam("all")
    setSelectedResult("all")
    setSelectedVenue("all")
    setDateFrom("")
    setDateTo("")
    setMinGoals("")
    setMinAssists("")
  }

  const hasActiveFilters =
    searchTerm ||
    selectedCompetition !== "all" ||
    selectedTeam !== "all" ||
    selectedResult !== "all" ||
    selectedVenue !== "all" ||
    dateFrom ||
    dateTo ||
    minGoals ||
    minAssists

  const filteredCount = matches.length
  const totalMatches = matches.length

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Filtros de Partidos</span>
              <Badge variant="outline" className="ml-2">
                {filteredCount} de {totalMatches}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                {showAdvanced ? "Ocultar" : "Avanzado"}
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Limpiar Todo
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar oponente, competencia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Competition */}
            <div className="relative">
              <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
                <SelectTrigger className="pl-10">
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
            </div>

            {/* Team */}
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="pl-10">
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
            </div>

            {/* Result */}
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <Select value={selectedResult} onValueChange={setSelectedResult}>
                <SelectTrigger className="pl-10">
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
          </div>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 border-t pt-4"
              >
                <h4 className="text-sm font-medium text-muted-foreground">Filtros Avanzados</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Venue */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Localía" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las localías</SelectItem>
                        <SelectItem value="home">Local</SelectItem>
                        <SelectItem value="away">Visitante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Min Goals */}
                  <Input
                    type="number"
                    placeholder="Goles mínimos"
                    value={minGoals}
                    onChange={(e) => setMinGoals(e.target.value)}
                    min="0"
                  />

                  {/* Min Assists */}
                  <Input
                    type="number"
                    placeholder="Asistencias mínimas"
                    value={minAssists}
                    onChange={(e) => setMinAssists(e.target.value)}
                    min="0"
                  />
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Desde
                    </label>
                    <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Hasta
                    </label>
                    <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg"
              >
                <span className="text-sm font-medium text-muted-foreground">Filtros activos:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Búsqueda: {searchTerm}
                    <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {selectedCompetition !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCompetition}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setSelectedCompetition("all")}
                    />
                  </Badge>
                )}
                {selectedTeam !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedTeam}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setSelectedTeam("all")}
                    />
                  </Badge>
                )}
                {selectedResult !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedResult === "win" ? "Victoria" : selectedResult === "draw" ? "Empate" : "Derrota"}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setSelectedResult("all")}
                    />
                  </Badge>
                )}
                {selectedVenue !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedVenue === "home" ? "Local" : "Visitante"}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setSelectedVenue("all")}
                    />
                  </Badge>
                )}
                {minGoals && (
                  <Badge variant="secondary" className="gap-1">
                    Goles ≥ {minGoals}
                    <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setMinGoals("")} />
                  </Badge>
                )}
                {minAssists && (
                  <Badge variant="secondary" className="gap-1">
                    Asistencias ≥ {minAssists}
                    <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setMinAssists("")} />
                  </Badge>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
