"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Upload } from "lucide-react"
import type { FamilyMember } from "@/lib/types"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

interface FamilyToolbarProps {
  family: FamilyMember[]
  onImport: (family: FamilyMember[]) => void
}

export function FamilyToolbar({ family, onImport }: FamilyToolbarProps) {
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleExport = () => {
    const data = storage.exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)

    if (typeof document !== "undefined") {
      const a = document.createElement("a")
      a.href = url
      a.download = `messi-family-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    URL.revokeObjectURL(url)

    toast({
      title: "Datos exportados",
      description: "La información familiar se ha exportado correctamente.",
    })
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.family && Array.isArray(data.family)) {
          onImport(data.family)
          setImportDialogOpen(false)
        } else {
          throw new Error("Formato de archivo inválido")
        }
      } catch (error) {
        toast({
          title: "Error al importar",
          description: "El archivo no tiene el formato correcto.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {family.length} miembro{family.length !== 1 ? "s" : ""} de la familia
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Export */}
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>

        {/* Import */}
        <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Importar Familia</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="import-file">Seleccionar archivo JSON</Label>
                <Input
                  id="import-file"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="mt-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Selecciona un archivo JSON exportado previamente para importar los miembros de la familia.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
