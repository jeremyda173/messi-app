"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

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
  }
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
      to: "#EDBB00"
    }
  },
  {
    name: "Paris Saint-Germain",
    period: "2021-2023",
    goals: 32,
    assists: 35,
    matches: 75,
    titles: 2,
    colors: {
      from: "#004170",
      via: "#DA291C",
      to: "#004170"
    }
  },
  {
    name: "Inter Miami",
    period: "2023-presente",
    goals: 33,
    assists: 18,
    matches: 37,
    titles: 2,
    colors: {
      from: "#F7B5CD",
      via: "#231F20",
      to: "#F7B5CD"
    }
  },
  {
    name: "Selección Argentina",
    period: "2005-presente",
    goals: 112,
    assists: 58,
    matches: 191,
    titles: 4,
    colors: {
      from: "#74ACDF",
      via: "#FFFFFF",
      to: "#74ACDF"
    }
  },
  {
    name: "Newell's Old Boys",
    period: "1994-2000",
    goals: 234,
    assists: 0,
    matches: 176,
    titles: 0,
    colors: {
      from: "#E30613",
      via: "#000000",
      to: "#E30613"
    }
  }
]

export function CareerStats() {
  const [selectedTeam, setSelectedTeam] = useState<TeamStats>(teams[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Estadísticas de Carrera</h2>
        <p className="text-muted-foreground">Los números que definen una leyenda</p>
      </motion.div>
      
      {/* Team Selector Dropdown */}
      <div className="max-w-md mx-auto relative">
        <motion.button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-card border border-border rounded-xl px-6 py-4 flex items-center justify-between hover:bg-accent transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-left">
            <p className="text-lg font-bold">{selectedTeam.name}</p>
            <p className="text-xs text-muted-foreground">{selectedTeam.period}</p>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </motion.button>
        
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {teams.map((team, index) => (
              <motion.button
                key={team.name}
                onClick={() => {
                  setSelectedTeam(team)
                  setIsDropdownOpen(false)
                }}
                className={`w-full px-6 py-3 text-left hover:bg-accent transition-colors duration-200 ${
                  selectedTeam.name === team.name ? 'bg-accent/50' : ''
                } ${index !== teams.length - 1 ? 'border-b border-border' : ''}`}
                whileHover={{ x: 5 }}
              >
                <p className="font-semibold">{team.name}</p>
                <p className="text-xs text-muted-foreground">{team.period}</p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Stats Card */}
      <motion.div
        key={selectedTeam.name}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        <div
          className="rounded-2xl p-8 shadow-xl border border-white/20"
          style={{
            background: `linear-gradient(135deg, ${selectedTeam.colors.from}dd 0%, ${selectedTeam.colors.via}dd 50%, ${selectedTeam.colors.to}dd 100%)`
          }}
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">{selectedTeam.name}</h3>
            <span className="text-sm text-white font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              {selectedTeam.period}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-4xl font-bold text-white drop-shadow-lg mb-1">{selectedTeam.goals}</p>
              <p className="text-sm text-white font-medium">Goles</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-4xl font-bold text-white drop-shadow-lg mb-1">{selectedTeam.assists}</p>
              <p className="text-sm text-white font-medium">Asistencias</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-4xl font-bold text-white drop-shadow-lg mb-1">{selectedTeam.matches}</p>
              <p className="text-sm text-white font-medium">Partidos</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-4xl font-bold text-white drop-shadow-lg mb-1">{selectedTeam.titles}</p>
              <p className="text-sm text-white font-medium">Títulos</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

