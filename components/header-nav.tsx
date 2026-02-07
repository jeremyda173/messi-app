"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Trophy, Users, BarChart2, Home, Menu, Crown, Award, History, Gamepad2, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Partidos", href: "/matches", icon: PlayCircle },
  { name: "Familia", href: "/family", icon: Users },
  { name: "Trofeos", href: "/trophies", icon: Award },
  { name: "Trayectoria", href: "/timeline", icon: History },
  { name: "Trivia", href: "/quiz", icon: Gamepad2 },
  { name: "Estadísticas", href: "/statistics", icon: BarChart2 },
]

export function HeaderNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/60 backdrop-blur-xl border-border/40 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                  <span className="text-white font-bold text-sm">LM</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className={cn(
                    "font-bold text-lg leading-none transition-colors duration-300",
                    scrolled ? "text-foreground" : "text-white"
                )}>
                  Lionel Messi
                </span>
                <span className={cn(
                    "text-[10px] font-medium tracking-wider uppercase transition-colors duration-300",
                    scrolled ? "text-muted-foreground" : "text-white/60"
                )}>
                  The G.O.A.T
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 group flex items-center gap-2",
                    isActive 
                        ? (scrolled ? "text-primary" : "text-white") 
                        : (scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white")
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      className={cn(
                        "absolute inset-0 rounded-full -z-10",
                        scrolled ? "bg-primary/10" : "bg-white/10"
                      )}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <ModeToggle />
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden h-9 w-9 hover:bg-white/10",
                    !scrolled && "text-white hover:text-white"
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 backdrop-blur-xl bg-background/90 border-l border-white/10">
                <div className="flex flex-col space-y-8 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 px-2">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">LM</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-none">Lionel Messi</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">The G.O.A.T</p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-1">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                            isActive 
                                ? "bg-primary/10 text-primary font-medium" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.name}</span>
                          {isActive && <Crown className="w-4 h-4 ml-auto text-amber-500" />}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
