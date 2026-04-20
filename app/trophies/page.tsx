"use client"

import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Trophy, Star, Crown, Medal, Award, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

interface TrophyItem {
  name: string
  count: number
  icon: any
  color: string
  bg: string
  border: string
  year?: string
  years?: string
  size?: string
}

const trophies: { category: string; items: TrophyItem[] }[] = [
  {
    category: "Selección Argentina",
    items: [
      { name: "Copa del Mundo", count: 1, year: "2022", icon: Crown, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
      { name: "Copa América", count: 2, year: "2021, 2024", icon: Trophy, color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20" },
      { name: "Finalissima", count: 1, year: "2022", icon: Star, color: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/20" },
      { name: "Medalla de Oro Olímpica", count: 1, year: "2008", icon: Medal, color: "text-yellow-200", bg: "bg-yellow-200/10", border: "border-yellow-200/20" },
      { name: "Mundial Sub-20", count: 1, year: "2005", icon: Trophy, color: "text-slate-300", bg: "bg-slate-300/10", border: "border-slate-300/20" },
    ]
  },
  {
    category: "Clubes (FC Barcelona, PSG, Inter Miami)",
    items: [
      { name: "Champions League", count: 4, years: "2006, 2009, 2011, 2015", icon: Star, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
      { name: "La Liga", count: 10, years: "Dominio Total", icon: Trophy, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      { name: "Copa del Rey", count: 7, years: "", icon: Trophy, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" },
      { name: "Mundial de Clubes", count: 3, years: "", icon: Crown, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
      { name: "Supercopa de Europa", count: 3, years: "", icon: Award, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
      { name: "Ligue 1", count: 2, years: "PSG", icon: Trophy, color: "text-blue-600", bg: "bg-blue-600/10", border: "border-blue-600/20" },
      { name: "Leagues Cup", count: 1, years: "Inter Miami (2023)", icon: Trophy, color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
      { name: "Supporters' Shield", count: 1, years: "Inter Miami (2024)", icon: Shield, color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
    ]
  },
  {
    category: "Individuales (Global)",
    items: [
      { name: "Balón de Oro", count: 8, years: "G.O.A.T", icon: Crown, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20", size: "col-span-1 md:col-span-2 lg:col-span-2" },
      { name: "Bota de Oro", count: 6, years: "Máximo Goleador", icon: Trophy, color: "text-amber-600", bg: "bg-amber-600/10", border: "border-amber-600/20" },
      { name: "The Best FIFA", count: 3, years: "", icon: Star, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
    ]
  }
]

function TrophyCard({ item }: { item: TrophyItem }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])
  
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 20 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 20 })

  const Icon = item.icon
  const time = item.year || item.years

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-3xl border backdrop-blur-md transition-all duration-300 group overflow-hidden",
        item.bg, item.border, item.size
      )} 
    >
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-2xl bg-background/50 backdrop-blur-md shadow-sm", item.color)}>
                    <Icon className="w-8 h-8" />
                </div>
                <span className="text-5xl font-black text-foreground/10 group-hover:text-foreground/20 transition-colors">
                    {item.count}
                </span>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                {time && <p className="text-sm font-medium opacity-70">{time}</p>}
            </div>
        </div>

        {/* Glare/Holographic Effect */}
        <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
            style={{ transform: "translateZ(80px)" }}
        />
    </motion.div>
  )
}

export default function TrophiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <HeaderNav />
      <main className="flex-1 pt-48 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4"
            >
                <Crown className="w-8 h-8 text-amber-500" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              Sala de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">Trofeos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La colección más impresionante en la historia del fútbol. Un recorrido por la gloria eterna de Leo Messi.
            </p>
          </div>

          {trophies.map((section) => (
            <div key={section.category} className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1000px" }}>
                {section.items.map((trophy, index) => (
                    <TrophyCard key={trophy.name} item={trophy} />
                ))}
              </div>
            </div>
          ))}

        </div>
      </main>
      <Footer />
    </div>
  )
}
