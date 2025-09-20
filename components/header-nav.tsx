"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Trophy, Users, BarChart3, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Partidos", href: "/matches", icon: Trophy },
  { name: "Familia", href: "/family", icon: Users },
  { name: "Estadísticas", href: "/statistics", icon: BarChart3 },
]

export function HeaderNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LM</span>
            </div>
            <span className="font-bold text-xl">Lionel Messi</span>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.name}
                variant={pathname === item.href ? "default" : "ghost"}
                asChild
                className={cn(
                  "flex items-center space-x-2",
                  pathname === item.href && "bg-primary text-primary-foreground"
                )}
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            )
          })}
        </nav>

        {/* Acciones */}
        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
