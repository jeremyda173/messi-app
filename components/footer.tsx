"use client"

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="max-w-7xl mx-auto py-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">LM</span>
          </div>
          <span className="font-semibold">Lionel Messi Official App</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2024 Lionel Messi. Todos los derechos reservados.
        </p>
        <p className="text-xs text-muted-foreground">
          Desarrollado con ❤️ para los fanáticos del fútbol
        </p>
      </div>
    </footer>
  )
}
