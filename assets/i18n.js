/* ============================================================
   LIQUIDO BODYBOARD — i18n (solo español)
   API: window.t(key, vars?), window.I18N.applyLang()
   ============================================================ */
(function () {
  "use strict";

  var translations = {
    es: {
      "nav.home":         "Inicio",
      "nav.catalog":      "Catálogo",
      "nav.about":        "Nosotros",
      "nav.contact":      "Contacto",
      "nav.whatsapp":     "WhatsApp",
      "nav.aria_cart":    "Abrir carrito",
      "nav.aria_menu":    "Abrir menú",
      "nav.mobile_close": "Cerrar menú",
      "nav.aria_logo":    "Liquido Bodyboard — inicio",

      "hero.label":       "Bodyboard · Lima, Perú",
      "hero.sub":         "Tablas y accesorios de bodyboard para todos los niveles. Directo del mar a tus manos. Compra sin complicaciones por WhatsApp.",
      "hero.cta_catalog": "Ver catálogo",
      "hero.cta_about":   "Nuestra historia",

      "catalog.title":         "Catálogo",
      "catalog.filter_search": "Buscar",
      "catalog.filter_cat":    "Categoría",
      "catalog.filter_badge":  "Nivel",
      "catalog.filter_sort":   "Ordenar",

      "about.h2_html": "Nacimos del mar",
      "about.p1":  "Liquido Bodyboard nació con una misión simple: acercar tablas y accesorios de calidad a los riders peruanos, sin intermediarios ni precios inflados.",
      "about.p2":  "Somos apasionados del bodyboard y conocemos las olas del Pacífico como nadie. Por eso seleccionamos cada producto pensando en lo que realmente necesitas para surfear mejor, desde tus primeras olas hasta las más exigentes.",
      "about.p3":  "Atendemos por WhatsApp para que tu compra sea directa, personalizada y sin complicaciones. Te asesoramos en la elección de tu tabla según tu peso, estatura y nivel.",
      "about.cta": "Consúltanos por WhatsApp",

      "values.label":    "Por qué elegirnos",
      "values.sub":      "Todo lo que necesitas para tus sesiones de bodyboard, con la garantía de quienes viven el mar.",
      "values.v1_title": "Conocemos las olas",
      "values.v1_desc":  "Somos riders activos. Probamos y seleccionamos cada producto en las olas del Pacífico peruano.",
      "values.v2_title": "Atención directa",
      "values.v2_desc":  "Sin formularios ni esperas. Te atendemos personalmente por WhatsApp y te asesoramos en tu compra.",
      "values.v3_title": "Envíos a todo el Perú",
      "values.v3_desc":  "Despachamos a Lima y provincias. Coordina el envío directamente con nosotros al hacer tu pedido.",
      "values.v4_title": "Garantía de calidad",
      "values.v4_desc":  "Todos nuestros productos pasan por un control de calidad. Si algo falla, lo resolvemos.",

      "contact.h2":      "Hablemos",
      "contact.sub":     "¿Tienes dudas sobre qué tabla elegir? ¿Quieres hacer un pedido? Escríbenos.",
      "contact.whatsapp":   "WhatsApp",
      "contact.location":   "Ubicación",
      "contact.instagram":  "Instagram",
      "contact.cta_h3":    "¿Listo para surfear?",
      "contact.cta_p":     "Escríbenos por WhatsApp para coordinar tu pedido, consultar disponibilidad o pedir asesoría personalizada para elegir tu tabla ideal.",
      "contact.cta_btn":   "Escribir por WhatsApp",

      "footer.brand_p":   "Tablas y accesorios de bodyboard para todos los niveles. Compra directo por WhatsApp desde Lima, Perú.",
      "footer.nav_title": "Navegar",
      "footer.help_title":"Ayuda",
      "footer.help_sizes":"Guía de tallas",
      "footer.help_ship": "Envíos",
      "footer.copyright": "© 2026 Liquido Bodyboard · Lima, Perú",
      "footer.tagline":   "Hecho con pasión por el bodyboard",

      "cart.title":       "Tu carrito",
      "cart.empty":       "Tu carrito está vacío. Añade un producto para empezar.",
      "cart.total":       "Total",
      "cart.checkout":    "Pedir por WhatsApp",
      "cart.close":       "Cerrar carrito",
      "cart.each":        "c/u",
      "cart.toast_added": "añadido al carrito",
      "cart.toast_empty": "Tu carrito está vacío",
      "cart.reduce":      "Reducir cantidad",
      "cart.increase":    "Aumentar cantidad",
      "cart.remove":      "Eliminar producto",

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
      "pdp.trust1":      "Calidad de playa",
      "pdp.trust2":      "Envío a Lima y provincias",
      "pdp.trust3":      "Garantía Liquido",
      "pdp.tab_desc":    "Descripción",
      "pdp.tab_specs":   "Especificaciones",
      "pdp.tab_notes":   "Notas",
      "pdp.related":     "También te puede interesar",
      "pdp.stock":       "Stock",
      "pdp.weight":      "Peso",
      "pdp.units":       "uds.",

      "wa.order_title":    "PEDIDO {store} — {tagline}",
      "wa.consult_title":  "CONSULTA DE COMPRA — {store}",
      "wa.ref":            "Referencia",
      "wa.date_label":     "Fecha",
      "wa.greeting":       "Hola {store}",
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
      "wa.confirm_q":      "¿Me confirmas disponibilidad y tiempos de entrega?",
      "wa.available_q":    "¿Está disponible para coordinar?",
      "wa.ud":             "ud.",
      "wa.uds":            "uds.",
    }
  };

  function t(key, vars) {
    var str = translations.es[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      });
    }
    return str;
  }

  function applyLang() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
    });
  }

  window.I18N = { t: t, applyLang: applyLang };
  window.t = t;

  document.addEventListener("DOMContentLoaded", applyLang);
})();
