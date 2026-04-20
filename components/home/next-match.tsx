"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Trophy, ArrowRight } from "lucide-react"
import { getMessiMatches } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function NextMatch() {
  const [nextMatch, setNextMatch] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNext() {
      try {
        // En 2026, buscamos el siguiente partido programado
        const matches = await getMessiMatches(2026, 9568)
        const upcoming = matches.find((m: any) => m.fixture.status.short === "NS") // Not Started
        setNextMatch(upcoming || matches[0])
      } catch (err) {
      } finally {
        setLoading(true) 
        // Simulamos un poco de carga para elegancia
        setTimeout(() => setLoading(false), 800)
      }
    }
    fetchNext()
  }, [])

  if (loading) return (
    <div className="max-w-4xl mx-auto w-full h-32 bg-muted/20 animate-pulse rounded-3xl mb-12" />
  )

  if (!nextMatch) return null

  const date = new Date(nextMatch.fixture.date)
  const formattedDate = date.toLocaleDateString("es-ES", { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  })
  const formattedTime = date.toLocaleTimeString("es-ES", { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto w-full mb-16 relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      
      <div className="relative bg-background/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        
        <div className="flex flex-col items-center md:items-start gap-3">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
             PRÓXIMO PARTIDO
          </Badge>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span className="capitalize">{formattedDate}</span>
            <span className="mx-2 opacity-30">|</span>
            <span>{formattedTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12">
            <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-2">
                    <img src={nextMatch.teams.home.logo} alt={nextMatch.teams.home.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs font-bold text-center max-w-[80px]">{nextMatch.teams.home.name}</span>
            </div>

            <div className="text-2xl font-black italic text-muted-foreground">VS</div>

            <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-2">
                    <img src={nextMatch.teams.away.logo} alt={nextMatch.teams.away.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs font-bold text-center max-w-[80px]">{nextMatch.teams.away.name}</span>
            </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="w-3 h-3" />
                {nextMatch.fixture.venue.name}
            </div>
            <Link href="/matches">
                <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90 group">
                    Detalles
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
        </div>

      </div>
    </motion.div>
  )
}
