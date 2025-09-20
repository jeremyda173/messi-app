"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, Save, X } from "lucide-react"
import { motion } from "framer-motion"

const defaultBiography = `Lionel Andrés Messi, nacido el 24 de junio de 1987 en Rosario, Argentina, es considerado uno de los mejores futbolistas de todos los tiempos. 

Comenzó su carrera en las divisiones inferiores del FC Barcelona, donde se convirtió en una leyenda del club. Durante su tiempo en Barcelona, ganó 10 títulos de La Liga, 7 Copas del Rey y 4 Champions League.

En 2021, se unió al Paris Saint-Germain, y posteriormente, en 2023, fichó por el Inter Miami CF en la Major League Soccer.

Con la selección argentina, logró el sueño de toda su vida al ganar la Copa del Mundo FIFA 2022 en Qatar, además de conquistar la Copa América en 2021. Ha sido galardonado con 8 Balones de Oro, récord absoluto en la historia del fútbol.

Su estilo de juego único, caracterizado por su velocidad, técnica excepcional y visión de juego, lo ha convertido en un ícono mundial del deporte.`

export function Biography() {
  const [isEditing, setIsEditing] = useState(false)
  const [biography, setBiography] = useState(defaultBiography)
  const [tempBiography, setTempBiography] = useState(defaultBiography)

  const handleSave = () => {
    setBiography(tempBiography)
    setIsEditing(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("messi-biography", tempBiography)
    }
  }

  const handleCancel = () => {
    setTempBiography(biography)
    setIsEditing(false)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("messi-biography")
      if (saved) {
        setBiography(saved)
        setTempBiography(saved)
      }
    }
  }, [])

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold">Biografía</CardTitle>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={tempBiography}
                  onChange={(e) => setTempBiography(e.target.value)}
                  className="min-h-[300px] text-base leading-relaxed resize-none"
                  placeholder="Escribe la biografía de Lionel Messi..."
                />
              ) : (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {biography.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed mb-4 text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
