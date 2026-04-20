"use client"

import { motion } from "framer-motion"
import { Heart, Github, Twitter, Instagram, Mail, ArrowRight, Trophy } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-slate-950 text-slate-200 overflow-hidden border-t border-white/10">
      {/* Subtle Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                <span className="text-white font-bold text-lg">LM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg leading-none tracking-tight">Lionel Messi</span>
                <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">The G.O.A.T.</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              La plataforma definitiva para explorar la vida, carrera y legado del futbolista más grande de la historia.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/leomessi/", label: "Instagram" },
                { icon: Twitter, href: "https://twitter.com/TeamMessi", label: "Twitter" },
                { icon: Github, href: "https://github.com/jeremyda173", label: "GitHub" },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -3 }}
                    className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">Explorar</h3>
            <ul className="space-y-4">
              {[
                { name: "Inicio", href: "/" },
                { name: "Estadísticas", href: "/statistics" },
                { name: "Partidos", href: "/matches" },
                { name: "Trayectoria", href: "/career" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-colors duration-200" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Lionel Messi App. Fan tribute.
          </p>
        </div>
      </div>
    </footer>
  )
}
