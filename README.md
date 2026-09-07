# Portafolio — Josue Gamez

Sitio de una sola página, sin frameworks ni pasos de instalación. Todo el contenido vive en archivos `.json` dentro de `/data`, así que actualizar el portafolio nunca requiere tocar HTML ni CSS.

## Cómo agregar un certificado nuevo

1. Sube el PDF o la imagen del diploma a la carpeta `assets/certificados/` (por ejemplo `power-bi-avanzado.pdf`).
2. Abre `data/certificados.json` y agrega un bloque nuevo al inicio del arreglo:

```json
{
  "nombre": "Nombre del curso o certificación",
  "fuente": "Plataforma o institución",
  "fecha": "Mes Año",
  "id": "ID del certificado (o null si no tiene)",
  "icono": "slug-de-simpleicons-o-null",
  "iniciales": "AB",
  "color": "2563EB",
  "archivo": "assets/certificados/power-bi-avanzado.pdf"
}
```

- `icono`: si la plataforma tiene un logo en [simpleicons.org](https://simpleicons.org) (por ejemplo `coursera`, `google`, `linkedin`), pon el nombre exacto (el "slug") ahí. Si no existe, pon `null` y usa `iniciales` (dos letras) en su lugar.
- `archivo`: la ruta al PDF/imagen que subiste. Si todavía no lo tienes escaneado, pon `null` y la tarjeta mostrará "Sin archivo" en vez de un enlace roto.
- Guarda, sube los cambios a GitHub (ver abajo) y listo — el contador de certificaciones en la parte de arriba se actualiza solo.

## Cómo agregar un proyecto nuevo

1. (Opcional) Sube capturas o archivos a `assets/proyectos/`.
2. Abre `data/proyectos.json` (empieza vacío: `[]`) y agrega:

```json
{
  "titulo": "Nombre del proyecto",
  "estado": "live",
  "descripcion": "Qué hace el proyecto y qué problema resuelve.",
  "tags": ["Power BI", "Python", "SQL"],
  "link": "https://github.com/tu-usuario/tu-repo"
}
```

- `estado` acepta: `live` (en producción), `wip` (en desarrollo) o `soon` (próximamente).
- `link` puede ser un repositorio de GitHub, un Power BI publicado en la web, o cualquier URL. Si no tienes uno todavía, pon `null`.

## Cómo editar tu información general

Todo el texto del encabezado, la bio, el correo, teléfono y LinkedIn está en `data/perfil.json`.

## Estructura del proyecto

```
├── index.html              → estructura de la página (no se edita casi nunca)
├── style.css                → estilos visuales
├── script.js                 → lee los .json y arma la página (no se edita)
├── data/
│   ├── perfil.json           → tu información personal
│   ├── habilidades.json      → herramientas que dominas
│   ├── experiencia.json      → historial laboral
│   ├── certificados.json     → diplomas y cursos ← se edita seguido
│   └── proyectos.json        → portafolio de proyectos ← se edita seguido
└── assets/
    ├── certificados/         → PDFs/imágenes de tus diplomas
    └── proyectos/             → capturas de tus proyectos
```

## Ver el sitio en tu computadora antes de publicarlo

Los navegadores bloquean la carga de archivos `.json` cuando abres `index.html` con doble clic. Para probarlo localmente, abre una terminal en esta carpeta y corre:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en tu navegador. (Esto **no** es necesario para publicarlo en GitHub Pages — ahí funciona directo).
