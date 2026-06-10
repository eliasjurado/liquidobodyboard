# Video Hero - Instrucciones

## Estado Actual
El hero está configurado para usar un video de fondo (estilo pridebodyboards.com), pero necesitas agregar tu propio archivo de video.

## Cómo Agregar el Video

1. **Descarga un video de bodyboard** de alguna de estas fuentes:
   - https://www.pexels.com/videos/search/bodyboard/
   - https://pixabay.com/videos/search/bodyboard/
   - https://mixkit.co/free-stock-video/bodyboard/
   - Tu propio video de bodyboarders en acción

2. **Guarda el video como:**
   ```
   repos/liquidobodyboard/img/hero-video.mp4
   ```

3. **Especificaciones recomendadas:**
   - Formato: MP4 (H.264)
   - Resolución: 1920x1080 o superior
   - Duración: 10-30 segundos (se reproduce en loop)
   - Tamaño: Máximo 10MB para carga rápida
   - Sin audio (el video se reproduce muted)

## Características del Video Hero

- **Autoplay:** El video se reproduce automáticamente
- **Muted:** Sin sonido (requerido por los navegadores)
- **Loop:** Se repite continuamente
- **Overlay:** Capa oscura al 60% para legibilidad del texto
- **Fallback:** Si el video no carga, muestra `hero-banner.webp` como poster
- **Responsive:** Se adapta a todos los tamaños de pantalla

## Alternativa: Imagen Estática

Si prefieres no usar video, el sitio ya tiene configurada la imagen `hero-banner.webp` como fallback. Solo elimina o comenta las líneas del video en `index.html`.

## Ejemplo de Video Sugerido

Busca videos con estas características:
- Bodyboarder en tubo (barrel riding)
- Maniobras como rollos (360°, airs)
- Olas peruanas (Chicama, Pacasmayo, etc.)
- Acción dinámica con buena iluminación
