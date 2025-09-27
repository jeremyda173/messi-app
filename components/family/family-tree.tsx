"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Calendar, Heart } from "lucide-react"
import type { FamilyMember } from "@/lib/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion } from "framer-motion"

interface FamilyTreeProps {
  family: FamilyMember[]
  onEdit: (person: FamilyMember) => void
  onDelete: (personId: string) => void
}

export function FamilyTree({ family, onEdit, onDelete }: FamilyTreeProps) {
  // Find Messi as the central node
  const messi = family.find((person) => person.relationship === "Yo")
  const spouse = family.find((person) => person.relationship === "Esposa")
  const children = family
    .filter((person) => person.relationship === "Hijo")
    .sort((a, b) => a.birthDate.localeCompare(b.birthDate))
  const parents = family.filter((person) => person.relationship === "Padre" || person.relationship === "Madre")
  const siblings = family.filter((person) => person.relationship === "Hermano" || person.relationship === "Hermana")
  const others = family.filter(
    (person) => !["Yo", "Esposa", "Hijo", "Padre", "Madre", "Hermano", "Hermana"].includes(person.relationship),
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRelationshipColor = (relationship: string) => {
    const colors = {
      Yo: "bg-primary text-primary-foreground",
      Esposa: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
      Hijo: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      Padre: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Madre: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      Hermano: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      Hermana: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    }
    return (
      colors[relationship as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    )
  }

  const PersonCard = ({ person, index = 0 }: { person: FamilyMember; index?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={person.photo || "/placeholder.svg"} alt={person.name} />
                <AvatarFallback className="bg-primary/10">{getInitials(person.name)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{person.name}</CardTitle>
                <Badge className={getRelationshipColor(person.relationship)} variant="secondary">
                  {person.relationship}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(person)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                {person.relationship !== "Yo" && (
                  <DropdownMenuItem onClick={() => onDelete(person.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {format(new Date(person.birthDate), "dd 'de' MMMM, yyyy", { locale: es })}
          </div>
          {person.description && <p className="text-sm text-muted-foreground">{person.description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )

  if (family.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No hay miembros de la familia</p>
        <Button onClick={() => {}}>Agregar primer miembro</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {parents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Padres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {parents.map((parent, index) => (
              <PersonCard key={parent.id} person={parent} index={index} />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Familia Nuclear</h2>
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {messi && <PersonCard person={messi} />}
            {spouse && (
              <>
                <div className="hidden md:flex items-center">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <PersonCard person={spouse} />
              </>
            )}
          </div>
          {children.length > 0 && <div className="w-px h-8 bg-border hidden md:block" />}
        </div>
      </div>
      {children.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Hijos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {children.map((child, index) => (
              <PersonCard key={child.id} person={child} index={index} />
            ))}
          </div>
        </div>
      )}
      {siblings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Hermanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {siblings.map((sibling, index) => (
              <PersonCard key={sibling.id} person={sibling} index={index} />
            ))}
          </div>
        </div>
      )}
      {others.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Otros Familiares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {others.map((person, index) => (
              <PersonCard key={person.id} person={person} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
