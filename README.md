# Sistema Integral de Gestión y Web Comercial - Punto Solar México

Plataforma digital de alto rendimiento desarrollada para **Punto Solar México**, empresa líder en la transición hacia energías limpias y renovables. Este sistema centraliza la captación de leads comerciales y optimiza el flujo operativo de ventas a través de una arquitectura dual.

## 🏗 Arquitectura y Colaboración Tecnológica

Este proyecto está diseñado, estructurado y mantenido bajo la arquitectura tecnológica de **AIACO**. 

AIACO provee la infraestructura de desarrollo, aplicando estándares de seguridad, escalabilidad y eficiencia operativa. La solución integra un ecosistema robusto basado en Node.js, asegurando tiempos de respuesta óptimos para el cliente final y una gestión de datos fluida para la administración interna de Punto Solar México.

## 📦 Estructura del Sistema

El ecosistema se divide en dos módulos interconectados:

1. **Plataforma Web (Front-Facing):** Landing page optimizada para la conversión. Interfaz rápida, accesible y estructurada para guiar al usuario final hacia la cotización de sistemas solares.
2. **Mini-CRM Administrativo (Back-Office):** Panel de control privado. Permite la visualización, clasificación y seguimiento del flujo de prospectos (leads) captados desde la web, organizado en estados operativos.

## 🚀 Despliegue y Entorno de Desarrollo

El proyecto utiliza **pnpm** para garantizar resoluciones de dependencias rápidas y eficientes en el uso de disco.

### Comandos de Ejecución

1. **Instalación de dependencias:**
   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Frontend local con Vite:**
   ```bash
   pnpm dev
   ```

3. **Compilar y ejecutar con Express:**
   ```bash
   pnpm build
   pnpm start
   ```

4. **Comprobar compilación, recursos públicos y disponibilidad HTTP:**
   ```bash
   pnpm test
   ```

### Frontend

- [src/web/components/Hero.jsx](src/web/components/Hero.jsx): imagen temporal de Unsplash, overlay Azul Petróleo al 70% y CTA visual. La propiedad `onQuoteRequest` permite conectar la cotización cuando se defina su destino.
- [src/web/pages/Home.jsx](src/web/pages/Home.jsx): vista principal.
- [src/web/styles.css](src/web/styles.css): Roboto local en Regular, Italic, Bold y Bold Italic; estilos globales y entrada de Tailwind CSS.
- [tailwind.config.js](tailwind.config.js): colores `primary`, `accent` y `success`; configuración cargada mediante `@config` en Tailwind CSS 4.
- [vite.config.js](vite.config.js): integración de React y Tailwind para generar `dist/`.

### Hostinger: aplicación Node.js existente

Conserva la integración de GitHub, el repositorio, la rama, el dominio y las variables actuales. Configura estos comandos en la aplicación existente:

| Paso | Comando |
| --- | --- |
| Instalar (incluye las herramientas necesarias para compilar) | `pnpm install --frozen-lockfile --prod=false` |
| Build | `pnpm build` |
| Inicio | `pnpm start` |

[server.js](server.js) sirve exclusivamente el HTML y los recursos compilados de `dist/`; mantiene `/health`, la escucha en `0.0.0.0` y el puerto indicado por `PORT` (3000 de forma predeterminada). Es necesario compilar antes del arranque. `dist/` se genera durante el despliegue y no se guarda en Git.

Node.js continúa fijado en 24.22.1 y pnpm en 11.1.2. Esta configuración local no publica cambios en Hostinger.

Referencias: [estructura de Stella Solar](https://stellasolar.mx/), [Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite) y [configuración JavaScript de Tailwind](https://tailwindcss.com/docs/functions-and-directives#config).
