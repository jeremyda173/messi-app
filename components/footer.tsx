"use client"

import { motion } from "framer-motion"
import { Heart, Github, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Wavy Background - Dark Ocean Waves */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="darkWave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#0F172A', stopOpacity: 0.9 }} />
              <stop offset="30%" style={{ stopColor: '#1E293B', stopOpacity: 0.95 }} />
              <stop offset="70%" style={{ stopColor: '#334155', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.9 }} />
            </linearGradient>
            <linearGradient id="darkWave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1E293B', stopOpacity: 0.7 }} />
              <stop offset="50%" style={{ stopColor: '#334155', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.7 }} />
            </linearGradient>
            <linearGradient id="darkWave3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#334155', stopOpacity: 0.5 }} />
              <stop offset="50%" style={{ stopColor: '#475569', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#64748B', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          
          {/* Wave 1 - Main dark wave */}
          <motion.path
            d="M0,60 C150,0 300,180 450,60 C600,0 750,180 900,60 C1050,0 1200,180 1200,60 L1200,300 L0,300 Z"
            fill="url(#darkWave1)"
            initial={{ d: "M0,60 C150,0 300,180 450,60 C600,0 750,180 900,60 C1050,0 1200,180 1200,60 L1200,300 L0,300 Z" }}
            animate={{ 
              d: [
                "M0,60 C150,0 300,180 450,60 C600,0 750,180 900,60 C1050,0 1200,180 1200,60 L1200,300 L0,300 Z",
                "M0,80 C150,20 300,160 450,80 C600,20 750,160 900,80 C1050,20 1200,160 1200,80 L1200,300 L0,300 Z",
                "M0,40 C150,-20 300,200 450,40 C600,-20 750,200 900,40 C1050,-20 1200,200 1200,40 L1200,300 L0,300 Z",
                "M0,60 C150,0 300,180 450,60 C600,0 750,180 900,60 C1050,0 1200,180 1200,60 L1200,300 L0,300 Z"
              ]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Wave 2 - Secondary wave */}
          <motion.path
            d="M0,100 C200,40 400,220 600,100 C800,40 1000,220 1200,100 L1200,300 L0,300 Z"
            fill="url(#darkWave2)"
            initial={{ d: "M0,100 C200,40 400,220 600,100 C800,40 1000,220 1200,100 L1200,300 L0,300 Z" }}
            animate={{ 
              d: [
                "M0,100 C200,40 400,220 600,100 C800,40 1000,220 1200,100 L1200,300 L0,300 Z",
                "M0,120 C200,60 400,200 600,120 C800,60 1000,200 1200,120 L1200,300 L0,300 Z",
                "M0,80 C200,20 400,240 600,80 C800,20 1000,240 1200,80 L1200,300 L0,300 Z",
                "M0,100 C200,40 400,220 600,100 C800,40 1000,220 1200,100 L1200,300 L0,300 Z"
              ]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 3
            }}
          />
          
          {/* Wave 3 - Accent wave */}
          <motion.path
            d="M0,140 C250,80 500,260 750,140 C1000,80 1200,260 1200,140 L1200,300 L0,300 Z"
            fill="url(#darkWave3)"
            initial={{ d: "M0,140 C250,80 500,260 750,140 C1000,80 1200,260 1200,140 L1200,300 L0,300 Z" }}
            animate={{ 
              d: [
                "M0,140 C250,80 500,260 750,140 C1000,80 1200,260 1200,140 L1200,300 L0,300 Z",
                "M0,160 C250,100 500,240 750,160 C1000,100 1200,240 1200,160 L1200,300 L0,300 Z",
                "M0,120 C250,60 500,280 750,120 C1000,60 1200,280 1200,120 L1200,300 L0,300 Z",
                "M0,140 C250,80 500,260 750,140 C1000,80 1200,260 1200,140 L1200,300 L0,300 Z"
              ]
            }}
            transition={{ 
              duration: 18, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 6
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-gradient-to-b from-slate-800/10 via-slate-900/15 to-slate-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-12">
            {/* Logo and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl drop-shadow-lg">LM</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white drop-shadow-2xl shadow-black/80">Lionel Messi</h3>
                  <p className="text-white drop-shadow-2xl shadow-black/80 font-medium text-sm">Official App</p>
                </div>
              </div>
              <p className="text-white drop-shadow-2xl shadow-black/80 font-medium text-sm leading-relaxed max-w-sm">
                La aplicación oficial para seguir la carrera y estadísticas del mejor futbolista de todos los tiempos.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-white drop-shadow-2xl shadow-black/80">Enlaces Rápidos</h4>
              <div className="space-y-2">
                {[
                  { name: "Estadísticas", href: "/statistics" },
                  { name: "Partidos", href: "/matches" },
                  { name: "Familia", href: "/family" },
                  { name: "Inicio", href: "/" }
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-white font-medium hover:text-gray-200 transition-colors duration-200 text-sm drop-shadow-2xl shadow-black/80"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-white drop-shadow-2xl shadow-black/80">Síguenos</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Mail, href: "#", label: "Email" }
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="p-3 rounded-full bg-white/20 dark:bg-white/20 bg-slate-800/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-white/30 hover:bg-slate-800/30 transition-all duration-200"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-white drop-shadow-2xl shadow-black/80" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 pt-8 border-t border-white/20 dark:border-white/20 border-slate-300/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-white font-medium text-sm drop-shadow-2xl shadow-black/80">
                <span>© 2024 Lionel Messi. Todos los derechos reservados.</span>
              </div>
              <div className="flex items-center space-x-2 text-white font-medium text-sm drop-shadow-2xl shadow-black/80">
                <Heart className="h-4 w-4 text-red-400" />
                <span>Desarrollado con amor para los fanáticos del fútbol</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </footer>
  )
}
