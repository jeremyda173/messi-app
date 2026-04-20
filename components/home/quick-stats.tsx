"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { storage } from "@/lib/storage"
import { seedMatches } from "@/lib/seed-data"

interface QuickStatsData {
  totalMatches: number
  totalGoals: number
  totalAssists: number
  totalMinutes: number
}

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count.toLocaleString("en-US")}</span>
}

export function QuickStats() {
  const [stats, setStats] = useState<QuickStatsData>({
    totalMatches: 0,
    totalGoals: 0,
    totalAssists: 0,
    totalMinutes: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize with seed data if no matches exist
    let matches = storage.getMatches()
    if (matches.length === 0) {
      storage.saveMatches(seedMatches)
      matches = seedMatches
    }

    // Calculate stats from matches
    const calculatedStats = matches.reduce(
      (acc, match) => ({
        totalMatches: acc.totalMatches + 1,
        totalGoals: acc.totalGoals + match.goals,
        totalAssists: acc.totalAssists + match.assists,
        totalMinutes: acc.totalMinutes + match.minutes,
      }),
      { totalMatches: 0, totalGoals: 0, totalAssists: 0, totalMinutes: 0 },
    )

    setTimeout(() => {
      setStats(calculatedStats)
      setIsLoading(false)
    }, 500)
  }, [])

  const statsCards = [
    {
      title: "Partidos",
      value: stats.totalMatches,
      icon: Trophy,
      color: "text-blue-600 dark:text-blue-400",
      barColor: "bg-blue-600 dark:bg-blue-400",
      maxValue: 1000,
    },
    {
      title: "Goles",
      value: stats.totalGoals,
      icon: Target,
      color: "text-green-600 dark:text-green-400",
      barColor: "bg-green-600 dark:bg-green-400",
      maxValue: 800,
    },
    {
      title: "Asistencias",
      value: stats.totalAssists,
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      barColor: "bg-purple-600 dark:bg-purple-400",
      maxValue: 400,
    },
    {
      title: "Minutos",
      value: stats.totalMinutes,
      icon: Clock,
      color: "text-orange-600 dark:text-orange-400",
      barColor: "bg-orange-600 dark:bg-orange-400",
      maxValue: 50000,
    },
  ]

  return (
   <section className="flex-1 px-4 md:px-8 py-8 flex flex-col items-center justify-center text-center">

      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Estadísticas Rápidas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un vistazo a los números que definen la carrera de una leyenda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            const percentage = Math.min((stat.value / stat.maxValue) * 100, 100)

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="flex flex-col items-center space-y-3">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <h3 className="text-lg font-semibold text-foreground">{stat.title}</h3>
                </div>

                <motion.div
                  className="text-4xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                >
                  {isLoading ? (
                    <div className="animate-pulse bg-muted rounded h-10 w-20 mx-auto" />
                  ) : (
                    <motion.span
                      className={stat.color}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                    >
                      <AnimatedCounter value={stat.value} duration={2000 + index * 200} />
                    </motion.span>
                  )}
                </motion.div>

                <div className="w-full space-y-2">
                  <div className="w-full bg-muted dark:bg-muted/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${stat.barColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: isLoading ? 0 : `${percentage}%` }}
                      transition={{ duration: 2.5, delay: index * 0.1 + 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>{stat.maxValue.toLocaleString("en-US")}</span>
                  </div>
                </div>

                {stat.title === "Goles" && stats.totalMatches > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {(stats.totalGoals / stats.totalMatches).toFixed(1)} por partido
                  </Badge>
                )}
                {stat.title === "Asistencias" && stats.totalMatches > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {(stats.totalAssists / stats.totalMatches).toFixed(1)} por partido
                  </Badge>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Additional Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Logros Destacados</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  8 Balones de Oro
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Copa del Mundo 2022
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Copa América 2021
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  4 Champions League
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  10 La Liga
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
