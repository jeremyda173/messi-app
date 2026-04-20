"use client"

import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { MapPin, Calendar, ArrowRight, Shirt, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const timeline = [
  {
    year: "1987",
    title: "El Nacimiento de una Leyenda",
    desc: "Nace en Rosario, Argentina. Comienza a patear sus primeras pelotas en Grandoli.",
    team: "Grandoli / Newell's Old Boys",
    icon: MapPin,
    color: "bg-sky-500",
    side: "left"
  },
  {
    year: "2000",
    title: "El Viaje a Barcelona",
    desc: "Con 13 años y un contrato en una servilleta, cruza el océano para unirse a La Masia.",
    team: "FC Barcelona (Inferiores)",
    icon: ArrowRight,
    color: "bg-blue-600",
    side: "right"
  },
  {
    year: "2004",
    title: "El Debut Oficial",
    desc: "Debuta con el primer equipo del Barça ante el Espanyol. El inicio de la era dorada.",
    team: "FC Barcelona",
    icon: Shirt,
    color: "bg-red-500",
    side: "left"
  },
  {
    year: "2009",
    title: "El Sextete Histórico",
    desc: "Gana absolutamente todo con Pep Guardiola. Primer Balón de Oro.",
    team: "FC Barcelona",
    icon: Calendar,
    color: "bg-purple-500",
    side: "right"
  },
  {
    year: "2012",
    title: "91 Goles",
    desc: "Récord mundial absoluto de goles en un año natural. Una máquina imparable.",
    team: "FC Barcelona / Argentina",
    icon: ArrowRight,
    color: "bg-indigo-500",
    side: "left"
  },
  {
    year: "2021",
    title: "El Maracanazo y París",
    desc: "Gana la Copa América rompiendo la sequía. Meses después, shock mundial: ficha por el PSG.",
    team: "PSG / Argentina",
    icon: MapPin,
    color: "bg-blue-800",
    side: "right"
  },
  {
    year: "2022",
    title: "La Gloria Eterna",
    desc: "Qatar 2022. Final contra Francia. El fútbol le paga su deuda. Campeón del Mundo.",
    team: "Argentina",
    icon: Calendar,
    color: "bg-amber-400",
    side: "left"
  },
  {
    year: "2023",
    title: "La Revolución Americana",
    desc: "Llega a la MLS e impacta al mundo del deporte en Estados Unidos. Campeón de Leagues Cup.",
    team: "Inter Miami CF",
    icon: Shirt,
    color: "bg-pink-500",
    side: "right"
  },
  {
    year: "2024",
    title: "Bicampeón y Récord Histórico",
    desc: "Gana su segunda Copa América consecutiva con Argentina y el Supporters' Shield con Inter Miami, convirtiéndose en el jugador con más títulos de la historia.",
    team: "Argentina / Inter Miami",
    icon: Trophy,
    color: "bg-sky-400",
    side: "left"
  },
]

export default function TimelinePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderNav />
      <main className="flex-1 pt-32 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h1 className="text-4xl md:text-5xl font-black tracking-tight">Línea de Tiempo</h1>
             <p className="text-muted-foreground">El viaje del chico de Rosario que conquistó el universo.</p>
          </div>

          <div className="relative">
             {/* Central Line */}
             <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 -translate-x-1/2 md:translate-x-0" />
             
             {timeline.map((item, index) => (
                 <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "relative flex items-center gap-8 mb-16 md:mb-24",
                        item.side === "left" ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                 >
                     {/* Timeline Dot */}
                     <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-background shadow-xl z-10 -translate-x-1/2 md:translate-x-0 bg-primary" />

                     {/* Content Card */}
                     <div className={cn(
                         "ml-12 md:ml-0 md:w-1/2 p-4",
                         item.side === "left" ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                     )}>
                         <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">
                             {item.year}
                         </div>
                         <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                         <p className="text-muted-foreground mb-4">{item.desc}</p>
                         <div className={cn(
                             "flex items-center gap-2 text-sm font-medium opacity-80",
                             item.side === "left" ? "md:justify-end" : "md:justify-start"
                         )}>
                             <div className={cn("w-2 h-2 rounded-full", item.color)} />
                             {item.team}
                         </div>
                     </div>
                     
                     {/* Spacer for desktop layout balance */}
                     <div className="hidden md:block md:w-1/2" />
                 </motion.div>
             ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
