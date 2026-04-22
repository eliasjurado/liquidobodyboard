/* ============================================================
   LIQUIDO BODYBOARD — Motor de internacionalización (i18n)
   Idiomas: es (español, defecto) | en (English)

   Fuente de verdad para traductores: data/i18n.csv
   Para agregar un idioma: añadir bloque en `translations` +
   columna correspondiente en data/i18n.csv

   API pública:
     window.t(key, vars?)   → texto traducido (atajo)
     window.I18N.setLang(l) → cambia idioma y re-renderiza
     window.I18N.getLang()  → idioma actual
     window.I18N.applyLang()→ aplica traducciones al DOM
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY  = "liquido_lang";
  var DEFAULT_LANG = "es";

  /* ── Diccionario completo ──────────────────────────────────
     Cada clave debe tener entrada en data/i18n.csv          */
  var translations = {

    /* ─────────────── ESPAÑOL ─────────────────────────────── */
    es: {
      /* Header / Nav */
      "nav.home":         "Inicio",
      "nav.catalog":      "Catálogo",
      "nav.about":        "Nosotros",
      "nav.contact":      "Contacto",
      "nav.whatsapp":     "WhatsApp",
      "nav.aria_cart":    "Abrir carrito",
      "nav.aria_menu":    "Abrir menú",
      "nav.mobile_close": "Cerrar menú",
      "nav.aria_logo":    "Liquido Bodyboard — inicio",
      "lang.toggle":      "EN",
      "lang.aria":        "Cambiar a inglés",

      /* Hero */
      "hero.label":       "🌊 Bodyboard · Lima, Perú",
      "hero.sub":         "Tablas y accesorios de bodyboard para todos los niveles. Directo del mar a tus manos. Compra sin complicaciones por WhatsApp.",
      "hero.cta_catalog": "Ver catálogo",
      "hero.cta_about":   "Nuestra historia",
      "hero.stat1_label": "Calidad verificada",
      "hero.stat2_label": "Productos disponibles",
      "hero.stat3_label": "Envíos a Lima y provincias",
      "hero.img_ph":      "Foto de producto próximamente",

      /* Catálogo — filtros */
      "catalog.title":           "Catálogo",
      "catalog.subtitle":        "Tablas, accesorios y kits para todos los niveles",
      "catalog.filter_search":   "Buscar",
      "catalog.search_ph":       "Nombre o descripción…",
      "catalog.filter_cat":      "Categoría",
      "catalog.cat_all":         "Todas",
      "catalog.filter_badge":    "Nivel",
      "catalog.badge_all":       "Todos",
      "catalog.filter_price":    "Precio máx. (S/)",
      "catalog.price_all":       "Sin límite",
      "catalog.price_50":        "Hasta S/ 50",
      "catalog.price_100":       "Hasta S/ 100",
      "catalog.price_250":       "Hasta S/ 250",
      "catalog.price_400":       "Hasta S/ 400",
      "catalog.filter_sort":     "Ordenar",
      "catalog.sort_default":    "Por defecto",
      "catalog.sort_price_asc":  "Precio: menor a mayor",
      "catalog.sort_price_desc": "Precio: mayor a menor",
      "catalog.sort_name":       "Nombre A–Z",
      "catalog.reset":           "Limpiar filtros",

      /* Catálogo — grilla */
      "catalog.no_results_h3":  "Sin resultados",
      "catalog.no_results_p":   "Intenta ajustar los filtros o",
      "catalog.no_results_btn": "limpia los filtros",
      "catalog.card_view":      "Ver ficha",
      "catalog.card_add":       "+ Añadir",
      "catalog.card_unit":      "/ unidad",
      "catalog.product_single": "producto",
      "catalog.product_plural": "productos",
      "catalog.stock_low":      "¡Últimas {n}!",

      /* Catálogo — chips de filtros activos */
      "catalog.chip_search": "Búsqueda: \"{v}\"",
      "catalog.chip_cat":    "Categoría: {v}",
      "catalog.chip_badge":  "Nivel: {v}",
      "catalog.chip_price":  "Hasta S/ {v}",
      "catalog.chip_sort":   "Orden: {v}",

      /* Categorías y badges (para mostrar traducidos) */
      "cat.Bodyboards":   "Bodyboards",
      "cat.Accesorios":   "Accesorios",
      "cat.Kits":         "Kits",
      "badge.Pro":        "Pro",
      "badge.Iniciación": "Iniciación",
      "badge.Pack":       "Pack",
      "badge.Accesorio":  "Accesorio",

      /* Sobre nosotros */
      "about.h2_html": "Nacimos <span>del mar</span>",
      "about.p1":  "Liquido Bodyboard nació con una misión simple: acercar tablas y accesorios de calidad a los riders peruanos, sin intermediarios ni precios inflados.",
      "about.p2":  "Somos apasionados del bodyboard y conocemos las olas del Pacífico como nadie. Por eso seleccionamos cada producto pensando en lo que realmente necesitas para surfear mejor, desde tus primeras olas hasta las más exigentes.",
      "about.p3":  "Atendemos por WhatsApp para que tu compra sea directa, personalizada y sin complicaciones. Te asesoramos en la elección de tu tabla según tu peso, estatura y nivel.",
      "about.cta": "Consúltanos por WhatsApp",
      "about.img_alt": "Rider de bodyboard en ola peruana",

      /* Valores */
      "values.label":    "Por qué elegirnos",
      "values.h2":       "Calidad, pasión y servicio",
      "values.sub":      "Todo lo que necesitas para tus sesiones de bodyboard, con la garantía de quienes viven el mar.",
      "values.v1_title": "Conocemos las olas",
      "values.v1_desc":  "Somos riders activos. Probamos y seleccionamos cada producto en las olas del Pacífico peruano.",
      "values.v2_title": "Atención directa",
      "values.v2_desc":  "Sin formularios ni esperas. Te atendemos personalmente por WhatsApp y te asesoramos en tu compra.",
      "values.v3_title": "Envíos a todo el Perú",
      "values.v3_desc":  "Despachamos a Lima y provincias. Coordina el envío directamente con nosotros al hacer tu pedido.",
      "values.v4_title": "Garantía de calidad",
      "values.v4_desc":  "Todos nuestros productos pasan por un control de calidad. Si algo falla, lo resolvemos.",

      /* Contacto */
      "contact.h2":         "Hablemos",
      "contact.sub":        "¿Tienes dudas sobre qué tabla elegir? ¿Quieres hacer un pedido? Escríbenos.",
      "contact.whatsapp":   "WhatsApp",
      "contact.location":   "Ubicación",
      "contact.instagram":  "Instagram",
      "contact.cta_h3":     "¿Listo para surfear?",
      "contact.cta_p":      "Escríbenos por WhatsApp para coordinar tu pedido, consultar disponibilidad o pedir asesoría personalizada para elegir tu tabla ideal.",
      "contact.cta_btn":    "Escribir por WhatsApp",

      /* Footer */
      "footer.brand_p":    "Tablas y accesorios de bodyboard para todos los niveles. Compra directo por WhatsApp desde Lima, Perú.",
      "footer.nav_title":  "Navegar",
      "footer.help_title": "Ayuda",
      "footer.help_sizes": "Guía de tallas",
      "footer.help_ship":  "Envíos",
      "footer.copyright":  "© 2026 Liquido Bodyboard · Lima, Perú",
      "footer.tagline":    "Hecho con pasión por el bodyboard 🌊",

      /* Carrito */
      "cart.title":       "Tu carrito",
      "cart.empty":       "Tu carrito está vacío.<br>Añade un producto para empezar.",
      "cart.total":       "Total",
      "cart.checkout":    "Pedir por WhatsApp",
      "cart.close":       "Cerrar carrito",
      "cart.each":        "c/u",
      "cart.toast_added": "añadido al carrito",
      "cart.toast_empty": "Tu carrito está vacío",
      "cart.reduce":      "Reducir cantidad",
      "cart.increase":    "Aumentar cantidad",
      "cart.remove":      "Eliminar producto",

      /* Ficha de producto (PDP) */
      "pdp.not_found_h2":       "Producto no encontrado",
      "pdp.not_found_p":        "El producto que buscas no existe o fue eliminado.",
      "pdp.not_found_btn":      "Ver catálogo",
      "pdp.breadcrumb_home":    "Inicio",
      "pdp.breadcrumb_catalog": "Catálogo",
      "pdp.qty_label":   "Cantidad",
      "pdp.qty_dec":     "Reducir cantidad",
      "pdp.qty_inc":     "Aumentar cantidad",
      "pdp.buy_now":     "Comprar por WhatsApp",
      "pdp.add_cart":    "Añadir al carrito",
      "pdp.trust1":      "🌊 Calidad de playa",
      "pdp.trust2":      "🚚 Envío a Lima y provincias",
      "pdp.trust3":      "✔ Garantía Liquido",
      "pdp.tab_desc":    "Descripción",
      "pdp.tab_specs":   "Especificaciones",
      "pdp.tab_notes":   "Notas",
      "pdp.related":     "También te puede interesar",
      "pdp.related_view":"Ver ficha",
      "pdp.related_add": "Añadir",
      "pdp.stock":       "Stock",
      "pdp.weight":      "Peso",
      "pdp.units":       "uds.",

      /* Mensajes de WhatsApp */
      "wa.order_title":    "PEDIDO {store} — {tagline}",
      "wa.consult_title":  "CONSULTA DE COMPRA — {store}",
      "wa.ref":            "Referencia",
      "wa.date_label":     "Fecha",
      "wa.greeting":       "Hola {store} 👋",
      "wa.confirm_order":  "Quisiera confirmar el siguiente pedido:",
      "wa.interest":       "Me interesa adquirir el siguiente producto:",
      "wa.order_detail":   "DETALLE DEL PEDIDO",
      "wa.product_label":  "Producto",
      "wa.qty":            "Cantidad",
      "wa.unit_price":     "Precio unitario",
      "wa.subtotal":       "Subtotal",
      "wa.total_products": "Productos distintos",
      "wa.total_units":    "Unidades totales",
      "wa.total_pay":      "TOTAL A PAGAR",
      "wa.how_receive":    "¿Cómo deseo recibirlo?",
      "wa.pickup":         "Recojo en persona ({location})",
      "wa.delivery":       "Envío a mi domicilio",
      "wa.payment_method": "Método de pago preferido:",
      "wa.yape":           "Yape / Plin",
      "wa.transfer":       "Transferencia bancaria",
      "wa.cash":           "Efectivo contra entrega",
      "wa.confirm_q":      "¿Me confirmas disponibilidad y tiempos de entrega? 🙏",
      "wa.available_q":    "¿Está disponible para coordinar? 🙏",
      "wa.ud":             "ud.",
      "wa.uds":            "uds.",
    },

    /* ─────────────── ENGLISH ─────────────────────────────── */
    en: {
      /* Header / Nav */
      "nav.home":         "Home",
      "nav.catalog":      "Catalog",
      "nav.about":        "About",
      "nav.contact":      "Contact",
      "nav.whatsapp":     "WhatsApp",
      "nav.aria_cart":    "Open cart",
      "nav.aria_menu":    "Open menu",
      "nav.mobile_close": "Close menu",
      "nav.aria_logo":    "Liquido Bodyboard — home",
      "lang.toggle":      "ES",
      "lang.aria":        "Switch to Spanish",

      /* Hero */
      "hero.label":       "🌊 Bodyboard · Lima, Peru",
      "hero.sub":         "Bodyboard boards and accessories for all skill levels. Straight from the ocean to your hands. Shop hassle-free via WhatsApp.",
      "hero.cta_catalog": "Browse catalog",
      "hero.cta_about":   "Our story",
      "hero.stat1_label": "Verified quality",
      "hero.stat2_label": "Products available",
      "hero.stat3_label": "Shipping to Lima & beyond",
      "hero.img_ph":      "Product photo coming soon",

      /* Catalog — filters */
      "catalog.title":           "Catalog",
      "catalog.subtitle":        "Boards, accessories and kits for all levels",
      "catalog.filter_search":   "Search",
      "catalog.search_ph":       "Name or description…",
      "catalog.filter_cat":      "Category",
      "catalog.cat_all":         "All",
      "catalog.filter_badge":    "Level",
      "catalog.badge_all":       "All",
      "catalog.filter_price":    "Max price (S/)",
      "catalog.price_all":       "No limit",
      "catalog.price_50":        "Up to S/ 50",
      "catalog.price_100":       "Up to S/ 100",
      "catalog.price_250":       "Up to S/ 250",
      "catalog.price_400":       "Up to S/ 400",
      "catalog.filter_sort":     "Sort",
      "catalog.sort_default":    "Default",
      "catalog.sort_price_asc":  "Price: low to high",
      "catalog.sort_price_desc": "Price: high to low",
      "catalog.sort_name":       "Name A–Z",
      "catalog.reset":           "Clear filters",

      /* Catalog — grid */
      "catalog.no_results_h3":  "No results",
      "catalog.no_results_p":   "Try adjusting the filters or",
      "catalog.no_results_btn": "clear filters",
      "catalog.card_view":      "View details",
      "catalog.card_add":       "+ Add",
      "catalog.card_unit":      "/ unit",
      "catalog.product_single": "product",
      "catalog.product_plural": "products",
      "catalog.stock_low":      "Only {n} left!",

      /* Catalog — active filter chips */
      "catalog.chip_search": "Search: \"{v}\"",
      "catalog.chip_cat":    "Category: {v}",
      "catalog.chip_badge":  "Level: {v}",
      "catalog.chip_price":  "Up to S/ {v}",
      "catalog.chip_sort":   "Sort: {v}",

      /* Categories & badges */
      "cat.Bodyboards":   "Bodyboards",
      "cat.Accesorios":   "Accessories",
      "cat.Kits":         "Kits",
      "badge.Pro":        "Pro",
      "badge.Iniciación": "Beginner",
      "badge.Pack":       "Pack",
      "badge.Accesorio":  "Accessory",

      /* About */
      "about.h2_html": "We were <span>born from the sea</span>",
      "about.p1":  "Liquido Bodyboard was born with a simple mission: bring quality boards and accessories to Peruvian riders, without middlemen or inflated prices.",
      "about.p2":  "We are passionate bodyboarders and we know the Pacific waves like no one else. That's why we select every product thinking about what you really need to surf better, from your first waves to the most demanding ones.",
      "about.p3":  "We serve you via WhatsApp so your purchase is direct, personalized and hassle-free. We advise you on choosing your board based on your weight, height and skill level.",
      "about.cta": "Ask us on WhatsApp",
      "about.img_alt": "Bodyboard rider on a Peruvian wave",

      /* Values */
      "values.label":    "Why choose us",
      "values.h2":       "Quality, passion and service",
      "values.sub":      "Everything you need for your bodyboard sessions, backed by people who live for the ocean.",
      "values.v1_title": "We know the waves",
      "values.v1_desc":  "We are active riders. We test and select every product in the waves of the Peruvian Pacific.",
      "values.v2_title": "Direct support",
      "values.v2_desc":  "No forms or waiting. We personally attend you via WhatsApp and advise you on your purchase.",
      "values.v3_title": "Shipping nationwide",
      "values.v3_desc":  "We ship to Lima and the provinces. Coordinate delivery directly with us when you place your order.",
      "values.v4_title": "Quality guarantee",
      "values.v4_desc":  "All our products go through quality control. If something fails, we fix it.",

      /* Contact */
      "contact.h2":        "Let's talk",
      "contact.sub":       "Questions about which board to choose? Want to place an order? Write to us.",
      "contact.whatsapp":  "WhatsApp",
      "contact.location":  "Location",
      "contact.instagram": "Instagram",
      "contact.cta_h3":    "Ready to surf?",
      "contact.cta_p":     "Write to us on WhatsApp to coordinate your order, check availability, or get personalized advice on your ideal board.",
      "contact.cta_btn":   "Message on WhatsApp",

      /* Footer */
      "footer.brand_p":    "Bodyboard boards and accessories for all levels. Shop directly via WhatsApp from Lima, Peru.",
      "footer.nav_title":  "Navigate",
      "footer.help_title": "Help",
      "footer.help_sizes": "Size guide",
      "footer.help_ship":  "Shipping",
      "footer.copyright":  "© 2026 Liquido Bodyboard · Lima, Peru",
      "footer.tagline":    "Made with passion for bodyboarding 🌊",

      /* Cart */
      "cart.title":       "Your cart",
      "cart.empty":       "Your cart is empty.<br>Add a product to get started.",
      "cart.total":       "Total",
      "cart.checkout":    "Order on WhatsApp",
      "cart.close":       "Close cart",
      "cart.each":        "each",
      "cart.toast_added": "added to cart",
      "cart.toast_empty": "Your cart is empty",
      "cart.reduce":      "Decrease quantity",
      "cart.increase":    "Increase quantity",
      "cart.remove":      "Remove product",

      /* PDP */
      "pdp.not_found_h2":       "Product not found",
      "pdp.not_found_p":        "The product you are looking for doesn't exist or was removed.",
      "pdp.not_found_btn":      "View catalog",
      "pdp.breadcrumb_home":    "Home",
      "pdp.breadcrumb_catalog": "Catalog",
      "pdp.qty_label":   "Quantity",
      "pdp.qty_dec":     "Decrease quantity",
      "pdp.qty_inc":     "Increase quantity",
      "pdp.buy_now":     "Buy on WhatsApp",
      "pdp.add_cart":    "Add to cart",
      "pdp.trust1":      "🌊 Surf-tested quality",
      "pdp.trust2":      "🚚 Shipping to Lima & beyond",
      "pdp.trust3":      "✔ Liquido guarantee",
      "pdp.tab_desc":    "Description",
      "pdp.tab_specs":   "Specifications",
      "pdp.tab_notes":   "Notes",
      "pdp.related":     "You might also like",
      "pdp.related_view":"View details",
      "pdp.related_add": "Add",
      "pdp.stock":       "Stock",
      "pdp.weight":      "Weight",
      "pdp.units":       "units",

      /* WhatsApp messages */
      "wa.order_title":    "ORDER {store} — {tagline}",
      "wa.consult_title":  "PURCHASE INQUIRY — {store}",
      "wa.ref":            "Reference",
      "wa.date_label":     "Date",
      "wa.greeting":       "Hello {store} 👋",
      "wa.confirm_order":  "I'd like to confirm the following order:",
      "wa.interest":       "I'm interested in purchasing the following product:",
      "wa.order_detail":   "ORDER DETAILS",
      "wa.product_label":  "Product",
      "wa.qty":            "Quantity",
      "wa.unit_price":     "Unit price",
      "wa.subtotal":       "Subtotal",
      "wa.total_products": "Different products",
      "wa.total_units":    "Total units",
      "wa.total_pay":      "TOTAL TO PAY",
      "wa.how_receive":    "How would I like to receive it?",
      "wa.pickup":         "Pick up in person ({location})",
      "wa.delivery":       "Home delivery",
      "wa.payment_method": "Preferred payment method:",
      "wa.yape":           "Yape / Plin",
      "wa.transfer":       "Bank transfer",
      "wa.cash":           "Cash on delivery",
      "wa.confirm_q":      "Can you confirm availability and delivery times? 🙏",
      "wa.available_q":    "Are you available to coordinate? 🙏",
      "wa.ud":             "unit",
      "wa.uds":            "units",
    }
  };

  /* ── Estado ──────────────────────────────────────────────── */
  var _lang;
  try { _lang = localStorage.getItem(STORAGE_KEY); } catch (_) {}
  _lang = (_lang && translations[_lang]) ? _lang : DEFAULT_LANG;

  /* ── Funciones públicas ───────────────────────────────────── */

  /** Devuelve el texto traducido para la clave `key`.
   *  `vars` es un objeto con sustituciones {placeholder: valor}. */
  function t(key, vars) {
    var str = (translations[_lang]        && translations[_lang][key])
           || (translations[DEFAULT_LANG] && translations[DEFAULT_LANG][key])
           || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      });
    }
    return str;
  }

  function getLang() { return _lang; }

  /** Cambia el idioma activo, actualiza el DOM y notifica a los módulos. */
  function setLang(newLang) {
    if (!translations[newLang] || newLang === _lang) return;
    _lang = newLang;
    try { localStorage.setItem(STORAGE_KEY, _lang); } catch (_) {}
    document.documentElement.lang = _lang;
    applyLang();
    /* Notifica a cart.js, detail.js y al catálogo inline */
    window.dispatchEvent(new CustomEvent("liquido:langchange"));
  }

  /** Recorre el DOM y aplica las traducciones según atributos data-i18n* */
  function applyLang() {
    /* textContent */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    /* innerHTML (solo para elementos con marcado interno como <span>) */
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    /* placeholder */
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
    /* aria-label */
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    /* alt */
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
    });
    /* Actualizar texto del botón de idioma */
    var btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.textContent = t("lang.toggle");
      btn.setAttribute("aria-label", t("lang.aria"));
    }
  }

  /* ── Exposición global ───────────────────────────────────── */
  window.I18N = {
    t:         t,
    getLang:   getLang,
    setLang:   setLang,
    applyLang: applyLang,
    supported: Object.keys(translations)
  };
  window.t = t;   /* atajo global: window.t("clave") */

  /* ── Inicialización ──────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.lang = _lang;
    applyLang();

    /* Botón de cambio de idioma (en header) */
    var btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        setLang(_lang === "es" ? "en" : "es");
      });
    }
  });
})();
