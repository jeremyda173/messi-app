export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">LM</span>
            </div>
            <span className="font-semibold">Lionel Messi Official App</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Lionel Messi. Todos los derechos reservados.</p>
          <p className="text-xs text-muted-foreground">Desarrollado con ❤️ para los fanáticos del fútbol</p>
        </div>
      </div>
    </footer>
  )
}
