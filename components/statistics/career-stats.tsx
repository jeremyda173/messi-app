"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Trophy, Activity, Target, Zap } from "lucide-react"
import { useState, memo } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type TeamStats = {
  name: string
  period: string
  goals: number
  assists: number
  matches: number
  titles: number
  colors: {
    from: string
    via: string
    to: string
    text: string
  }
  logo?: string
}

const teams: TeamStats[] = [
  {
    name: "FC Barcelona",
    period: "2004-2021",
    goals: 672,
    assists: 305,
    matches: 778,
    titles: 35,
    colors: {
      from: "#A50044",
      via: "#004D98",
      to: "#EDBB00",
      text: "text-white"
    }
  },
  {
    name: "Paris Saint-Germain",
    period: "2021-2023",
    goals: 32,
    assists: 35,
    matches: 75,
    titles: 3,
    colors: {
      from: "#004170",
      via: "#DA291C",
      to: "#004170",
      text: "text-white"
    }
  },
  {
    name: "Inter Miami",
    period: "2023-presente",
    goals: 78,
    assists: 27,
    matches: 98,
    titles: 3,
    colors: {
      from: "#F7B5CD",
      via: "#231F20",
      to: "#F7B5CD",
      text: "text-white"
    }
  },
  {
    name: "Selección Argentina",
    period: "2005-presente",
    goals: 122,
    assists: 45,
    matches: 198,
    titles: 7,
    colors: {
      from: "#74ACDF",
      via: "#F6B40E",
      to: "#74ACDF",
      text: "text-white"
    }
  },
  {
    name: "Newell's Old Boys",
    period: "1994-2000 (Inferiores)",
    goals: 234,
    assists: 0,
    matches: 176,
    titles: 0,
    colors: {
      from: "#E30613",
      via: "#000000",
      to: "#E30613",
      text: "text-white"
    }
  }
]

export const CareerStats = memo(function CareerStats() {
  const [selectedTeam, setSelectedTeam] = useState<TeamStats>(teams[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const StatItem = ({ icon: Icon, value, label, delay }: { icon: any, value: number, label: string, delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-black/20 backdrop-blur-md rounded-2xl p-5 text-center transform hover:scale-105 transition-transform duration-300 border border-white/10"
    >
      <div className="flex justify-center mb-2">
        <div className="p-2 rounded-full bg-white/20">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <motion.p 
        key={value}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-3xl font-bold text-white mb-1"
      >
        {value}
      </motion.p>
      <p className="text-white/80 text-sm font-medium uppercase tracking-wider">{label}</p>
    </motion.div>
  )

  return (
    <div className="space-y-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
           <Activity className="w-4 h-4" /> Trayectoria Profesional
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Estadísticas por Equipo</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Explora los números detallados de Messi en cada etapa de su legendaria carrera.
        </p>
      </motion.div>
      
      {/* Team Selector Dropdown */}
      <div className="max-w-md mx-auto relative z-20">
        <motion.button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-background/50 hover:bg-background/80 backdrop-blur-md border border-border rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg transition-all duration-200 group"
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-full bg-gradient-to-br shadow-inner" 
              style={{ backgroundImage: `linear-gradient(135deg, ${selectedTeam.colors.from}, ${selectedTeam.colors.via})` }} 
            />
            <div className="text-left">
              <p className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{selectedTeam.name}</p>
              <p className="text-xs text-muted-foreground font-medium">{selectedTeam.period}</p>
            </div>
          </div>
          <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", isDropdownOpen ? 'rotate-180' : '')} />
        </motion.button>
        
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden py-2"
            >
              {teams.map((team) => (
                <button
                  key={team.name}
                  onClick={() => {
                    setSelectedTeam(team)
                    setIsDropdownOpen(false)
                  }}
                  className={cn(
                    "w-full px-6 py-3 flex items-center gap-4 hover:bg-muted/50 transition-colors duration-200",
                    selectedTeam.name === team.name ? 'bg-primary/5' : ''
                  )}
                >
                  <div 
                    className="w-8 h-8 rounded-full shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${team.colors.from}, ${team.colors.via})` }}
                  />
                  <div className="text-left">
                    <p className={cn("font-semibold text-sm", selectedTeam.name === team.name ? 'text-primary' : 'text-foreground')}>{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.period}</p>
                  </div>
                  {selectedTeam.name === team.name && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Stats Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTeam.name}
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 10 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${selectedTeam.colors.from}cc, ${selectedTeam.colors.via}cc, ${selectedTeam.colors.to}cc)`,
            }}
          >
            {/* Background Texture/Noise */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
             
             {/* Decorative Circles */}
             <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 blur-3xl rounded-full" />
             <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-black/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                 <div className="text-center md:text-left">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-block px-4 py-1.5 rounded-full bg-black/20 text-white/90 backdrop-blur-md text-sm font-medium mb-3 border border-white/10"
                    >
                      {selectedTeam.period}
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight">
                      {selectedTeam.name}
                    </h3>
                 </div>
                 
                 {/* Team Badge Placeholder - could be an image */}
                 <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                    <Trophy className="w-10 h-10 text-white/80" />
                 </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatItem icon={Target} value={selectedTeam.goals} label="Goles" delay={0.1} />
                <StatItem icon={Zap} value={selectedTeam.assists} label="Asistencias" delay={0.2} />
                <StatItem icon={Activity} value={selectedTeam.matches} label="Partidos" delay={0.3} />
                <StatItem icon={Trophy} value={selectedTeam.titles} label="Títulos" delay={0.4} />
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-6 border-t border-white/10 text-center md:text-right"
              >
                 <Badge variant="outline" className="text-white border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                    {selectedTeam.goals > 0 ? (selectedTeam.goals / selectedTeam.matches).toFixed(2) : 0} goles por partido
                 </Badge>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
})

