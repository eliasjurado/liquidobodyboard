# Liquido Bodyboard — Especificaciones del Proyecto

## Descripción General

E-commerce de **Liquido Bodyboard** — marca peruana de bodyboards y accesorios fundada por Pepo Herrera, con sede en Lima, Perú. Checkout directo por WhatsApp (sin pasarela de pagos).

### Redes
- **Instagram:** [@liquido_bodyboard](https://www.instagram.com/liquido_bodyboard/)
- **Facebook:** [Liquido Bodyboard](https://www.facebook.com/LiquidoBodyboard/)
- **TikTok:** [@liquidobodyboard](https://www.tiktok.com/@liquidobodyboard)

### Sitios de Referencia (Diseño)
- [bodyboardshop.com.au](https://www.bodyboardshop.com.au/) — Inverted Bodyboarding (Australia)
- [bodyboardking.com](https://www.bodyboardking.com/) — Bodyboard King
- [pridebodyboards.com](https://pridebodyboards.com/) — Hero con video de fondo

---

## Stack Técnico

### Maqueta Actual (Jekyll + GitHub Pages)

| Capa | Tecnología |
|---|---|
| Framework | Jekyll 3.9.0 |
| Frontend | HTML5 + CSS3 + JavaScript ES6+ vanilla |
| Estilos | CSS custom (luxury black) |
| Fuentes | Bebas Neue (títulos) + Inter (cuerpo) — Google Fonts |
| Iconos | Emojis actualmente — migrar a Material Icons |
| Deploy | GitHub Pages + Netlify |
| Catalog data | `assets/products.js` (`window.PRODUCTS`) + Jekyll collection `_productos/` |

### Stack de Producción (Recomendado)

> Heredado del proyecto Hanna Comida Árabe. Ver `05-operacion/ecommerce-spec/README.md`.

| Capa | Tecnología | Propósito |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React 18 + TypeScript | SSR, RSC, Server Actions |
| Estilos | TailwindCSS + shadcn/ui + CSS variables | Paleta luxury black configurable |
| Estado cliente | Zustand v5 | Auth, carrito, moneda, UI |
| Validación | Zod | Formularios y Server Actions |
| BD | Supabase Postgres | Catálogo, pedidos, perfiles, inventario |
| Auth | Supabase Auth | Email + Google OAuth |
| Storage | Supabase Storage | Imágenes, videos, logo |
| Cache offline | Service Worker (Workbox) | Navegación sin conexión |
| Hosting | Vercel | Edge Network, CI/CD |

### Principios de Diseño

- **Server Components por defecto**, Client Components solo donde hay interactividad.
- **Zustand sin persistencia para auth** — el estado se reconcilia con el server en cada hard navigation.
- **Zustand con persistencia (`localStorage`) para carrito y moneda** — sobreviven al cierre del navegador.
- **Checkout sin pasarela de pago** — el pedido se envía por WhatsApp.
- **Admin configurable vía `app_config`** — sin tocar SQL para cambios operativos.

---

## Arquitectura (Producción)

```
┌──────────────────────────────────────────────────────────────────┐
│                         Vercel (Edge)                            │
│  Next.js 14 App Router · React Server Components · Server Acts.  │
│           ┌─────────────┐         ┌─────────────────┐            │
│           │  / (público)│         │  /admin (RBAC)  │            │
│           └──────┬──────┘         └────────┬────────┘            │
└──────────────────┼─────────────────────────┼─────────────────────┘
                   │                         │
                   ▼                         ▼
            ┌─────────────────────────────────────────┐
            │              Supabase                   │
            │  Postgres · Auth (Google) · Storage     │
            │  Row Level Security · Edge Functions    │
            └─────────────────────────────────────────┘
                                              │
                                              ▼
                                  ┌──────────────────────┐
                                  │   WhatsApp Cloud API  │
                                  │  (notificaciones)     │
                                  └──────────────────────┘
```

---

## Datos del Negocio

### WhatsApp

- **Número real (Pepo):** `51951954781` — +51 951 954 781
- **Número en sitio.csv:** `51954781873` — +51 951 781 873 (confirmar cuál es el correcto)
- **Mensaje de pedido:** Incluye referencia `R-YYMMDD-XXXX`, detalle de productos con cantidades, subtotales, total y opciones de pago/entrega.

### Ubicación
- Lima, Perú
- Envíos a todo Perú vía Olva

### Moneda
- Soles peruanos (S/)
- Sin conversión a USD por ahora

---

## Catálogo de Productos

| ID | Producto | Categoría | Precio (S/) | Nivel | Stock |
|---|---|---|---|---|---|
| 1 | Liquido Pro PP 42" | Bodyboards | 380 | Pro | 8 |
| 2 | Liquido Pro PP 41" | Bodyboards | 360 | Pro | 6 |
| 3 | Liquido Pro PP 40" | Bodyboards | 340 | Pro | 5 |
| 4 | Liquido Entry PE 42" | Bodyboards | 220 | Iniciación | 12 |
| 5 | Liquido Entry PE 41" | Bodyboards | 200 | Iniciación | 10 |
| 6 | Leash de Muñeca | Accesorios | 45 | Accesorio | 20 |
| 7 | Leash de Bícep | Accesorios | 55 | Accesorio | 15 |
| 8 | Wax Frío (< 18°C) | Accesorios | 15 | Accesorio | 30 |
| 9 | Wax Templado (18-24°C) | Accesorios | 15 | Accesorio | 30 |
| 10 | Kit de Iniciación | Kits | 270 | Pack | 5 |

### Kit de Iniciación — Composición

El **Kit de Iniciación** (ID 10, S/ 270) es un bundle que incluye:
- Entry PE 42" (S/ 220 individual)
- Leash de Muñeca (S/ 45 individual)
- Wax Frío (S/ 15 individual)
- **Ahorro:** S/ 10 vs compra individual (S/ 280)

### Especificaciones Técnicas por Producto

#### Bodyboards

| Modelo | Núcleo | Rails | Tallas | Peso | Perfil |
|---|---|---|---|---|---|
| Pro PP | Polipropileno densidad alta | 60/40 | 40", 41", 42" | 1.2-1.4 kg | Riders intermedio/avanzado |
| Entry PE | Polietileno alta flotabilidad | 60/40 | 41", 42" | 1.3-1.5 kg | Principiantes |

#### Accesorios

| Producto | Material | Longitud | Peso | Uso |
|---|---|---|---|---|
| Leash Muñeca | Uretano 6mm, velcro reforzado | 180 cm | 0.1 kg | Universal |
| Leash Bícep | Uretano 7mm, velcro extra ancho | 180 cm | 0.1 kg | Olas grandes |
| Wax Frío | Parafina < 18°C | 85 g | 0.08 kg | Agua fría |
| Wax Templado | Parafina 18-24°C | 85 g | 0.08 kg | Agua templada (verano Perú) |

### Tags para Filtros y SEO

Cada producto tiene tags asociados: `pro,pp,42,intermedio,avanzado` / `pe,42,principiante,iniciacion` / `leash,accesorio,muneca` / `wax,parafina,frio`.

---

## Filtros de Catálogo

Inspirados en bodyboardshop.com.au:

- **Búsqueda:** Por nombre o descripción
- **Categoría:** Bodyboards / Accesorios / Kits
- **Nivel:** Pro / Iniciación / Pack / Accesorio
- **Precio máximo:** Hasta S/ 50 / 100 / 250 / 400
- **Ordenamiento:** Por defecto / Precio asc / Precio desc / Nombre A-Z
- **Núcleo:** PP / PE (bodyboards)

---

## Diseño Visual

### Paleta: Luxury Black

| Uso | Color | HEX |
|---|---|---|
| Fondo principal | Negro | `#0a0a0a` |
| Fondo secundario | Gris oscuro | `#1a1a1a` |
| Texto principal | Blanco | `#ffffff` |
| Texto secundario | Gris medio | `#888888` |
| Bordes/Divisores | Gris claro | `#e8e8e8` |
| Acentos | Blanco/grises | Sin color de acento |

> **Sin colores adicionales.** Aunque Instagram use acentos azules, la web es estrictamente blanco y negro. Estética premium, minimalista, high-end.

### Tipografía

- **Títulos:** Bebas Neue (display, condensada, impactante) — weights 400
- **Cuerpo:** Inter (sans-serif moderna, legible) — weights 300, 400, 500, 600
- **Botones/CTAs:** Inter semibold

### Iconografía

- **NO** usar emojis en la interfaz
- Usar **Material Design Icons (MDI)** o **Material Symbols**
- Reemplazar emojis actuales: 🌊 → `waves`, 🏄 → `surfing`, 📱 → `smartphone`, 📍 → `location_on`, 📸 → `camera_alt`, ✔ → `check_circle`, 🚚 → `local_shipping`, 💬 → `chat`, 🇵🇪 → `flag`

### Hero Video

- **Fuente:** Descargado de pridebodyboards.com (`BANNER_HOME_PRIDE2026_v2.mp4`)
- **Archivo local:** `img/hero-banner-pride.mp4` (24 MB, MP4)
- Estilo: footage de bodyboard en olas, cámara lenta, atardecer
- Se aplica overlay oscuro (`#0a0a0a` al 60-70%) para legibilidad del texto encima

### Estilo Visual

- Hero con video de fondo + overlay oscuro
- Buscador prominente en header con barra expandible
- Sección de categorías visible debajo del hero
- Grid de productos limpio con hover effects (escala sutil + sombra)
- Cards de producto: imagen, nombre, precio, badge de nivel
- Layout mobile-first responsive
- Navegación sticky con menú hamburguesa en mobile
- Carrito lateral (drawer) con checkout por WhatsApp
- Sin emojis — solo iconos Material UI

---

## Imágenes

### Especificaciones Técnicas

| Aspecto | Requisito |
|---|---|
| Formato | WebP (fotos) + JPG fallback |
| Imagen principal | 1200×1200 px, cuadrada |
| Ángulos extra | 1200×1200 px, hasta 6 por producto |
| Hero | 1920×1080 px, 16:9 |
| About | 800×800 px |
| Logo | SVG + PNG 512×512 |
| Tamaño máx | 200 KB por imagen (objetivo) |

### Nomenclatura de Archivos

```
img/
├── <id>.webp              # Foto principal del producto ID
├── <id>-2.webp            # Segundo ángulo
├── <id>-3.webp            # Tercer ángulo
├── hero-banner.webp       # Hero del home
├── about.webp             # Sección "Sobre nosotros"
└── logo.svg               # Logo vectorial
```

El sitio detecta automáticamente qué imágenes existen (sin huecos de 404).

### Pipeline de Generación (IA)

Ver `IMAGE_PROMPTS.md` para los prompts de cada producto. Estilo:
- Fondo blanco o negro limpio (según sección)
- Iluminación profesional de estudio
- Ángulo 3/4 del producto
- Sin sombras duras
- Resolución mínima 1200×1200 px

---

## Checkout por WhatsApp

### Flujo

1. Usuario agrega productos al carrito (localStorage)
2. Abre el drawer de carrito
3. Revisa items, cantidades, subtotal
4. Tapa "Pedir por WhatsApp"
5. Se genera mensaje con formato estandarizado
6. Se abre `wa.me/<numero>?text=<mensaje_codificado>`

### Formato del Mensaje

```
*Pedido Liquido Bodyboard*
*Ref:* R-250610-0001
*Cliente:* [nombre]
*Teléfono:* [teléfono]

*Productos:*
1x Liquido Pro PP 42" — S/ 380.00
1x Leash de Muñeca — S/ 45.00

*Subtotal:* S/ 425.00
*Envío:* S/ 15.00
*Total:* S/ 440.00

*Dirección de entrega:*
[calle, distrito, referencia]

*Forma de pago:*
Yape / Plin / Transferencia
```

### Opciones de Pago (a comunicar por WhatsApp)

- **Yape** (recomendado)
- **Plin**
- **Transferencia bancaria**
- Pago contra entrega (solo Lima)

### Envíos

- Courier urbano (Lima): S/ 15
- Olva (provincias): S/ 25-35 según peso
- Recojo en tienda: Sin costo

---

## Admin — Especificación Mínima

Para la versión producción (Next.js + Supabase), el admin debe permitir:

### Gestión de Productos
- CRUD completo de productos
- Subida de imágenes con compresión automática
- Actualización de stock
- Precios y descuentos

### Pedidos
- Ver pedidos entrantes desde WhatsApp (o desde BD si se implementa formulario)
- Marcar como: Pendiente / Confirmado / Enviado / Entregado
- Historial de pedidos por cliente

### Configuración
- Variables del sitio (WhatsApp, tarifas de envío, redes sociales)
- Banner promocional del home
- Términos legales (cookies, privacidad)

### Dashboard
- Pedidos del día
- Productos sin stock
- Totales del mes

---

## SEO y Analytics

### SEO Técnico
- **Sitemap:** Generado por `jekyll-sitemap` (maqueta) / dinámico (Next.js)
- **Meta tags:** `jekyll-seo-tag` (maqueta) / `next-seo` (producción)
- **JSON-LD:** Schema `Product` para cada ficha, `Store` para el negocio
- **URLs limpias:** `/producto/liquido-pro-pp-42/` sin `.html`
- **Alt text:** Descripciones descriptivas en imágenes (no dejar vacío)

### Keywords Objetivo
- bodyboard perú, tabla bodyboard, tienda bodyboard lima, bodyboard pro, bodyboard iniciación, accesorios bodyboard, leash bodyboard, wax bodyboard, kit bodyboard

### Analytics (Google Analytics 4)
- Eventos: `view_item`, `add_to_cart`, `begin_checkout`, `purchase`
- Seguimiento de conversiones: click a WhatsApp = lead
- Embudo: Landing → Visto producto → Carrito → WhatsApp click

---

## Internacionalización

- **Default:** Español (Perú)
- **Secundario:** Inglés
- Implementación maqueta: `assets/i18n.js` con objeto de traducciones
- Implementación producción: ver `05-operacion/ecommerce-spec/08-i18n.md`
- Claves: header, footer, hero, filtros, producto, carrito, checkout

---

## Estructura de Archivos

### Maqueta Jekyll

```
liquidobodyboard/
├── index.html                   # Home
├── _config.yml                  # Config Jekyll
├── _layouts/
│   ├── default.html             # Layout base
│   └── producto.html            # Layout ficha producto
├── _includes/
│   ├── header.html              # Header + navegación
│   ├── footer.html              # Footer + redes
│   ├── scripts.html             # Scripts globales
│   └── products-data.html       # Datos inline de productos
├── _productos/                  # Colección Jekyll (10 productos .md)
├── assets/
│   ├── styles.css               # Estilos luxury black (614 lines)
│   ├── products.js.bak          # Backup del catálogo JS
│   ├── cart.js                  # Carrito localStorage + WhatsApp (362 lines)
│   ├── detail.js                # Lógica de ficha de producto
│   └── i18n.js                  # Traducciones ES/EN
├── img/                         # Imágenes (21 archivos)
├── data-old/                    # Datos CSV obsoletos (mantener como backup)
│   ├── productos.csv            # Catálogo completo con specs
│   └── sitio.csv                # Variables del sitio
├── IMAGE_PROMPTS.md             # Prompts para generar imágenes con IA
├── SPEC.md                      # Este archivo
├── Gemfile / Gemfile.lock       # Dependencias Ruby
├── vendor/                      # Gems empaquetadas
└── _site/                       # Output Jekyll (generado)
```

### Producción Next.js

```
liquidobodyboard/
├── src/
│   ├── app/
│   │   ├── page.tsx             # Home
│   │   ├── layout.tsx           # Root layout
│   │   ├── producto/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # PDP
│   │   └── admin/               # Panel admin
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── cart-drawer.tsx
│   │   ├── product-card.tsx
│   │   └── whatsapp-button.tsx
│   ├── stores/
│   │   ├── cart-store.ts        # Zustand + persist
│   │   └── ui-store.ts          # Estado UI
│   ├── lib/
│   │   ├── supabase.ts          # Cliente Supabase
│   │   └── utils.ts             # Helpers
│   ├── i18n/
│   │   ├── es.json              # Traducciones español
│   │   └── en.json              # Traducciones inglés
│   └── middleware.ts            # i18n + RBAC
├── supabase/
│   └── migrations/              # SQL versionado
├── public/
│   └── img/                     # Imágenes optimizadas
├── tailwind.config.ts
└── next.config.ts
```

---

## Migración a Producción (Checklist)

### Fase 1 — Fundación
- [ ] Crear proyecto Next.js 14 con App Router + TypeScript
- [ ] Configurar TailwindCSS + shadcn/ui con paleta luxury black
- [ ] Configurar Supabase (proyecto, migraciones, RLS)
- [ ] Migrar catálogo de productos a BD (seed desde CSV)
- [ ] Implementar stores de Zustand (cart, ui)
- [ ] Implementar checkout por WhatsApp con formato estandarizado
- [ ] Deploy a Vercel con CI/CD

### Fase 2 — Contenido + Diseño
- [ ] Generar imágenes realistas con IA (ver IMAGE_PROMPTS.md)
- [ ] Implementar hero con video/imagen de fondo
- [ ] Implementar buscador
- [ ] Implementar filtros de catálogo
- [ ] Implementar página "Sobre nosotros"
- [ ] Implementar i18n ES/EN
- [ ] Reemplazar todos los emojis por Material Icons
- [ ] Configurar SEO (JSON-LD, meta tags, sitemap)
- [ ] Configurar Google Analytics 4

### Fase 3 — Admin
- [ ] Implementar panel admin (CRUD productos)
- [ ] Implementar vista de pedidos
- [ ] Implementar configuración del sitio

### Fase 4 — Calidad
- [ ] Probar en mobile + desktop + tablet
- [ ] Probar flujo de checkout completo
- [ ] Lighthouse audit (objetivo: > 90 en todas las métricas)
- [ ] Performance budget: < 2s FCP, < 100KB CSS, < 200KB imágenes

---

## Desarrollo Local

### Maqueta (Jekyll)
```bash
bundle exec jekyll serve
# http://localhost:4000/liquidobodyboard/
```

### Maqueta (servidor estático)
```bash
python3 -m http.server 8080
# http://localhost:8080
```

### Producción (Next.js)
```bash
npm run dev
# http://localhost:3000
npm run build && npm run type-check && npm run lint
```

---

## Problemas Resueltos

- [x] Estilos no cargaban en GitHub Pages: corregido `baseurl`
- [x] Paleta cambiada a "luxury black" (eliminados acentos azules)
- [x] Remote de Git actualizado a: `https://github.com/eliasjurado/liquidobodyboard/`
- [x] CSS reescrito estilo e-commerce profesional (bodyboardshop.com.au)
- [x] Imágenes placeholder WebP creadas para todos los productos
- [x] Prompts documentados para generar imágenes realistas con IA

## Pendientes

### Diseño
- [ ] Generar imágenes realistas de productos con IA (ver IMAGE_PROMPTS.md)
- [ ] Reemplazar emojis por iconos Material UI en el HTML
- [ ] Probar en mobile y desktop
- [ ] Revisar y ajustar detalles visuales
- [ ] Video de fondo para el hero

### Migración a Producción
- [ ] Ver checklist arriba

### Contenido
- [ ] Escribir descripciones largas únicas para cada producto (no repetir copy entre tallas)
- [ ] Definir tarifas de envío a provincia
- [ ] Definir política de cambios y devoluciones
- [ ] Escribir términos y condiciones + políticas de privacidad

---

## Deploy

### GitHub Pages
```bash
git add .
git commit -m "mensaje"
git push origin main
```

### Netlify
- Auto-deploy desde el repo de GitHub
- URL: https://liquidobodyboard.netlify.app/

---

## Referencias

- Especificaciones técnicas generales: `05-operacion/ecommerce-spec/`
- Proyecto de referencia (Hanna): `repos/hannacomidaarabe/`
- Guía de propuestas: `05-operacion/guia-propuestas.md`
- Prompts de imágenes: `IMAGE_PROMPTS.md`
