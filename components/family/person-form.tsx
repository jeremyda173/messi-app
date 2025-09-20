"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { FamilyMember } from "@/lib/types"
import { useEffect } from "react"

const personSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  relationship: z.string().min(1, "La relación es requerida"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  description: z.string().optional(),
  photo: z.string().optional(),
})

type PersonFormData = z.infer<typeof personSchema>

interface PersonFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  person?: FamilyMember | null
  onSubmit: (data: PersonFormData) => void
}

const relationshipOptions = [
  "Yo",
  "Esposa",
  "Esposo",
  "Hijo",
  "Hija",
  "Padre",
  "Madre",
  "Hermano",
  "Hermana",
  "Abuelo",
  "Abuela",
  "Tío",
  "Tía",
  "Primo",
  "Prima",
  "Sobrino",
  "Sobrina",
  "Otro",
]

export function PersonForm({ open, onOpenChange, person, onSubmit }: PersonFormProps) {
  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: "",
      relationship: "",
      birthDate: "",
      description: "",
      photo: "",
    },
  })

  useEffect(() => {
    if (person) {
      form.reset({
        name: person.name,
        relationship: person.relationship,
        birthDate: person.birthDate,
        description: person.description || "",
        photo: person.photo || "",
      })
    } else {
      form.reset({
        name: "",
        relationship: "",
        birthDate: "",
        description: "",
        photo: "",
      })
    }
  }, [person, form])

  const handleSubmit = (data: PersonFormData) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{person ? "Editar Miembro" : "Nuevo Miembro"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. Lionel Andrés Messi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relación</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar relación" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relationshipOptions.map((relationship) => (
                        <SelectItem key={relationship} value={relationship}>
                          {relationship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la foto (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/foto.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve descripción sobre esta persona..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">{person ? "Actualizar" : "Crear"} Miembro</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
