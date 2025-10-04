"use client"

import { useState, useEffect } from "react"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { FamilyTree } from "@/components/family/family-tree"
import { PersonForm } from "@/components/family/person-form"
import { FamilyToolbar } from "@/components/family/family-toolbar"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { Plus, Users } from "lucide-react"
import { storage } from "@/lib/storage"
import { seedFamily } from "@/lib/seed-data"
import type { FamilyMember } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function FamilyPage() {
  const [family, setFamily] = useState<FamilyMember[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<FamilyMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean
    personId: string
    personName: string
  }>({ open: false, personId: "", personName: "" })
  const { toast } = useToast()

  useEffect(() => {
    const loadFamily = async () => {
      try {
        let loadedFamily = storage.getFamily()
        if (loadedFamily.length === 0) {
          storage.saveFamily(seedFamily)
          loadedFamily = seedFamily
        }
        setFamily(loadedFamily)
      } catch (error) {
        toast({
          title: "Error al cargar familia",
          description: "Hubo un problema al cargar los datos familiares.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadFamily()
  }, [toast])

  const handleCreatePerson = (personData: Omit<FamilyMember, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newPerson: FamilyMember = {
        ...personData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const updatedFamily = [...family, newPerson]
      setFamily(updatedFamily)
      storage.saveFamily(updatedFamily)
      setIsFormOpen(false)

      toast({
        title: "¡Miembro agregado!",
        description: "El miembro de la familia se ha agregado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error al agregar",
        description: "No se pudo agregar el miembro. Intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePerson = (personData: Omit<FamilyMember, "id" | "createdAt" | "updatedAt">) => {
    if (!editingPerson) return

    try {
      const updatedPerson: FamilyMember = {
        ...personData,
        id: editingPerson.id,
        createdAt: editingPerson.createdAt,
        updatedAt: new Date().toISOString(),
      }

      const updatedFamily = family.map((person) => (person.id === editingPerson.id ? updatedPerson : person))

      setFamily(updatedFamily)
      storage.saveFamily(updatedFamily)
      setEditingPerson(null)
      setIsFormOpen(false)

      toast({
        title: "¡Miembro actualizado!",
        description: "Los cambios se han guardado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error al actualizar",
        description: "No se pudieron guardar los cambios. Intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  const handleDeletePerson = (personId: string) => {
    const person = family.find((p) => p.id === personId)
    if (person) {
      setDeleteConfirmation({
        open: true,
        personId,
        personName: person.name,
      })
    }
  }

  const confirmDeletePerson = () => {
    try {
      const updatedFamily = family.filter((person) => person.id !== deleteConfirmation.personId)
      setFamily(updatedFamily)
      storage.saveFamily(updatedFamily)

      toast({
        title: "Miembro eliminado",
        description: "El miembro de la familia se ha eliminado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el miembro. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setDeleteConfirmation({ open: false, personId: "", personName: "" })
    }
  }

  const handleEdit = (person: FamilyMember) => {
    setEditingPerson(person)
    setIsFormOpen(true)
  }

  const handleImportFamily = (importedFamily: FamilyMember[]) => {
    try {
      const updatedFamily = [...family, ...importedFamily]
      setFamily(updatedFamily)
      storage.saveFamily(updatedFamily)

      toast({
        title: "¡Familia importada!",
        description: `Se han importado ${importedFamily.length} miembros correctamente.`,
      })
    } catch (error) {
      toast({
        title: "Error al importar",
        description: "No se pudieron importar los miembros. Verifica el formato del archivo.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <HeaderNav />
        <main className="flex-1 container py-8 px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />
        <main className="flex-1 px-4 md:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Árbol Genealógico</h1>
              <p className="text-muted-foreground">La familia de Lionel Messi</p>
            </div>
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Agregar Miembro
            </Button>
          </div>

          <FamilyToolbar family={family} onImport={handleImportFamily} />

          {family.length === 0 ? (
            <EmptyState
              icon={<Users className="w-12 h-12" />}
              title="No hay miembros familiares"
              description="Comienza agregando los primeros miembros de la familia de Messi"
              action={{
                label: "Agregar primer miembro",
                onClick: () => setIsFormOpen(true),
              }}
            />
          ) : (
            <FamilyTree family={family} onEdit={handleEdit} onDelete={handleDeletePerson} />
          )}
        </div>

        <PersonForm
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open)
            if (!open) {
              setEditingPerson(null)
            }
          }}
          person={editingPerson}
          onSubmit={editingPerson ? handleUpdatePerson : handleCreatePerson}
        />

        <ConfirmationDialog
          open={deleteConfirmation.open}
          onOpenChange={(open) => setDeleteConfirmation((prev) => ({ ...prev, open }))}
          title="¿Eliminar miembro?"
          description={`¿Estás seguro de que quieres eliminar a "${deleteConfirmation.personName}" del árbol familiar? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={confirmDeletePerson}
          variant="destructive"
        />
      </main>
      <Footer />
    </div>
  )
}
