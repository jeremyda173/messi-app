"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Trash2,
  MapPin,
  Clock,
  Target,
  Users,
  Activity,
  Zap,
  BarChart3,
  Star,
} from "lucide-react"
import type { Match } from "@/lib/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion } from "framer-motion"

interface MatchCardProps {
  match: Match
  onEdit: (match: Match) => void
  onDelete: (matchId: string) => void
  onDuplicate: (match: Match) => void
}

export function MatchCard({ match, onEdit, onDelete, onDuplicate }: MatchCardProps) {
  const resultColors = {
    win: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    draw: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    loss: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  } as const

  const resultLabels = {
    win: "Victoria",
    draw: "Empate",
    loss: "Derrota",
  } as const

  const performanceRating = Math.min(
    Math.round(((match.goals * 3 + match.assists * 2 + match.passAccuracy / 10) / 3) * 10) / 10,
    10,
  )

  const isStandoutPerformance = match.goals >= 2 || match.assists >= 2 || performanceRating >= 8

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <Card
        className={`h-full flex flex-col hover:shadow-lg transition-all duration-300 ${
          isStandoutPerformance ? "ring-2 ring-primary/20" : ""
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">
                  {match.team} vs {match.opponent}
                </CardTitle>
                {isStandoutPerformance && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
              </div>
              <p className="text-sm text-muted-foreground">
                {format(new Date(match.date), "dd 'de' MMMM, yyyy", { locale: es })}
              </p>
              <Badge variant="outline" className="w-fit">
                {match.competition}
              </Badge>
            </div>

            {/* Menú de opciones con Portal y z-index alto */}
            <DropdownMenu onOpenChange={(o) => console.debug("menu open?", o)}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="Más opciones">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuPortal>
                <DropdownMenuContent
                  side="bottom"
                  align="end"
                  sideOffset={4}
                  className="z-50"
                >
                  <DropdownMenuItem onClick={() => onEdit(match)}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDuplicate(match)}>
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => {
                      onDelete(match.id)
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {match.venue === "home" ? "Local" : "Visitante"}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {match.minutes} min
              </div>
            </div>
            <Badge className={resultColors[match.result]}>{resultLabels[match.result]}</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 py-3 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <Target className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">{match.goals}</div>
              <div className="text-xs text-muted-foreground">Goles</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">{match.assists}</div>
              <div className="text-xs text-muted-foreground">Asistencias</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">{match.passAccuracy}%</div>
              <div className="text-xs text-muted-foreground">Precisión</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-500" />
                <span>Remates</span>
              </div>
              <span className="font-medium">{match.shots}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                <span>Pases</span>
              </div>
              <span className="font-medium">{match.passes}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Calificación</span>
              </div>
              <Badge variant={performanceRating >= 8 ? "default" : performanceRating >= 6 ? "secondary" : "outline"}>
                {performanceRating}/10
              </Badge>
            </div>
          </div>

          {isStandoutPerformance && (
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-3 border border-primary/20">
              <div className="text-xs font-medium text-primary mb-1">Actuación Destacada</div>
              <div className="text-xs text-muted-foreground">
                {match.goals >= 2 && "Múltiples goles"}
                {match.goals >= 2 && match.assists >= 2 && " • "}
                {match.assists >= 2 && "Múltiples asistencias"}
                {performanceRating >= 8 && (match.goals >= 2 || match.assists >= 2) && " • "}
                {performanceRating >= 8 && "Calificación excelente"}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
