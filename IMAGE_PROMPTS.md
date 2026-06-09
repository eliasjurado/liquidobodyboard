# Prompts para Generación de Imágenes de Productos

## Herramienta Recomendada
**Flux Pro 1.1** o **Gemini Image** para fotorealismo y consistencia de marca.

---

## Bodyboards Pro (IDs 1, 2, 3)

### Prompt Base
```
Professional product photography of a black bodyboard on pure white background, 
premium carbon fiber texture with subtle matte finish, Liquido brand logo visible, 
[SIZE] inches length, professional e-commerce style, studio lighting from top-left, 
sharp focus, high contrast, luxury black aesthetic, 800x800px, square format
```

### Variantes por Tamaño
- **ID 1 (42"):** "42 inches length, for tall riders 180cm+"
- **ID 2 (41"):** "41 inches length, for medium-tall riders 170-180cm"
- **ID 3 (40"):** "40 inches length, for medium riders 165-175cm"

---

## Bodyboards Entry (IDs 4, 5)

### Prompt Base
```
Professional product photography of a beginner bodyboard on pure white background, 
durable PE foam construction with glossy black finish, Liquido brand logo visible, 
[SIZE] inches length, entry-level design with reinforced rails, 
professional e-commerce style, studio lighting, 800x800px, square format
```

### Variantes por Tamaño
- **ID 4 (42"):** "42 inches length, for tall beginners"
- **ID 5 (41"):** "41 inches length, for medium-height beginners"

---

## Leash de Muñeca (ID 6)

### Prompt
```
Professional product photography of a black wrist leash for bodyboarding on pure white background, 
neoprene wrist cuff with velcro closure, coiled urethane cord, stainless steel swivel, 
Liquido brand logo on cuff, professional e-commerce style, studio lighting, 800x800px
```

---

## Leash de Bícep (ID 7)

### Prompt
```
Professional product photography of a black bicep leash for bodyboarding on pure white background, 
neoprene bicep band with velcro closure, coiled urethane cord, stainless steel swivel, 
Liquido brand logo on band, professional e-commerce style, studio lighting, 800x800px
```

---

## Wax Frío (ID 8)

### Prompt
```
Professional product photography of a cold water surf wax container on pure white background, 
black circular container with matte finish, "COLD WATER" text visible, 
Liquido brand logo on lid, professional e-commerce style, studio lighting, 800x800px
```

---

## Wax Templado (ID 9)

### Prompt
```
Professional product photography of a warm water surf wax container on pure white background, 
black circular container with matte finish, "WARM WATER" text visible, 
Liquido brand logo on lid, professional e-commerce style, studio lighting, 800x800px
```

---

## Kit de Iniciación (ID 10)

### Prompt
```
Professional product photography of a bodyboard starter kit on pure white background, 
flat lay composition showing: 1 entry-level bodyboard, 1 wrist leash, 1 wax container, 
all in black with Liquido branding, professional e-commerce style, 
studio lighting from top, organized layout, 800x800px
```

---

## Imagen About Section (about.webp)

### Prompt
```
Lifestyle photography of a bodyboarder riding a wave in Peru, 
Pacific ocean waves, dramatic sunset lighting, silhouette style, 
black and white aesthetic with high contrast, professional surf photography, 
cinematic composition, 1200x800px, landscape format
```

---

## Especificaciones Técnicas

### Formato de Salida
- **Formato:** WebP (con fallback JPEG)
- **Dimensiones:** 800x800px para productos, 1200x800px para lifestyle
- **Calidad:** 85% (balance entre calidad y tamaño)
- **Fondo:** Blanco puro (#ffffff) o negro puro (#0a0a0a)

### Consistencia de Marca
- **Paleta:** Negro, blanco, grises (sin colores adicionales)
- **Estilo:** Premium, minimalista, high-end
- **Iluminación:** Estudio profesional, sombras suaves
- **Composición:** Producto centrado, espacio negativo generoso

### Herramientas Alternativas
Si Flux/Gemini no están disponibles:
1. **Ideogram 3.0** — mejor para texto en imágenes
2. **Midjourney v7** — alta calidad artística
3. **Recraft V3** — consistencia de marca

### Post-Procesamiento
Después de generar:
1. Remover fondo si es necesario (remove.bg o similar)
2. Ajustar contraste y brillo para consistencia
3. Convertir a WebP con calidad 85%
4. Optimizar para web (tinypng.com)

---

## Notas para el Fotógrafo (si se usa fotografía real)

### Setup de Estudio
- **Fondo:** Ciclorama blanco infinito o negro
- **Iluminación:** 2 softboxes principales + 1 fill light
- **Cámara:** DSLR/Mirrorless con lente macro 50-100mm
- **Configuración:** f/8-f/11 para nitidez, ISO 100-200

### Ángulos Requeridos
1. **Vista frontal** (principal)
2. **Vista lateral** (perfil)
3. **Vista en ángulo** (45 grados)
4. **Detalle de textura/material** (close-up)

### Post-Producción
- Corrección de color para consistencia
- Remoción de imperfecciones
- Ajuste de sombras y reflejos
- Exportar en WebP + JPEG (fallback)
