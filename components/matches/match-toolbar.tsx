"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Upload, Grid, List } from "lucide-react"
import type { Match } from "@/lib/types"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

interface MatchToolbarProps {
  matches: Match[]
  onImport: (matches: Match[]) => void
  viewMode: "cards" | "table"
  onViewModeChange: (mode: "cards" | "table") => void
}

export function MatchToolbar({ matches, onImport, viewMode, onViewModeChange }: MatchToolbarProps) {
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleExport = () => {
    const data = storage.exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `messi-matches-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Datos exportados",
      description: "Los partidos se han exportado correctamente.",
    })
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.matches && Array.isArray(data.matches)) {
          onImport(data.matches)
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
          {matches.length} partido{matches.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* View Mode Toggle */}
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === "cards" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("cards")}
            className="rounded-r-none"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("table")}
            className="rounded-l-none"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

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
              <DialogTitle>Importar Partidos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="import-file">Seleccionar archivo JSON</Label>
                <Input id="import-file" type="file" accept=".json" onChange={handleImport} className="mt-1" />
              </div>
              <p className="text-sm text-muted-foreground">
                Selecciona un archivo JSON exportado previamente para importar los partidos.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
