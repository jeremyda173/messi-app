"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Copy } from "lucide-react"
import type { Match } from "@/lib/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface MatchTableProps {
  matches: Match[]
  onEdit: (match: Match) => void
  onDelete: (matchId: string) => void
  onDuplicate: (match: Match) => void
}

export function MatchTable({ matches, onEdit, onDelete, onDuplicate }: MatchTableProps) {
  const resultColors = {
    win: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    draw: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    loss: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  }

  const resultLabels = {
    win: "V",
    draw: "E",
    loss: "D",
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No se encontraron partidos</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Competencia</TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead>Oponente</TableHead>
            <TableHead>Resultado</TableHead>
            <TableHead>Localía</TableHead>
            <TableHead className="text-center">Min</TableHead>
            <TableHead className="text-center">G</TableHead>
            <TableHead className="text-center">A</TableHead>
            <TableHead className="text-center">R</TableHead>
            <TableHead className="text-center">P</TableHead>
            <TableHead className="text-center">%</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id}>
              <TableCell className="font-medium">
                {format(new Date(match.date), "dd/MM/yyyy", { locale: es })}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {match.competition}
                </Badge>
              </TableCell>
              <TableCell>{match.team}</TableCell>
              <TableCell>{match.opponent}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    <Badge className={`${resultColors[match.result]} text-xs`}>{resultLabels[match.result]}</Badge>
                    {(match.teamScore !== undefined && match.teamScore !== null && match.opponentScore !== undefined && match.opponentScore !== null) && (
                        <span className="text-xs font-mono font-medium whitespace-nowrap">
                            {match.teamScore}-{match.opponentScore}
                        </span>
                    )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {match.venue === "home" ? "L" : "V"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{match.minutes}</TableCell>
              <TableCell className="text-center font-semibold">{match.goals}</TableCell>
              <TableCell className="text-center font-semibold">{match.assists}</TableCell>
              <TableCell className="text-center">{match.shots}</TableCell>
              <TableCell className="text-center">{match.passes}</TableCell>
              <TableCell className="text-center">{match.passAccuracy}%</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(match)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate(match)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(match.id)} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
