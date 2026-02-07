"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Crown, Target, ChevronDown, PlayCircle, BarChart2 } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const achievements = [
  { icon: Trophy, label: "8 Balones de Oro", color: "text-amber-400" },
  { icon: Crown, label: "Campeón del Mundo", color: "text-blue-400" },
  { icon: Star, label: "4 Champions League", color: "text-purple-400" },
  { icon: Target, label: "+800 Goles", color: "text-green-400" },
]

export function Hero() {
  const router = useRouter()
  const containerRef = useRef<HTMLElement>(null)
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const handleViewStats = () => {
    router.push("/statistics")
  }

  const handleExploreMatches = () => {
    router.push("/matches")
  }

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-black pt-32 pb-32"
    >
      {/* Dynamic Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-background z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black/80 to-black z-0" />
        {/* Placeholder Image - ideally this would be a high-res hero image or video */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 scale-105"
            style={{ backgroundImage: "url('/lionel-messi-celebrating-with-argentina-jersey-wor.jpg')" }} 
        />
        {/* Animated Particles or Overlay effects could go here */}
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container px-4 sm:px-6 flex flex-col items-center text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-blue-200/80 text-sm font-medium tracking-wide"
        >
            <Crown className="w-4 h-4 text-amber-400" />
            <span>The Greatest of All Time</span>
        </motion.div>

        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 tracking-tighter mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
            LIONEL
            <br />
            <span className="text-blue-500 inline-block relative">
                MESSI
                <motion.span 
                    className="absolute -top-4 -right-8 text-4xl"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    🐐
                </motion.span>
            </span>
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed mb-10"
        >
            Más que un jugador, una leyenda viva. Explora la carrera, las estadísticas y la magia del rosarino que conquistó el mundo.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto justify-center mb-16"
        >
            <Button
                size="lg"
                className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 group"
                onClick={handleViewStats}
            >
                <BarChart2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Ver Estadísticas
            </Button>
            <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-white/20 hover:bg-white/10 text-white rounded-full backdrop-blur-sm transition-all duration-300 group"
                onClick={handleExploreMatches}
            >
                <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Ver Partidos
            </Button>
        </motion.div>

        {/* Floating Achievements */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl"
        >
            {achievements.map((item, i) => {
                const Icon = item.icon
                return (
                    <div 
                        key={item.label}
                        className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className={`p-3 rounded-full bg-white/5 mb-3 group-hover:scale-110 transition-transform duration-300 ${item.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm md:text-base font-medium text-gray-200 group-hover:text-white transition-colors text-center">
                            {item.label}
                        </span>
                    </div>
                )
            })}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 z-20"
      >
        <span className="text-xs uppercase tracking-widest">Descubre más</span>
        <motion.div
            animate={{ y: [-4, 8, -4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
            <ChevronDown className="w-6 h-8" />
        </motion.div>
      </motion.div>

      {/* Gradient Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
    </section>
  )
}
