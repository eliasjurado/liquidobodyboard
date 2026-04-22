# Liquido Bodyboard — E-commerce por WhatsApp

SPA estática de comercio directo por WhatsApp para **Liquido Bodyboard** (Lima, Perú).

## Stack

- HTML5 + CSS3 + JavaScript ES6+ vanilla (sin npm, sin build)
- Google Fonts: Bebas Neue + Inter
- Deploy automático a GitHub Pages

## Estructura

```
.
├── index.html                  # Home: hero, catálogo con filtros, nosotros, valores, contacto
├── producto/
│   └── <slug>.html             # Ficha de cada producto (10 páginas)
├── assets/
│   ├── styles.css              # Todos los estilos (mobile-first)
│   ├── products.js             # window.PRODUCTS — fuente de verdad del catálogo
│   ├── cart.js                 # Carrito con localStorage + checkout WhatsApp
│   └── detail.js               # Render de ficha de producto
├── img/
│   └── (coloca aquí las fotos: 1.webp … 10.webp)
├── data/
│   ├── productos.csv           # Catálogo de productos en CSV
│   └── sitio.csv               # Variables generales del sitio
└── .github/workflows/pages.yml
```

## Ejecutar en local

```bash
python3 -m http.server 8080
# Abrir http://localhost:8080
```

## Imágenes

Las imágenes de producto deben ir en `/img/` con el formato:

| Archivo         | Descripción                     |
|-----------------|---------------------------------|
| `1.webp`        | Foto principal producto ID 1    |
| `1-2.webp`      | Segunda foto producto ID 1      |
| `…`             | Hasta `<id>-6.webp` por producto|
| `about.webp`    | Foto sección "Sobre nosotros"   |

El sitio detecta automáticamente qué imágenes existen (sin huecos de 404).

## Catálogo de productos (mockup de precios)

Ver [data/productos.csv](data/productos.csv) para el detalle completo.

| ID | Producto                  | Categoría   | Precio (S/) |
|----|---------------------------|-------------|-------------|
| 1  | Liquido Pro PP 42"        | Bodyboards  | 380         |
| 2  | Liquido Pro PP 41"        | Bodyboards  | 360         |
| 3  | Liquido Pro PP 40"        | Bodyboards  | 340         |
| 4  | Liquido Entry PE 42"      | Bodyboards  | 220         |
| 5  | Liquido Entry PE 41"      | Bodyboards  | 200         |
| 6  | Leash de Muñeca Liquido   | Accesorios  | 45          |
| 7  | Leash de Bícep Liquido    | Accesorios  | 55          |
| 8  | Wax Frío Liquido          | Accesorios  | 15          |
| 9  | Wax Templado Liquido      | Accesorios  | 15          |
| 10 | Kit de Iniciación Liquido | Kits        | 270         |

> **Nota:** Los precios son valores de referencia mockeados — actualízalos en `assets/products.js`.

## Variables del sitio

Ver [data/sitio.csv](data/sitio.csv).

## WhatsApp

Número: **+51 951 954 781** (`51951954781`)

El mensaje de pedido incluye referencia `R-YYMMDD-XXXX`, detalle de productos, subtotales, total y opciones de pago/entrega.

## Deploy a GitHub Pages

1. Crea el repositorio `liquidobodyboard` en GitHub.
2. `git push origin main`
3. En **Settings → Pages**, selecciona **GitHub Actions** como fuente.
4. El workflow `.github/workflows/pages.yml` desplegará automáticamente.
