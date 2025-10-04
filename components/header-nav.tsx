"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Trophy, Users, BarChart3, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Partidos", href: "/matches", icon: Trophy },
  { name: "Familia", href: "/family", icon: Users },
  { name: "Estadísticas", href: "/statistics", icon: BarChart3 },
]

export function HeaderNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3 transition-all duration-200 hover:scale-105">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <span className="text-white font-bold text-lg">LM</span>
                </div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 opacity-20 blur group-hover:opacity-30 transition-opacity duration-200"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Lionel Messi
                </span>
                <span className="text-xs text-muted-foreground font-medium">Official App</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className={cn(
                    "relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-accent/50",
                    isActive && "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                  )}
                >
                  <Link href={item.href}>
                    <Icon className={cn("h-4 w-4 transition-colors duration-200", isActive && "text-primary-foreground")} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground rounded-full"></div>
                    )}
                  </Link>
                </Button>
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
                  className="md:hidden h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Logo */}
                  <Link 
                    href="/" 
                    className="flex items-center space-x-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">LM</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        Lionel Messi
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">Official App</span>
                    </div>
                  </Link>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Button
                          key={item.name}
                          variant="ghost"
                          asChild
                          className={cn(
                            "justify-start space-x-3 px-4 py-3 h-auto rounded-lg transition-all duration-200",
                            isActive && "bg-primary text-primary-foreground shadow-md"
                          )}
                        >
                          <Link 
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className={cn("h-5 w-5", isActive && "text-primary-foreground")} />
                            <span className="font-medium text-base">{item.name}</span>
                          </Link>
                        </Button>
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
