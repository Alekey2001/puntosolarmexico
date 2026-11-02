# Punto Solar México

Sitio web con **Node.js 24.22.1 y Express**, preparado para desplegar como aplicación Node.js en Hostinger desde GitHub.

## Desarrollo local

Usa Node.js 24.22.1, indicado en [package.json](package.json), [.nvmrc](.nvmrc) y [.node-version](.node-version).

```powershell
npm ci
npm start
```

Abre <http://localhost:3000>. Usa `npm run dev` para reiniciar automáticamente al editar el servidor. Ejecuta `npm run build` para comprobar la sintaxis y `npm test` para verificar las respuestas HTTP. Esta base no necesita transpilar archivos: el build valida el servidor, sin generar una carpeta `dist`.

## Configuración en Hostinger

En **Sitios web → Añadir sitio web → Aplicación web Node.js**, importa el repositorio mediante la integración de GitHub. Si ya creaste la aplicación, vuelve a detectar el proyecto o despliega el último commit de `main`.

| Campo | Valor |
| --- | --- |
| Repositorio | `Alekey2001/puntosolarmexico` |
| URL | `https://github.com/Alekey2001/puntosolarmexico` |
| Rama | `main` |
| Directorio raíz del proyecto | `.` (raíz del repositorio) |
| Framework | Express |
| Node.js | 24.x en el selector; versión del proyecto: 24.22.1 |
| Gestor de paquetes | npm |
| Instalación, si se solicita | `npm ci` |
| Build, si se solicita | `npm run build` |
| Inicio | `npm start` |
| Archivo de entrada, si se solicita | `server.js` |
| Variables de entorno | `NODE_ENV=production` |

El servidor escucha en `0.0.0.0` y utiliza `PORT` del entorno, con `3000` como valor predeterminado. No necesita base de datos. Hostinger documenta la selección de la serie 24.x; comprueba en los logs qué versión exacta asigna. Declarar 24.22.1 en el repositorio no instala esa versión en Hostinger.

Este despliegue usa una aplicación Node.js. No requiere seleccionar `public_html`, configurar `.htaccess` ni usar el flujo Git del hosting estático anterior.

Si aparece **«Repositorio o rama no encontrados»**:

1. Confirma el repositorio y la rama `main`.
2. Confirma que [package.json](package.json) está en la raíz seleccionada y contiene el script `"start": "node server.js"`.
3. Si el repositorio es privado, autoriza el acceso a ese repositorio en la integración de GitHub con Hostinger.
4. Actualiza la lista de repositorios o vuelve a importar para que Hostinger lea el último commit. Revisa los logs si persiste el error.

Guías oficiales:

- [Desplegar una aplicación Node.js](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Seleccionar la versión de Node.js](https://www.hostinger.com/support/how-to-select-the-node-js-version-for-your-application/)

## Estructura

- [server.js](server.js): servidor Express, rutas públicas y comprobación `/health`.
- [index.html](index.html): página temporal de «Próximamente».
- [assets/css/styles.css](assets/css/styles.css): estilos adaptables.
- [test/server.test.js](test/server.test.js): pruebas HTTP.
- [package-lock.json](package-lock.json): versiones reproducibles de dependencias.

Solo se sirven la página inicial y los recursos de `assets`. La configuración, el código del servidor y los archivos de Git no se publican por HTTP.

## Actualizar el sitio

Después de editar, ejecuta las comprobaciones y sube únicamente los archivos revisados:

```powershell
npm run build
npm test
git status
git add index.html assets/css/styles.css
git commit -m "Actualizar sitio web"
git push origin main
```

Incluye otros archivos explícitamente si también los modificaste. Confirma el resultado del despliegue en Hostinger; subir a GitHub por sí solo no demuestra que la aplicación esté publicada.

Antes del lanzamiento definitivo, reemplaza el contenido temporal, agrega datos reales de contacto y retira la etiqueta `noindex` de la página cuando esté lista para aparecer en buscadores. Nunca guardes credenciales en el repositorio.
