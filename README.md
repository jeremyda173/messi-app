# ⚽ Lionel Messi Web App

Una aplicación web completa dedicada a Lionel Messi con estadísticas, partidos, familia y más.

## 🚀 Características

- **Home**: Hero con biografía editable y estadísticas rápidas animadas
- **Match Games**: Sistema CRUD completo para gestionar partidos con filtros avanzados
- **Family**: Árbol genealógico interactivo con CRUD
- **Statistics**: Dashboard analítico con gráficos interactivos usando Recharts

## 🛠️ Tecnologías

- **Framework**: Next.js 14 with App Router
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS v4 + shadcn/ui
- **Animaciones**: Framer Motion
- **Gráficos**: Recharts
- **Formularios**: React Hook Form + Zod
- **Tema**: next-themes (Dark/Light mode)
- **Persistencia**: localStorage

## 📦 Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias:**
\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

3. **Ejecutar en desarrollo:**
\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

4. **Abrir en el navegador:**
\`\`\`
http://localhost:3000
\`\`\`

## 🏗️ Scripts Disponibles

- `npm run dev` - Ejecuta en modo desarrollo
- `npm run build` - Construye para producción
- `npm run start` - Ejecuta la versión de producción
- `npm run lint` - Ejecuta el linter

## 📱 Funcionalidades

### Home
- Hero con imagen de Messi
- Biografía editable
- Estadísticas rápidas con barras animadas
- Badges de logros

### Match Games
- Crear, editar, duplicar y eliminar partidos
- Filtros avanzados (fecha, competencia, equipo, etc.)
- Vista en cards y tabla
- Importar/Exportar JSON
- Datos semilla incluidos

### Family
- Árbol genealógico visual
- CRUD completo de familiares
- Importar/Exportar JSON
- Animaciones suaves

### Statistics
- KPIs con barras de progreso animadas
- Gráficos interactivos (líneas, barras, pie)
- Filtros dinámicos
- Tabla de estadísticas vs rivales

## 🎨 Características de Diseño

- **Responsive**: Funciona en móvil, tablet y desktop
- **Dark Mode**: Tema oscuro/claro automático
- **Animaciones**: Transiciones suaves con Framer Motion
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Colores**: Paleta inspirada en Argentina (azul y blanco)

## 💾 Datos

- Los datos se guardan automáticamente en localStorage
- Incluye datos semilla de ejemplo
- Funciones de importar/exportar JSON en cada sección

## 🔧 Personalización

Puedes personalizar:
- Colores en `app/globals.css`
- Datos semilla en `lib/seed-data.ts`
- Tipos en `lib/types.ts`
- Componentes UI en `components/ui/`

---

**Desarrollado con ❤️ para los fanáticos de Lionel Messi**
