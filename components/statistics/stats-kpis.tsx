"use client"

import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Users, Clock, TrendingUp, Award, Zap, BarChart3, Activity } from "lucide-react"
import type { Match } from "@/lib/types"
import { motion, useSpring, useTransform, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface StatsKpisProps {
  matches: Match[]
}

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const motionValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView])

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          maximumFractionDigits: 1,
        }).format(Number(latest.toFixed(1)))
      }
    })
  }, [motionValue])

  return <span ref={ref} />
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
      color: "text-blue-500",
      gradient: "from-blue-500/20 to-blue-600/5",
      border: "border-blue-500/20",
      subtitle: `${wins}W ${draws}D ${losses}L`,
      maxValue: 1000,
    },
    {
      title: "Total Goles",
      value: totalGoals,
      icon: Target,
      color: "text-green-500",
      gradient: "from-green-500/20 to-green-600/5",
      border: "border-green-500/20",
      subtitle: `${avgGoalsPerMatch.toFixed(2)} / partido`,
      maxValue: 800,
    },
    {
      title: "Asistencias",
      value: totalAssists,
      icon: Users,
      color: "text-purple-500",
      gradient: "from-purple-500/20 to-purple-600/5",
      border: "border-purple-500/20",
      subtitle: `${avgAssistsPerMatch.toFixed(2)} / partido`,
      maxValue: 400,
    },
    {
      title: "Minutos Jugados",
      value: totalMinutes,
      icon: Clock,
      color: "text-orange-500",
      gradient: "from-orange-500/20 to-orange-600/5",
      border: "border-orange-500/20",
      subtitle: `${Math.round(totalMinutes / 60)} hrs`,
      maxValue: 60000,
    },
    {
      title: "Win Rate",
      value: winRate,
      icon: TrendingUp,
      color: "text-emerald-500",
      gradient: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/20",
      subtitle: "Porcentaje de victorias",
      maxValue: 100,
      suffix: "%",
    },
    {
      title: "Remates Total",
      value: totalShots,
      icon: Zap,
      color: "text-red-500",
      gradient: "from-red-500/20 to-red-600/5",
      border: "border-red-500/20",
      subtitle: `${(totalShots / totalMatches || 0).toFixed(1)} / partido`,
      maxValue: 3000,
    },
    {
      title: "Pases Completados",
      value: totalPasses,
      icon: BarChart3,
      color: "text-indigo-500",
      gradient: "from-indigo-500/20 to-indigo-600/5",
      border: "border-indigo-500/20",
      subtitle: `${(totalPasses / totalMatches || 0).toFixed(0)} / partido`,
      maxValue: 50000,
    },
    {
      title: "Precisión de Pase",
      value: avgPassAccuracy,
      icon: Award,
      color: "text-yellow-500",
      gradient: "from-yellow-500/20 to-yellow-600/5",
      border: "border-yellow-500/20",
      subtitle: "Precisión promedio",
      maxValue: 100,
      suffix: "%",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-2 mb-8"
      >
        <Activity className="w-6 h-6 text-primary animate-pulse" />
        <h2 className="text-2xl font-bold text-center tracking-tight">Indicadores de Rendimiento</h2>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          const percentage = Math.min((kpi.value / kpi.maxValue) * 100, 100)

          return (
            <motion.div
              key={kpi.title}
              variants={item}
              whileHover={{ y: -5, scale: 1.02 }}
              className={cn(
                "relative overflow-hidden rounded-2xl border bg-background/50 backdrop-blur-sm p-6 shadow-lg transition-all",
                kpi.border,
                "group hover:shadow-xl dark:hover:shadow-primary/5"
              )}
            >
              {/* Soft Gradient Background */}
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-500", kpi.gradient)} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2.5 rounded-xl bg-background/80 shadow-sm", kpi.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {kpi.suffix === "%" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/50 backdrop-blur text-[10px] font-bold">
                      %
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase text-[10px]">
                    {kpi.title}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight">
                       <AnimatedNumber value={kpi.value} />
                    </span>
                    {kpi.suffix && <span className="text-sm font-medium text-muted-foreground">{kpi.suffix}</span>}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                   <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
                     <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={cn("h-full rounded-full", kpi.color.replace("text-", "bg-"))}
                     />
                   </div>
                   <p className="text-xs text-muted-foreground font-medium text-right">
                     {kpi.subtitle}
                   </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Summary Section with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="text-center md:text-left space-y-2">
             <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
               Impacto Total
             </h3>
             <p className="text-slate-400 max-w-sm">
               Análisis combinado de goles y asistencias para determinar la contribución directa al marcador.
             </p>
          </div>
          
          <div className="flex gap-8 md:gap-16">
             <div className="text-center">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">G + A</p>
                <p className="text-5xl font-bold tracking-tighter text-blue-400">
                   <AnimatedNumber value={totalGoals + totalAssists} />
                </p>
             </div>
             <div className="w-px h-16 bg-white/10 hidden md:block"></div>
             <div className="text-center">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Ratio de Gol</p>
                <div className="flex items-center justify-center gap-1">
                   <p className="text-5xl font-bold tracking-tighter text-purple-400">
                      <AnimatedNumber value={totalShots > 0 ? (totalGoals / totalShots) * 100 : 0} />
                   </p>
                   <span className="text-xl text-purple-400/80 mb-4">%</span>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
