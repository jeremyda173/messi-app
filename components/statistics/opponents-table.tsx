"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Match } from "@/lib/types"
import { motion } from "framer-motion"

interface OpponentsTableProps {
  matches: Match[]
}

export function OpponentsTable({ matches }: OpponentsTableProps) {
  // Calculate opponent statistics
  const opponentStats = matches.reduce(
    (acc, match) => {
      const existing = acc.find((item) => item.opponent === match.opponent)

      if (existing) {
        existing.matches += 1
        existing.goals += match.goals
        existing.assists += match.assists
        existing.minutes += match.minutes
        if (match.result === "win") existing.wins += 1
        if (match.result === "draw") existing.draws += 1
        if (match.result === "loss") existing.losses += 1
      } else {
        acc.push({
          opponent: match.opponent,
          matches: 1,
          goals: match.goals,
          assists: match.assists,
          minutes: match.minutes,
          wins: match.result === "win" ? 1 : 0,
          draws: match.result === "draw" ? 1 : 0,
          losses: match.result === "loss" ? 1 : 0,
        })
      }
      return acc
    },
    [] as Array<{
      opponent: string
      matches: number
      goals: number
      assists: number
      minutes: number
      wins: number
      draws: number
      losses: number
    }>,
  )

  // Sort by total matches played
  const sortedOpponents = opponentStats.sort((a, b) => b.matches - a.matches)

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay datos de oponentes para mostrar</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas contra Rivales</CardTitle>
          <p className="text-sm text-muted-foreground">Rendimiento detallado contra cada oponente</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Oponente</TableHead>
                  <TableHead className="text-center">Partidos</TableHead>
                  <TableHead className="text-center">V-E-D</TableHead>
                  <TableHead className="text-center">Goles</TableHead>
                  <TableHead className="text-center">Asistencias</TableHead>
                  <TableHead className="text-center">G+A</TableHead>
                  <TableHead className="text-center">Promedio G/P</TableHead>
                  <TableHead className="text-center">Promedio A/P</TableHead>
                  <TableHead className="text-center">% Victoria</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOpponents.map((opponent, index) => {
                  const winRate = (opponent.wins / opponent.matches) * 100
                  const avgGoals = opponent.goals / opponent.matches
                  const avgAssists = opponent.assists / opponent.matches

                  return (
                    <TableRow key={opponent.opponent}>
                      <TableCell className="font-medium">{opponent.opponent}</TableCell>
                      <TableCell className="text-center">{opponent.matches}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex gap-1 justify-center">
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            {opponent.wins}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                            {opponent.draws}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                            {opponent.losses}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-semibold">{opponent.goals}</TableCell>
                      <TableCell className="text-center font-semibold">{opponent.assists}</TableCell>
                      <TableCell className="text-center font-bold text-primary">
                        {opponent.goals + opponent.assists}
                      </TableCell>
                      <TableCell className="text-center">{avgGoals.toFixed(1)}</TableCell>
                      <TableCell className="text-center">{avgAssists.toFixed(1)}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`${
                            winRate >= 70
                              ? "bg-green-50 text-green-700"
                              : winRate >= 50
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-700"
                          }`}
                        >
                          {winRate.toFixed(0)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {sortedOpponents.length > 10 && (
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Mostrando los primeros {Math.min(10, sortedOpponents.length)} oponentes más enfrentados
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
