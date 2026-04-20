"use client"

import { useState, useEffect } from "react"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { MatchForm } from "@/components/matches/match-form"
import { MatchCard } from "@/components/matches/match-card"
import { MatchTable } from "@/components/matches/match-table"
import { MatchToolbar } from "@/components/matches/match-toolbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/ui/empty-state"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { Plus, Trophy, Search } from "lucide-react"
import { storage } from "@/lib/storage"
import { seedMatches } from "@/lib/seed-data"
import type { Match } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { getMessiMatches } from "@/lib/api"

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMatch, setEditingMatch] = useState<Match | null>(null)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; matchId: string; matchTitle: string }>({ open: false, matchId: "", matchTitle: "" })
  const { toast } = useToast()

  useEffect(() => {
    const loadMatches = async () => {
      setIsLoading(true)
      try {
        // Intentamos traer datos de las temporadas más recientes con datos confirmados
        const [data2024, data2025] = await Promise.all([
          getMessiMatches(2024, 9568),
          getMessiMatches(2025, 9568)
        ])
        
        const allApiData = [...(data2025 || []), ...(data2024 || [])]
        
        if (allApiData.length > 0) {
          const realMatches: Match[] = allApiData.map((m: any) => ({
            id: `api-${m.fixture.id}`,
            date: m.fixture.date.split("T")[0],
            competition: m.league.name,
            team: m.teams.home.name.includes("Miami") ? m.teams.home.name : m.teams.away.name,
            opponent: m.teams.home.name.includes("Miami") ? m.teams.away.name : m.teams.home.name,
            location: m.fixture.venue.name || "Stadium",
            minutes: m.fixture.status.elapsed || 90,
            goals: m.goals.home ?? 0,
            assists: 0,
            shots: 0,
            passes: 0,
            passAccuracy: 0,
            result: m.teams.home.winner ? (m.teams.home.name.includes("Miami") ? "win" : "loss") : 
                    m.teams.away.winner ? (m.teams.away.name.includes("Miami") ? "win" : "loss") : "draw",
            teamScore: m.goals.home,
            opponentScore: m.goals.away,
            venue: m.teams.home.name.includes("Miami") ? "home" : "away",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }))
          
          setMatches(realMatches)
          setFilteredMatches(realMatches)
        } else {
            // Si la API sigue vacía, usamos locales pero avisamos
            const loadedMatches = storage.getMatches().length > 0 ? storage.getMatches() : seedMatches
            setMatches(loadedMatches)
            setFilteredMatches(loadedMatches)
        }
      } catch (error) {
        console.error("API Error:", error)
        const loadedMatches = storage.getMatches().length > 0 ? storage.getMatches() : seedMatches
        setMatches(loadedMatches)
        setFilteredMatches(loadedMatches)
      } finally {
        setIsLoading(false)
      }
    }

    loadMatches()
  }, [toast])

  useEffect(() => {
    const query = searchQuery.toLowerCase()
    const filtered = matches.filter(
      (m) =>
        m.team.toLowerCase().includes(query) ||
        m.opponent.toLowerCase().includes(query) ||
        (m.location && m.location.toLowerCase().includes(query))
    )
    setFilteredMatches(filtered)
  }, [searchQuery, matches])

  const handleCreateMatch = (matchData: Omit<Match, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newMatch: Match = { ...matchData, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      const updatedMatches = [newMatch, ...matches]
      setMatches(updatedMatches)
      storage.saveMatches(updatedMatches)
      toast({ title: "¡Partido creado!", description: "El partido se ha guardado correctamente." })
      setIsFormOpen(false)
    } catch (error) {
      toast({ title: "Error al crear partido", description: "No se pudo guardar el partido. Intenta nuevamente.", variant: "destructive" })
    }
  }

  const handleUpdateMatch = (matchData: Omit<Match, "id" | "createdAt" | "updatedAt">) => {
    if (!editingMatch) return
    try {
      const updatedMatch: Match = { ...matchData, id: editingMatch.id, createdAt: editingMatch.createdAt, updatedAt: new Date().toISOString() }
      const updatedMatches = matches.map((m) => (m.id === editingMatch.id ? updatedMatch : m))
      setMatches(updatedMatches)
      storage.saveMatches(updatedMatches)
      toast({ title: "¡Partido actualizado!", description: "Los cambios se han guardado correctamente." })
      setEditingMatch(null)
      setIsFormOpen(false)
    } catch (error) {
      toast({ title: "Error al actualizar", description: "No se pudieron guardar los cambios. Intenta nuevamente.", variant: "destructive" })
    }
  }

  const handleDeleteMatch = (matchId: string) => {
    const match = matches.find((m) => m.id === matchId)
    if (match) {
      setDeleteConfirmation({ open: true, matchId, matchTitle: `${match.team} vs ${match.opponent}` })
    }
  }

  const confirmDeleteMatch = () => {
    try {
      const updatedMatches = matches.filter((m) => m.id !== deleteConfirmation.matchId)
      setMatches(updatedMatches)
      storage.saveMatches(updatedMatches)
      toast({ title: "Partido eliminado", description: "El partido se ha eliminado correctamente." })
    } catch (error) {
      toast({ title: "Error al eliminar", description: "No se pudo eliminar el partido. Intenta nuevamente.", variant: "destructive" })
    } finally {
      setDeleteConfirmation({ open: false, matchId: "", matchTitle: "" })
    }
  }

  const handleDuplicateMatch = (match: Match) => {
    try {
      const duplicatedMatch: Match = { ...match, id: Date.now().toString(), date: new Date().toISOString().split("T")[0], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      const updatedMatches = [duplicatedMatch, ...matches]
      setMatches(updatedMatches)
      storage.saveMatches(updatedMatches)
      toast({ title: "¡Partido duplicado!", description: "Se ha creado una copia del partido con la fecha actual." })
    } catch (error) {
      toast({ title: "Error al duplicar", description: "No se pudo duplicar el partido. Intenta nuevamente.", variant: "destructive" })
    }
  }

  const handleEdit = (match: Match) => {
    setEditingMatch(match)
    setIsFormOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <HeaderNav />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="h-10 bg-muted rounded w-1/3" />
            <div className="h-5 bg-muted rounded w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderNav />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-8 space-y-8">
          <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Partidos</h1>
                <p className="text-muted-foreground">Gestiona y visualiza todos los partidos de Lionel Messi</p>
              </div>
              <Button onClick={() => setIsFormOpen(true)} className="inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Partido
              </Button>
            </div>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Buscar partidos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "cards" | "table")} className="w-full">
              <div className="w-full flex justify-center">
                <TabsList className="grid w-full sm:w-auto grid-cols-2 rounded-xl">
                  <TabsTrigger value="cards">Vista de Tarjetas</TabsTrigger>
                  <TabsTrigger value="table">Vista de Tabla</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="cards" className="mt-6 space-y-6">
                {filteredMatches.length === 0 ? (
                  <EmptyState
                    icon={<Trophy className="w-12 h-12" />}
                    title={matches.length === 0 ? "No hay partidos registrados" : "No se encontraron partidos"}
                    description={matches.length === 0 ? "Comienza registrando el primer partido de Messi" : "Intenta ajustar los filtros para encontrar partidos"}
                    action={{ label: matches.length === 0 ? "Crear primer partido" : "Limpiar filtros", onClick: matches.length === 0 ? () => setIsFormOpen(true) : () => setSearchQuery("") }}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch overflow-visible">
                    {filteredMatches.map((match) => (
                      <div key={match.id} className="h-full overflow-visible">
                        <MatchCard
                          match={match}
                          onEdit={handleEdit}
                          onDelete={handleDeleteMatch}
                          onDuplicate={handleDuplicateMatch}
                        />
                      </div>
                    ))}
                  </div>

                )}
              </TabsContent>

              <TabsContent value="table" className="mt-6">
                {filteredMatches.length === 0 ? (
                  <EmptyState
                    icon={<Search className="w-12 h-12" />}
                    title="No se encontraron partidos"
                    description="Intenta ajustar los filtros para encontrar partidos"
                    action={{ label: "Limpiar filtros", onClick: () => setSearchQuery("") }}
                  />
                ) : (
                  <MatchTable matches={filteredMatches} onEdit={handleEdit} onDelete={handleDeleteMatch} onDuplicate={handleDuplicateMatch} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <MatchForm
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open)
            if (!open) setEditingMatch(null)
          }}
          match={editingMatch}
          onSubmit={editingMatch ? handleUpdateMatch : handleCreateMatch}
        />

        <ConfirmationDialog
          open={deleteConfirmation.open}
          onOpenChange={(open) => setDeleteConfirmation((prev) => ({ ...prev, open }))}
          title="¿Eliminar partido?"
          description={`¿Estás seguro de que quieres eliminar el partido \"${deleteConfirmation.matchTitle}\"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={confirmDeleteMatch}
          variant="destructive"
        />
      </main>
      <Footer />
    </div>
  )
}
