# Cómo publicar una noticia

Cada noticia es un archivo de texto dentro de la carpeta `contenido/noticias`. No necesitas programar.

## Desde la web de GitHub (sin instalar nada)

1. Entra a https://github.com/AngieLiAl/cut-peru-web y abre la carpeta `contenido/noticias`.
2. Abre `_plantilla.md` y copia todo su texto.
3. Vuelve a la carpeta y haz clic en **Add file → Create new file**.
4. Escribe el nombre del archivo en minúsculas, sin tildes ni espacios y terminado en `.md`. Ese nombre será la dirección de la noticia.
   Ejemplo: `marcha-trabajo-decente.md` → `/noticias/marcha-trabajo-decente`.
5. Pega la plantilla y cambia los datos y el texto.
6. Haz clic en **Commit changes**. Vercel publicará la noticia en uno o dos minutos.

## Para agregar una foto de portada

1. Abre la carpeta `public/noticias` y haz clic en **Add file → Upload files**.
2. Sube la foto en JPG o PNG, horizontal, de unos 1600 px de ancho y menos de 1 MB.
   Usa un nombre sin tildes ni espacios, por ejemplo `marcha-lima.jpg`.
3. En la noticia, escribe `portada: /noticias/marcha-lima.jpg`.

Si no pones portada, la página genera una automáticamente con los colores de la categoría.

## Los datos de cada noticia

| Dato | Obligatorio | Ejemplo |
|---|---|---|
| `titulo` | Sí | Marcha por el trabajo decente |
| `fecha` | Sí, en formato AAAA-MM-DD | 2026-11-25 |
| `categoria` | Sí | Comunicado, Acción Sindical, Educación, Mujer Trabajadora, Internacional, Juventud |
| `resumen` | Sí | Una o dos frases |
| `autor` | No | Secretaría de Comunicación |
| `portada` | No | /noticias/marcha-lima.jpg |
| `pie_de_foto` | No | Delegaciones regionales en la Plaza San Martín |
| `destacada` | No | `si` para que aparezca grande en la portada |

Las noticias se ordenan solas por fecha, de la más nueva a la más antigua. Puedes usar otras categorías: tendrán una portada automática en azul.

## Si algo sale mal

Si falta un dato obligatorio, la fecha está mal escrita o la foto no existe, Vercel no publica el cambio y muestra un mensaje en español que dice qué archivo revisar. La versión anterior de la página sigue en línea mientras tanto.

Para borrar una noticia, abre su archivo en GitHub y usa el ícono de la papelera.
