"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, Save, X, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const defaultBiography = `Lionel Andrés Messi, nacido el 24 de junio de 1987 en Rosario, Argentina, es considerado uno de los mejores futbolistas de todos los tiempos.

Comenzó su carrera en las divisiones inferiores del FC Barcelona, donde se convirtió en una leyenda del club. Durante su tiempo en Barcelona, ganó 10 títulos de La Liga, 7 Copas del Rey y 4 Champions League.

En 2021, se unió al Paris Saint-Germain, y posteriormente, en 2023, fichó por el Inter Miami CF en la Major League Soccer.

Con la selección argentina, logró el sueño de toda su vida al ganar la Copa del Mundo FIFA 2022 en Qatar, además de conquistar la Copa América en 2021. Ha sido galardonado con 8 Balones de Oro, récord absoluto en la historia del fútbol.

Su estilo de juego único, caracterizado por su velocidad, técnica excepcional y visión de juego, lo ha convertido en un ícono mundial del deporte.`

export function Biography() {
  const [isEditing, setIsEditing] = useState(false)
  const [biography, setBiography] = useState(defaultBiography)
  const [tempBiography, setTempBiography] = useState(defaultBiography)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("messi-biography")
      if (saved) {
        setBiography(saved)
        setTempBiography(saved)
      }
    }
  }, [])

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

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 inline-block">
              La Leyenda
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto rounded-full" />
          </div>

          <div className="relative group">
            {/* Glassmorphic Card */}
            <div className="relative bg-background/60 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden">
              
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 left-6 md:top-10 md:left-10 text-primary/10">
                <Quote size={80} className="rotate-180" />
              </div>

              {/* Edit Controls */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {!isEditing ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors "
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="text-xs font-medium">Editar</span>
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="gap-2 shadow-lg"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Guardar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="gap-2 bg-background/50 backdrop-blur-sm"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10"
                  >
                    <Textarea
                      value={tempBiography}
                      onChange={(e) => setTempBiography(e.target.value)}
                      className="min-h-[400px] text-lg bg-background/50 border-primary/20 focus:border-primary/50 resize-none p-6 leading-relaxed rounded-xl shadow-inner scrollbar-hide"
                      placeholder="Escribe la biografía..."
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="viewing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 text-lg md:text-xl leading-relaxed text-muted-foreground text-justify tracking-wide space-y-6 font-light"
                  >
                    {biography.split("\n\n").map((paragraph, index) => (
                      <p key={index} className={cn(
                          "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left",
                          index === 0 ? "first-letter:leading-[0.8]" : "first-letter:hidden"
                      )}>
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
