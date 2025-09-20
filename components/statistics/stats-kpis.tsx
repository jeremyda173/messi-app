"use client"

import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Users, Clock, TrendingUp, Award, Zap, BarChart3 } from "lucide-react"
import type { Match } from "@/lib/types"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface StatsKpisProps {
  matches: Match[]
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

  return <span>{count.toLocaleString()}</span>
}

function AnimatedPercentage({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(progress * value)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count.toFixed(1)}%</span>
}

export function StatsKpis({ matches }: StatsKpisProps) {
  // Calculate statistics
  const totalMatches = matches.length
  const totalGoals = matches.reduce((sum, match) => sum + match.goals, 0)
  const totalAssists = matches.reduce((sum, match) => sum + match.assists, 0)
  const totalMinutes = matches.reduce((sum, match) => sum + match.minutes, 0)
  const totalShots = matches.reduce((sum, match) => sum + match.shots, 0)
  const totalPasses = matches.reduce((sum, match) => sum + match.passes, 0)

  const wins = matches.filter((match) => match.result === "win").length
  const draws = matches.filter((match) => match.result === "draw").length
  const losses = matches.filter((match) => match.result === "loss").length

  const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0
  const avgGoalsPerMatch = totalMatches > 0 ? totalGoals / totalMatches : 0
  const avgAssistsPerMatch = totalMatches > 0 ? totalAssists / totalMatches : 0
  const avgPassAccuracy =
    totalMatches > 0 ? matches.reduce((sum, match) => sum + match.passAccuracy, 0) / totalMatches : 0

  const kpis = [
    {
      title: "Total Partidos",
      value: totalMatches,
      icon: Trophy,
      color: "text-blue-600 dark:text-blue-400",
      barColor: "bg-blue-600 dark:bg-blue-400",
      subtitle: `${wins}V ${draws}E ${losses}D`,
      maxValue: 1000,
    },
    {
      title: "Total Goles",
      value: totalGoals,
      icon: Target,
      color: "text-green-600 dark:text-green-400",
      barColor: "bg-green-600 dark:bg-green-400",
      subtitle: `${avgGoalsPerMatch.toFixed(1)} por partido`,
      maxValue: 800,
    },
    {
      title: "Total Asistencias",
      value: totalAssists,
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      barColor: "bg-purple-600 dark:bg-purple-400",
      subtitle: `${avgAssistsPerMatch.toFixed(1)} por partido`,
      maxValue: 400,
    },
    {
      title: "Total Minutos",
      value: totalMinutes,
      icon: Clock,
      color: "text-orange-600 dark:text-orange-400",
      barColor: "bg-orange-600 dark:bg-orange-400",
      subtitle: `${Math.round(totalMinutes / 60)} horas`,
      maxValue: 50000,
    },
    {
      title: "Porcentaje de Victorias",
      value: winRate,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      barColor: "bg-emerald-600 dark:bg-emerald-400",
      subtitle: `${wins} de ${totalMatches} partidos`,
      maxValue: 100,
      isPercentage: true,
    },
    {
      title: "Total Remates",
      value: totalShots,
      icon: Zap,
      color: "text-red-600 dark:text-red-400",
      barColor: "bg-red-600 dark:bg-red-400",
      subtitle: `${(totalShots / totalMatches || 0).toFixed(1)} por partido`,
      maxValue: 3000,
    },
    {
      title: "Total Pases",
      value: totalPasses,
      icon: BarChart3,
      color: "text-indigo-600 dark:text-indigo-400",
      barColor: "bg-indigo-600 dark:bg-indigo-400",
      subtitle: `${(totalPasses / totalMatches || 0).toFixed(0)} por partido`,
      maxValue: 50000,
    },
    {
      title: "Precisión de Pases",
      value: avgPassAccuracy,
      icon: Award,
      color: "text-yellow-600 dark:text-yellow-400",
      barColor: "bg-yellow-600 dark:bg-yellow-400",
      subtitle: "Promedio general",
      maxValue: 100,
      isPercentage: true,
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center">Indicadores Clave de Rendimiento</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          const percentage = Math.min((kpi.value / kpi.maxValue) * 100, 100)

          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center space-y-4"
            >
              <div className="flex flex-col items-center space-y-3">
                <Icon className={`w-8 h-8 ${kpi.color}`} />
                <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
              </div>

              <motion.div
                className="text-3xl font-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <span className={kpi.color}>
                  {kpi.isPercentage ? (
                    <AnimatedPercentage value={kpi.value} duration={1500 + index * 200} />
                  ) : (
                    <AnimatedCounter value={kpi.value} duration={1500 + index * 200} />
                  )}
                </span>
              </motion.div>

              <div className="w-full space-y-2">
                <div className="w-full bg-muted dark:bg-muted/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${kpi.barColor}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                      duration: 2.5,
                      delay: index * 0.1 + 0.5,
                      ease: "easeOut",
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>{kpi.maxValue.toLocaleString()}</span>
                </div>
              </div>

              <Badge variant="secondary" className="text-xs">
                {kpi.subtitle}
              </Badge>
            </motion.div>
          )
        })}
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 p-6 rounded-lg">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Resumen de Rendimiento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <motion.div
                  className="text-2xl font-bold text-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <AnimatedCounter value={totalGoals + totalAssists} duration={2000} />
                </motion.div>
                <div className="text-sm text-muted-foreground">Participaciones en Gol</div>
              </div>
              <div className="space-y-2">
                <motion.div
                  className="text-2xl font-bold text-blue-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <AnimatedPercentage value={totalShots > 0 ? (totalGoals / totalShots) * 100 : 0} duration={2000} />
                </motion.div>
                <div className="text-sm text-muted-foreground">Efectividad de Remate</div>
              </div>
              <div className="space-y-2">
                <motion.div
                  className="text-2xl font-bold text-purple-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <AnimatedCounter value={Math.round(totalMinutes / totalMatches || 0)} duration={2000} />
                </motion.div>
                <div className="text-sm text-muted-foreground">Minutos Promedio</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
