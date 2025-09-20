# ⚽ Lionel Messi Web App

<p align="center">
  <svg width="100%" height="200" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#06B6D4;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="200" fill="url(#grad)" rx="15" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      style="fill:white; font-family: 'Arial Black', sans-serif; font-size:48px; font-weight:900; letter-spacing:2px;">
      ⚽ Lionel Messi Web App
    </text>
    <text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle"
      style="fill:white; font-family: Arial, sans-serif; font-size:20px; opacity:0.9;">
      Estadísticas · Partidos · Familia · Dashboard
    </text>
  </svg>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/shadcn/ui-✨-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Recharts-📊-teal?style=for-the-badge" />
</p>

> Una aplicación web completa dedicada a **Lionel Messi**: partidos, estadísticas, familia y mucho más.  

---

## 🚀 Características Principales

- 🏠 **Home**: Biografía editable, hero dinámico y estadísticas rápidas animadas  
- 🏆 **Match Games**: CRUD completo de partidos con filtros avanzados  
- 👨‍👩‍👧‍👦 **Family**: Árbol genealógico interactivo con CRUD y animaciones suaves  
- 📊 **Statistics**: Dashboard analítico con KPIs, gráficos y tabla de rivales  

---

## 🖼️ Demo Visual

| Home | Estadísticas | Partidos | Familia |
|------|--------------|----------|---------|
| ![home](https://placehold.co/300x180?text=Home) | ![stats](https://placehold.co/300x180?text=Stats) | ![matches](https://placehold.co/300x180?text=Matches) | ![family](https://placehold.co/300x180?text=Family) |

---

## 🛠️ Tecnologías

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org)  
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org)  
- **Estilos**: [TailwindCSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)  
- **Gráficos**: [Recharts](https://recharts.org/en-US)  
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)  
- **Formularios**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)  
- **Tema**: [next-themes](https://github.com/pacocoursey/next-themes) (dark/light mode)  
- **Persistencia**: `localStorage` con datos semilla  

---

## 📦 Instalación

```bash
# 1. Clonar el proyecto
git clone https://github.com/tuusuario/messi-web-app.git
cd messi-web-app

# 2. Instalar dependencias
npm install   # o yarn install / pnpm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en el navegador
http://localhost:3000
