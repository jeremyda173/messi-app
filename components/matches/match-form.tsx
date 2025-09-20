"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { Match } from "@/lib/types"
import { useEffect } from "react"

const matchSchema = z.object({
  date: z.string().min(1, "La fecha es requerida"),
  competition: z.string().min(1, "La competencia es requerida"),
  team: z.string().min(1, "El equipo es requerido"),
  opponent: z.string().min(1, "El oponente es requerido"),
  minutes: z.number().min(0).max(120),
  goals: z.number().min(0),
  assists: z.number().min(0),
  shots: z.number().min(0),
  passes: z.number().min(0),
  passAccuracy: z.number().min(0).max(100),
  result: z.enum(["win", "draw", "loss"]),
  venue: z.enum(["home", "away"]),
})

type MatchFormData = z.infer<typeof matchSchema>

interface MatchFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  match?: Match | null
  onSubmit: (data: MatchFormData) => void
}

export function MatchForm({ open, onOpenChange, match, onSubmit }: MatchFormProps) {
  const form = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      date: "",
      competition: "",
      team: "Inter Miami",
      opponent: "",
      minutes: 90,
      goals: 0,
      assists: 0,
      shots: 0,
      passes: 0,
      passAccuracy: 85,
      result: "win",
      venue: "home",
    },
  })

  useEffect(() => {
    if (match) {
      form.reset({
        date: match.date,
        competition: match.competition,
        team: match.team,
        opponent: match.opponent,
        minutes: match.minutes,
        goals: match.goals,
        assists: match.assists,
        shots: match.shots,
        passes: match.passes,
        passAccuracy: match.passAccuracy,
        result: match.result,
        venue: match.venue,
      })
    } else {
      form.reset({
        date: "",
        competition: "",
        team: "Inter Miami",
        opponent: "",
        minutes: 90,
        goals: 0,
        assists: 0,
        shots: 0,
        passes: 0,
        passAccuracy: 85,
        result: "win",
        venue: "home",
      })
    }
  }, [match, form])

  const handleSubmit = (data: MatchFormData) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{match ? "Editar Partido" : "Nuevo Partido"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="competition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competencia</FormLabel>
                    <FormControl>
                      <Input placeholder="ej. MLS, Copa América" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipo</FormLabel>
                    <FormControl>
                      <Input placeholder="ej. Inter Miami" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="opponent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Oponente</FormLabel>
                    <FormControl>
                      <Input placeholder="ej. LA Galaxy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resultado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar resultado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="win">Victoria</SelectItem>
                        <SelectItem value="draw">Empate</SelectItem>
                        <SelectItem value="loss">Derrota</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localía</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar localía" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="home">Local</SelectItem>
                        <SelectItem value="away">Visitante</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minutos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="120"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goles</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assists"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asistencias</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remates</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pases</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passAccuracy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precisión (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">{match ? "Actualizar" : "Crear"} Partido</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
