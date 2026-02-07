"use client"

import { Card, CardContent } from "@/components/ui/card"
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
  Trophy,
  Zap,
  TrendingUp,
  Copy,
  Edit,
  Calendar
} from "lucide-react"
import type { Match } from "@/lib/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MatchCardProps {
  match: Match
  onEdit: (match: Match) => void
  onDelete: (matchId: string) => void
  onDuplicate: (match: Match) => void
}

export function MatchCard({ match, onEdit, onDelete, onDuplicate }: MatchCardProps) {
  const resultColors = {
    win: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
    draw: "bg-amber-500/15 text-amber-500 border-amber-500/20",
    loss: "bg-rose-500/15 text-rose-500 border-rose-500/20",
  } as const

  const resultGradient = {
    win: "from-emerald-500/5 to-transparent",
    draw: "from-amber-500/5 to-transparent",
    loss: "from-rose-500/5 to-transparent",
  } as const

  const resultLabels = {
    win: "V",
    draw: "E",
    loss: "D",
  } as const

  const performanceRating = Math.min(
    Math.round(((match.goals * 3 + match.assists * 2 + match.passAccuracy / 10) / 3) * 10) / 10,
    10,
  )

  const isStandoutPerformance = match.goals >= 2 || match.assists >= 2 || performanceRating >= 8

  // Helper to get initials for logo placeholder
  const getInitials = (name: string) => name.substring(0, 2).toUpperCase()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <div className={cn(
        "relative h-full overflow-hidden rounded-3xl border border-white/10 bg-background/40 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-white/20 hover:-translate-y-1",
        isStandoutPerformance ? "shadow-primary/5 border-primary/20" : ""
      )}>
        
        {/* Background Gradient based on result */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none", resultGradient[match.result])} />
        
        {/* Decorative Top Line */}
        <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", 
            match.result === 'win' ? "from-emerald-500/50 via-emerald-400 to-transparent" :
            match.result === 'draw' ? "from-amber-500/50 via-amber-400 to-transparent" :
            "from-rose-500/50 via-rose-400 to-transparent"
        )} />

        <div className="relative p-6 flex flex-col h-full">
            {/* Header: Competition & Date */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1 flex items-center gap-1.5">
                        <Trophy className="w-3 h-3" />
                        {match.competition}
                    </span>
                    <span className="text-xs text-muted-foreground/80 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(match.date), "d MMM yyyy", { locale: es })}
                    </span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuContent align="end" className="w-40 backdrop-blur-xl bg-background/80 border-white/10">
                      <DropdownMenuItem onClick={() => onEdit(match)}>
                        <Edit className="w-4 h-4 mr-2" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(match)}>
                        <Copy className="w-4 h-4 mr-2" /> Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(match.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
            </div>

            {/* Teams Scoreboard */}
            <div className="flex items-center justify-between mb-8 relative">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center shadow-lg text-slate-800 font-bold text-sm">
                        {getInitials(match.team)}
                    </div>
                    <span className="text-sm font-bold text-center leading-tight line-clamp-2 max-w-[80px]">{match.team}</span>
                </div>

                {/* Score / VS */}
                <div className="flex flex-col items-center px-4">
                    <div className="text-3xl font-black tracking-tighter tabular-nums flex items-center gap-3">
                        <span className="text-foreground">{match.goals > 0 ? match.goals : '-'}</span>
                         <span className="text-muted-foreground/30 text-xl">VS</span>
                        <span className="text-muted-foreground">-</span> 
                        {/* Note: Opponent score isn't in the type, assuming user tracks Messi stats primarily. 
                            If opponent score existed, it would go here. 
                            For now, keeping it focused on the matchup visuals.
                        */}
                    </div>
                    <Badge variant="outline" className={cn("mt-2 border px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold", resultColors[match.result])}>
                        {match.result === 'win' ? 'Victoria' : match.result === 'draw' ? 'Empate' : 'Derrota'}
                    </Badge>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2 flex-1">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center shadow-lg text-white font-bold text-sm">
                        {getInitials(match.opponent)}
                    </div>
                    <span className="text-sm font-bold text-center leading-tight line-clamp-2 max-w-[80px]">{match.opponent}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center border border-white/5 transition-colors hover:bg-white/10">
                    <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Gol</span>
                    <div className="flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span className="text-xl font-bold">{match.goals}</span>
                    </div>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center border border-white/5 transition-colors hover:bg-white/10">
                    <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Asist</span>
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-xl font-bold">{match.assists}</span>
                    </div>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center border border-white/5 transition-colors hover:bg-white/10">
                    <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Rating</span>
                    <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-xl font-bold">{performanceRating}</span>
                    </div>
                </div>
            </div>

            {/* Footer / Location */}
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {match.venue === 'home' ? 'Local' : 'Visitante'}
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {match.minutes}'
                </div>
            </div>
            
        </div>
      </div>
    </motion.div>
  )
}
