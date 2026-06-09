# Liquido Bodyboard — Especificaciones del Proyecto

## Descripción General

E-commerce de **Liquido Bodyboard** — marca de bodyboards y accesorios con sede en Lima, Perú. 
Checkout directo por WhatsApp (sin pasarela de pagos).

### Instagram
- [@liquido_bodyboard](https://www.instagram.com/liquido_bodyboard/)

### Sitios de Referencia (Diseño)
- [bodyboardshop.com.au](https://www.bodyboardshop.com.au/) — Inverted Bodyboarding (Australia)
- [bodyboardking.com](https://www.bodyboardking.com/) — Bodyboard King

---

## Especificaciones Técnicas Generales (E-commerce)

> **Origen:** Plantilla reutilizable de `05-operacion/ecommerce-spec/`  
> **Stack recomendado para producción:** Next.js 14 + Supabase + Vercel  
> **Maqueta actual:** Jekyll + GitHub Pages (prototipo)

### Arquitectura General

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
```

| Capa | Tecnología | Propósito |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React 18 + TypeScript | SSR, RSC, Server Actions |
| Estilos | TailwindCSS + shadcn/ui + CSS variables | Paleta configurable desde admin |
| Estado cliente | Zustand v5 | Auth, carrito, moneda, UI |
| Validación | Zod | Formularios y Server Actions |
| Base de datos | Supabase Postgres | Catálogo, pedidos, perfiles, inventario |
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

### Fichas Técnicas Detalladas

| # | Ficha | Descripción |
|---|---|---|
| 01 | [`01-db-schema.md`](../../05-operacion/ecommerce-spec/01-db-schema.md) | Esquema SQL completo (tablas, RLS, índices, triggers) |
| 02 | [`02-auth.md`](../../05-operacion/ecommerce-spec/02-auth.md) | Zustand store, flujos login/signout, AuthInit, clientes Supabase |
| 03 | [`03-cart-checkout.md`](../../05-operacion/ecommerce-spec/03-cart-checkout.md) | Carrito store con persistencia, checkout WhatsApp, notificaciones |
| 04 | [`04-search.md`](../../05-operacion/ecommerce-spec/04-search.md) | Buscador en header con top 5 resultados, API route, SQL |
| 05 | [`05-admin.md`](../../05-operacion/ecommerce-spec/05-admin.md) | Panel admin, KPIs, CRUDs, roles, alertas de sistema |
| 06 | [`06-messaging.md`](../../05-operacion/ecommerce-spec/06-messaging.md) | Estrategias multicanal (WhatsApp/Instagram/Messenger/DB), FAB |
| 07 | [`07-currency.md`](../../05-operacion/ecommerce-spec/07-currency.md) | Moneda base + conversión, store con persistencia, selector |
| 08 | [`08-i18n.md`](../../05-operacion/ecommerce-spec/08-i18n.md) | Internacionalización, JSON de traducciones, hook `useT()` |
| 09 | [`09-pwa-theme.md`](../../05-operacion/ecommerce-spec/09-pwa-theme.md) | Service Worker, manifest, tema visual, dark mode |
| 10 | [`10-ops.md`](../../05-operacion/ecommerce-spec/10-ops.md) | Mantenimiento, RBAC, middleware, estructura de archivos |
| 11 | [`11-inventory.md`](../../05-operacion/ecommerce-spec/11-inventory.md) | Stock numérico, movimientos trazables, alertas, reportes |

---

## Decisiones de Diseño (Liquido Bodyboard)

### Paleta de Colores: Luxury Black
- **Fondo principal:** Negro (#0a0a0a) y tonos oscuros
- **Acentos:** Solo blanco y grises
- **Sin colores adicionales** (a pesar de los acentos azules en Instagram)
- Estética premium, minimalista, high-end
- Inspirado en el estilo limpio de bodyboardshop.com.au

### Iconografía
- **NO usar emoticones/emojis** en la interfaz
- **Usar iconos de Material Design Icons (MDI)** o Material Symbols
- Reemplazar todos los emojis existentes (🌊 🏄 📱 📍 📸 ✔ 🚚 💬 🇵🇪) por iconos SVG de Material UI

### Tipografía
- **Títulos:** Bebas Neue (display, condensada, impactante)
- **Cuerpo:** Inter (sans-serif moderna, legible)

### Estilo Visual (basado en sitios de referencia)
- Hero banner grande con imagen de producto/lifestyle
- Grid de productos limpio con hover effects
- Filtros de catálogo: categoría, nivel, precio, ordenamiento
- Cards de producto con: imagen, nombre, precio, badge de nivel
- Layout mobile-first responsive
- Navegación sticky con menú hamburguesa en mobile
- Carrito lateral (drawer) con checkout por WhatsApp

### Imágenes de Producto
- Fotos realistas generadas con IA
- Cada producto necesita: imagen principal + 2-3 ángulos
- Fondo limpio (blanco o negro según sección)
- Estilo profesional de e-commerce

---

## Stack Técnico (Maqueta Actual)

- **Framework:** Jekyll 3.9.0 + GitHub Pages
- **Frontend:** HTML5 + CSS3 + JavaScript ES6+ vanilla
- **Deploy:** 
  - GitHub Pages: https://liquidobodyboard.github.io/liquidobodyboard/
  - Netlify: https://liquidobodyboard.netlify.app/
- **Sin npm, sin build tools**

### Stack de Producción (Recomendado)

Para la versión final en producción, migrar a:
- **Next.js 14** (App Router) + TypeScript
- **Supabase** (Postgres + Auth + Storage)
- **TailwindCSS** + shadcn/ui
- **Zustand** para estado del cliente
- **Vercel** para hosting

---

## Estructura de Archivos (Maqueta Jekyll)

```
liquidobodyboard/
├── index.html              # Home: hero, catálogo, nosotros, valores, contacto
├── _config.yml             # Configuración Jekyll
├── _layouts/
│   ├── default.html        # Layout base
│   └── producto.html       # Layout de ficha de producto
├── _includes/
│   ├── header.html         # Header con navegación
│   ├── footer.html         # Footer con redes sociales
│   ├── scripts.html        # Scripts globales
│   └── products-data.html  # Datos de productos inline
├── _productos/             # Colección Jekyll de productos (10 items)
├── assets/
│   ├── styles.css          # Estilos globales (luxury black)
│   ├── products.js         # Datos de productos (window.PRODUCTS)
│   ├── cart.js             # Carrito con localStorage + checkout WhatsApp
│   ├── detail.js           # Lógica de ficha de producto
│   └── i18n.js             # Internacionalización (ES/EN)
├── img/                    # Imágenes de productos
└── _site/                  # Output de Jekyll (generado, no versionado)
```

### Estructura de Archivos (Producción Next.js)

Ver [`10-ops.md`](../../05-operacion/ecommerce-spec/10-ops.md) para la estructura completa de Next.js.

---

## Catálogo de Productos

| ID | Producto                  | Categoría   | Precio (S/) | Nivel       |
|----|---------------------------|-------------|-------------|-------------|
| 1  | Liquido Pro PP 42"        | Bodyboards  | 380         | Pro         |
| 2  | Liquido Pro PP 41"        | Bodyboards  | 360         | Pro         |
| 3  | Liquido Pro PP 40"        | Bodyboards  | 340         | Pro         |
| 4  | Liquido Entry PE 42"      | Bodyboards  | 220         | Iniciación  |
| 5  | Liquido Entry PE 41"      | Bodyboards  | 200         | Iniciación  |
| 6  | Leash de Muñeca Liquido   | Accesorios  | 45          | Accesorio   |
| 7  | Leash de Bícep Liquido    | Accesorios  | 55          | Accesorio   |
| 8  | Wax Frío Liquido          | Accesorios  | 15          | Accesorio   |
| 9  | Wax Templado Liquido      | Accesorios  | 15          | Accesorio   |
| 10 | Kit de Iniciación Liquido | Kits        | 270         | Pack        |

---

## Filtros de Catálogo

Inspirados en bodyboardshop.com.au:

- **Búsqueda:** Por nombre o descripción
- **Categoría:** Bodyboards / Accesorios / Kits
- **Nivel:** Pro / Iniciación / Pack / Accesorio
- **Precio máximo:** Hasta S/ 50 / 100 / 250 / 400
- **Ordenamiento:** Por defecto / Precio asc / Precio desc / Nombre A-Z

---

## Variables del Sitio

- **WhatsApp:** +51 951 954 781 (51951954781)
- **Ubicación:** Lima, Perú
- **Instagram:** @liquido_bodyboard
- **Moneda:** S/ (Soles peruanos)

---

## Idiomas

- Español (por defecto)
- Inglés (opcional)
- Sistema i18n implementado en assets/i18n.js (maqueta)
- Para producción: ver [`08-i18n.md`](../../05-operacion/ecommerce-spec/08-i18n.md)

---

## Reuniones

- **2025-06-10 10:30 am** — Reunión con Pepo

---

## Problemas Resueltos

- [x] Estilos no se cargaban en GitHub Pages: corregido `baseurl`
- [x] Paleta cambiada a "luxury black" (eliminados todos los acentos azules)
- [x] Remote de Git actualizado a: https://github.com/eliasjurado/liquidobodyboard/
- [x] CSS reescrito completo estilo e-commerce profesional (bodyboardshop.com.au)
- [x] Imágenes placeholder WebP creadas para todos los productos
- [x] Prompts documentados para generar imágenes realistas con IA

---

## Pendientes

### Diseño
- [ ] Generar imágenes realistas de productos con IA (ver IMAGE_PROMPTS.md)
- [ ] Reemplazar emojis por iconos Material UI en el HTML
- [ ] Probar en mobile y desktop
- [ ] Revisar y ajustar detalles visuales

### Migración a Producción
- [ ] Crear proyecto Next.js 14 con App Router
- [ ] Configurar Supabase (Postgres + Auth + Storage)
- [ ] Migrar catálogo de productos a BD
- [ ] Implementar carrito con Zustand + persistencia
- [ ] Implementar checkout por WhatsApp
- [ ] Configurar panel admin
- [ ] Deploy a Vercel

---

## Deploy (Maqueta)

### GitHub Pages
```bash
git add .
git commit -m "Luxury black redesign"
git push origin main
```

### Netlify
- Auto-deploy desde el repo de GitHub
- URL: https://liquidobodyboard.netlify.app/

---

## Desarrollo Local (Maqueta)

```bash
# Opción 1: Jekyll (recomendado)
bundle exec jekyll serve
# Abrir http://localhost:4000/liquidobodyboard/

# Opción 2: Servidor estático simple
python3 -m http.server 8080
# Abrir http://localhost:8080
```

---

## Referencias

- Especificaciones técnicas generales: `05-operacion/ecommerce-spec/`
- Proyecto de referencia (Hanna Comida Árabe): `repos/hannacomidaarabe/`
- Guía de propuestas: `05-operacion/guia-propuestas.md`
