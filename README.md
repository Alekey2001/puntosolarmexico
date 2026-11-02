# Punto Solar México

Base del sitio web para publicar mediante Git en el hosting web de Hostinger.
Incluye una página temporal de «Próximamente», adaptable a celular y escritorio.

## Archivos

- [index.html](index.html): página inicial.
- [assets/css/styles.css](assets/css/styles.css): estilos.
- [.htaccess](.htaccess): página predeterminada y protección de archivos de desarrollo para Apache/LiteSpeed.
- [.gitignore](.gitignore): evita subir credenciales y archivos locales habituales.

No requiere Node.js, npm, base de datos ni un comando de compilación. Puedes abrir
[index.html](index.html) en el navegador para revisar la página localmente.

## Conectar Hostinger mediante Git

Esta guía corresponde al hosting web con la herramienta Git de hPanel. Los nombres
de las opciones pueden variar según el plan y la versión del panel. Si estás en
Hostinger Website Builder o en el flujo de aplicaciones Node.js, estos campos no
corresponden a ese producto.

1. En hPanel, abre **Sitios web → Administrar / Panel** del dominio correspondiente.
2. Busca **Git**, normalmente dentro de **Avanzado**.
3. En la sección para crear un repositorio, utiliza:

   | Campo | Valor |
   | --- | --- |
   | URL del repositorio público (HTTPS) | `https://github.com/Alekey2001/puntosolarmexico.git` |
   | URL SSH (para repositorios privados o acceso mediante clave) | `git@github.com:Alekey2001/puntosolarmexico.git` |
   | Rama | `main` |
   | Directorio de instalación | La raíz web del dominio, normalmente `public_html` |

   **Directorio:** si el formulario indica que la ruta es relativa a `public_html`,
   deja el campo vacío para publicar en la raíz. No escribas `public_html` de nuevo
   en ese caso, porque crearías una subcarpeta. Si el panel solicita una ruta completa,
   selecciona la raíz web de ese dominio. Revisa la ayuda del campo antes de crear.

4. El destino debe estar vacío para la instalación inicial. Si contiene una página
   predeterminada o un sitio existente, respáldalo antes de mover o eliminar archivos.
   Un archivo `index.php` anterior puede interferir con la página inicial.
5. Crea la conexión y pulsa **Deploy / Implementar** si el panel lo solicita.
6. Abre el dominio y confirma que aparece «Punto Solar México». Activa el certificado
   SSL y la opción de forzar HTTPS en hPanel cuando el dominio ya apunte al hosting.

### Si el repositorio es privado

1. Genera o consulta la clave SSH para Git que ofrece Hostinger en hPanel.
2. Copia únicamente la **clave pública**.
3. En GitHub, abre este repositorio → **Settings → Deploy keys → Add deploy key**.
4. Pega la clave pública y deja **Allow write access** desmarcado: Hostinger solo
   necesita leer el repositorio.
5. En Hostinger usa la URL SSH indicada en la tabla.

Nunca subas claves privadas, contraseñas ni tokens al repositorio.

### Despliegue automático (opcional)

Si tu panel ofrece **Auto deployment**, sigue sus indicaciones para configurar en
GitHub el webhook que proporciona Hostinger. Normalmente se encuentra en el
repositorio → **Settings → Webhooks → Add webhook** y utiliza el evento **push**.
Usa exactamente la URL, el tipo de contenido y el secreto que indique el panel;
no guardes esos valores en este repositorio. Sin esa configuración, publica cada
actualización con el botón **Deploy / Implementar** de Hostinger.

## Actualizar el sitio

Desde esta carpeta, después de editar y revisar los archivos:

```powershell
git status
git add index.html assets/css/styles.css
git commit -m "Actualizar sitio web"
git push origin main
```

Agrega explícitamente otros archivos si también los modificaste. Después despliega
desde hPanel, salvo que ya hayas habilitado el despliegue automático.

## Antes de lanzar la versión definitiva

- Sustituir el contenido temporal por la información real del negocio.
- Agregar datos de contacto verificados y aviso de privacidad si se recopilan datos.
- Quitar la etiqueta `meta name="robots" content="noindex, follow"` de la página
  cuando el contenido definitivo esté listo para aparecer en buscadores.
- Verificar el dominio, HTTPS y la visualización en celular.

La conexión con GitHub no configura por sí sola el dominio ni la cuenta de Hostinger.
