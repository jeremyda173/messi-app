"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award, Target } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const achievements = [
  { icon: Trophy, label: "8 Balones de Oro", color: "bg-yellow-500" },
  { icon: Star, label: "Copa del Mundo 2022", color: "bg-blue-500" },
  { icon: Award, label: "4 Champions League", color: "bg-purple-500" },
  { icon: Target, label: "800+ Goles", color: "bg-green-500" },
]

export function Hero() {
  const router = useRouter()

  const handleViewStats = () => {
    router.push("/statistics")
  }

  const handleExploreMatches = () => {
    router.push("/matches")
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/lionel-messi-celebrating-with-argentina-jersey-wor.jpg"
          alt="Lionel Messi celebrando"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-white">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight"
              >
                Lionel{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Messi</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-200 text-pretty max-w-2xl"
              >
                El mejor futbolista de todos los tiempos. Campeón del mundo, leyenda del fútbol y orgullo argentino.
              </motion.p>
            </div>

            {/* Achievements Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {achievement.label}
                    </Badge>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleViewStats}
              >
                Ver Estadísticas
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                onClick={handleExploreMatches}
              >
                Explorar Partidos
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
