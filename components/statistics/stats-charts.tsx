"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"
import type { Match } from "@/lib/types"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatsChartsProps {
  matches: Match[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl text-sm">
        <p className="font-bold mb-2 text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color || entry.fill }}
            />
            <span className="text-muted-foreground capitalize">{entry.name}:</span>
            <span className="font-mono font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function StatsCharts({ matches }: StatsChartsProps) {
  // Prepare data for charts
  const monthlyData = matches.reduce(
    (acc, match) => {
      const month = new Date(match.date).toLocaleDateString("es-ES", { year: "numeric", month: "short" })
      const existing = acc.find((item) => item.month === month)

      if (existing) {
        existing.goals += match.goals
        existing.assists += match.assists
        existing.matches += 1
      } else {
        acc.push({
          month,
          goals: match.goals,
          assists: match.assists,
          matches: 1,
        })
      }
      return acc
    },
    [] as Array<{ month: string; goals: number; assists: number; matches: number }>,
  )

  const teamData = matches.reduce(
    (acc, match) => {
      const existing = acc.find((item) => item.team === match.team)

      if (existing) {
        existing.goals += match.goals
        existing.assists += match.assists
        existing.matches += 1
      } else {
        acc.push({
          team: match.team,
          goals: match.goals,
          assists: match.assists,
          matches: 1,
        })
      }
      return acc
    },
    [] as Array<{ team: string; goals: number; assists: number; matches: number }>,
  )

  const competitionData = matches.reduce(
    (acc, match) => {
      const existing = acc.find((item) => item.competition === match.competition)

      if (existing) {
        existing.matches += 1
        existing.goals += match.goals
      } else {
        acc.push({
          competition: match.competition,
          matches: 1,
          goals: match.goals,
        })
      }
      return acc
    },
    [] as Array<{ competition: string; matches: number; goals: number }>,
  )

  const resultData = [
    { name: "Victorias", value: matches.filter((m) => m.result === "win").length, color: "#10b981" },
    { name: "Empates", value: matches.filter((m) => m.result === "draw").length, color: "#f59e0b" },
    { name: "Derrotas", value: matches.filter((m) => m.result === "loss").length, color: "#ef4444" },
  ]
  
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay datos suficientes para mostrar gráficos</p>
      </div>
    )
  }

  const ChartCard = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      <Card className="bg-background/50 backdrop-blur-sm border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center tracking-tight">Análisis Gráfico</h2>

      <Tabs defaultValue="performance" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-muted/50 p-1 rounded-full border border-border/50">
            <TabsTrigger value="performance" className="rounded-full px-6">Rendimiento</TabsTrigger>
            <TabsTrigger value="teams" className="rounded-full px-6">Por Equipo</TabsTrigger>
            <TabsTrigger value="competitions" className="rounded-full px-6">Competencias</TabsTrigger>
            <TabsTrigger value="results" className="rounded-full px-6">Resultados</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="performance" className="space-y-6">
          <ChartCard title="Evolución de Goles y Asistencias">
             <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAssists" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted/20" />
                  <XAxis 
                    dataKey="month" 
                    stroke="currentColor" 
                    className="text-muted-foreground text-xs" 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="currentColor" 
                    className="text-muted-foreground text-xs" 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{stroke: 'currentColor', strokeWidth: 1, opacity: 0.2}} />
                  <Legend iconType="circle" />
                  <Area
                    type="monotone"
                    dataKey="goals"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorGoals)"
                    name="Goles"
                    animationDuration={2000}
                  />
                  <Area
                    type="monotone"
                    dataKey="assists"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAssists)"
                    name="Asistencias"
                    animationDuration={2000}
                    animationBegin={500}
                  />
                </AreaChart>
             </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <ChartCard title="Rendimiento por Equipo" delay={0.1}>
             <ResponsiveContainer width="100%" height={400}>
                <BarChart data={teamData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-muted/20" />
                  <XAxis 
                    dataKey="team" 
                    stroke="currentColor" 
                    className="text-muted-foreground text-xs" 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="currentColor" 
                    className="text-muted-foreground text-xs" 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: 'currentColor', opacity: 0.1}} />
                  <Legend iconType="circle" />
                  <Bar dataKey="goals" fill="#10b981" name="Goles" radius={[4, 4, 0, 0]} animationDuration={1500} />
                  <Bar dataKey="assists" fill="#3b82f6" name="Asistencias" radius={[4, 4, 0, 0]} animationDuration={1500} animationBegin={300} />
                </BarChart>
             </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="competitions" className="space-y-6">
          <ChartCard title="Partidos por Competencia" delay={0.1}>
             <ResponsiveContainer width="100%" height={400}>
                <BarChart data={competitionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-muted/20" />
                  <XAxis type="number" stroke="currentColor" className="text-muted-foreground text-xs" tickLine={false} axisLine={false} />
                  <YAxis 
                    dataKey="competition" 
                    type="category" 
                    width={100} 
                    stroke="currentColor" 
                    className="text-muted-foreground text-xs font-medium" 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: 'currentColor', opacity: 0.1}} />
                  <Bar dataKey="matches" fill="#8b5cf6" name="Partidos" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1500}>
                     {competitionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(260, 80%, ${60 + (index * 5)}%)`} />
                     ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
           <ChartCard title="Distribución de Resultados" delay={0.1}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                 <div className="w-full md:w-1/2 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resultData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                          animationDuration={1500}
                        >
                          {resultData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="w-full md:w-1/2 grid grid-cols-1 gap-4">
                    {resultData.map((item) => (
                       <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <div className="flex-1">
                             <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{item.name}</span>
                                <span className="font-bold">{item.value}</span>
                             </div>
                             <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.value / matches.length) * 100}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
