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
} from "recharts"
import type { Match } from "@/lib/types"
import { motion } from "framer-motion"

interface StatsChartsProps {
  matches: Match[]
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

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay datos suficientes para mostrar gráficos</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Análisis Gráfico</h2>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="teams">Por Equipo</TabsTrigger>
          <TabsTrigger value="competitions">Competencias</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Goles y Asistencias por Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="goals"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Goles"
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="assists"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Asistencias"
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Equipo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={teamData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="goals" fill="#10b981" name="Goles" />
                    <Bar dataKey="assists" fill="#3b82f6" name="Asistencias" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="competitions" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle>Partidos por Competencia</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={competitionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="competition" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="matches" fill="#8b5cf6" name="Partidos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={resultData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {resultData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
