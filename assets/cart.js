/* ============================================================
   LIQUIDO BODYBOARD — Carrito con localStorage + checkout WhatsApp
   Expone: window.Cart = { add, open, close, render, count,
           load, save, buyNow, buildProductMessage, buildCheckoutMessage }
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Constantes ---------- */
  const STORAGE_KEY = "liquido-bodyboard_cart_v1";
  const SYMBOL      = "S/";
  const WA_NUMBER   = window.WHATSAPP_NUMBER || "51954781873";
  const STORE_NAME  = window.STORE_NAME      || "Liquido Bodyboard";
  const STORE_UPPER = "LIQUIDO BODYBOARD";
  const TAGLINE     = window.STORE_TAGLINE   || "Ride the Wave. Feel the Rush.";
  const LOCATION    = window.STORE_LOCATION  || "Lima, Perú";
  // Prefijo de ruta de imágenes (distinto en páginas de producto)
  const IMG_PREFIX  = location.pathname.includes("/producto/") ? "../" : "";

  /* ---------- Estado ---------- */
  let cart = [];   // [{ product, qty }]

  /* ---------- Persistencia ---------- */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) cart = JSON.parse(raw);
    } catch (_) { cart = []; }
    renderBadge();
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
    catch (_) {}
  }

  /* ---------- Referencia de pedido ---------- */
  function makeOrderRef() {
    const d   = new Date();
    const ymd = String(d.getFullYear()).slice(2)
      + String(d.getMonth() + 1).padStart(2, "0")
      + String(d.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `R-${ymd}-${rand}`;
  }

  /* ---------- Operaciones del carrito ---------- */
  function add(id, qty) {
    qty = parseInt(qty, 10) || 1;
    const product = (window.PRODUCTS || []).find((p) => p.id === id);
    if (!product) return;

    const existing = cart.find((i) => i.product.id === id);
    if (existing) {
      const newQty = existing.qty + qty;
      existing.qty = Math.min(newQty, product.stock || 99);
    } else {
      cart.push({ product, qty: Math.min(qty, product.stock || 99) });
    }
    save();
    render();
    renderBadge();
    showToast(`✔ ${product.nombre} ${(window.t || function(k){return k;})("cart.toast_added")}`);
  }

  function remove(id) {
    cart = cart.filter((i) => i.product.id !== id);
    save(); render(); renderBadge();
  }

  function updateQty(id, delta) {
    const item = cart.find((i) => i.product.id === id);
    if (!item) return;
    item.qty = Math.max(1, Math.min(item.qty + delta, item.product.stock || 99));
    save(); render(); renderBadge();
  }

  function count() {
    return cart.reduce((s, i) => s + i.qty, 0);
  }

  function total() {
    return cart.reduce((s, i) => s + i.product.precio * i.qty, 0);
  }

  /* ---------- Mensaje de WhatsApp ---------- */
  function fmt(n) {
    return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function buildCheckoutMessage() {
    const _t  = window.t || function(k) { return k; };
    const ref  = makeOrderRef();
    const lang = window.I18N ? window.I18N.getLang() : "es";
    const locale = lang === "en" ? "en-US" : "es-PE";
    const now  = new Date().toLocaleString(locale, { dateStyle: "long", timeStyle: "short" });
    const sep  = "━━━━━━━━━━━━━━━━━━━━━";

    let lines = [];
    lines.push(`*${_t("wa.order_title", { store: STORE_UPPER, tagline: TAGLINE })}*`);
    lines.push(sep);
    lines.push(`${_t("wa.ref")}: *${ref}*`);
    lines.push(`${_t("wa.date_label")}: ${now}`);
    lines.push(``);
    lines.push(_t("wa.greeting", { store: STORE_NAME }));
    lines.push(_t("wa.confirm_order"));
    lines.push(``);
    lines.push(sep);
    lines.push(`*${_t("wa.order_detail")}*`);
    lines.push(sep);

    let totalUnits = 0;
    cart.forEach((item, idx) => {
      const sub = item.product.precio * item.qty;
      totalUnits += item.qty;
      lines.push(``);
      lines.push(`${idx + 1}) *${item.product.nombre}*`);
      lines.push(`   · ${_t("wa.qty")}: ${item.qty} ${item.qty === 1 ? _t("wa.ud") : _t("wa.uds")}`);
      lines.push(`   · ${_t("wa.unit_price")}: ${SYMBOL} ${fmt(item.product.precio)}`);
      lines.push(`   · ${_t("wa.subtotal")}: *${SYMBOL} ${fmt(sub)}*`);
    });

    lines.push(``);
    lines.push(sep);
    lines.push(`${_t("wa.total_products")}: *${cart.length}*`);
    lines.push(`${_t("wa.total_units")}: *${totalUnits}*`);
    lines.push(``);
    lines.push(`*${_t("wa.total_pay")}: ${SYMBOL} ${fmt(total())}*`);
    lines.push(sep);
    lines.push(``);
    lines.push(`*${_t("wa.how_receive")}*`);
    lines.push(`· ${_t("wa.pickup", { location: LOCATION })}`);
    lines.push(`· ${_t("wa.delivery")}`);
    lines.push(``);
    lines.push(`*${_t("wa.payment_method")}*`);
    lines.push(`· ${_t("wa.yape")}`);
    lines.push(`· ${_t("wa.transfer")}`);
    lines.push(`· ${_t("wa.cash")}`);
    lines.push(``);
    lines.push(_t("wa.confirm_q"));

    return lines.join("\n");
  }

  function buildProductMessage(product, qty) {
    const _t  = window.t || function(k) { return k; };
    const ref  = makeOrderRef();
    const lang = window.I18N ? window.I18N.getLang() : "es";
    const locale = lang === "en" ? "en-US" : "es-PE";
    const now  = new Date().toLocaleString(locale, { dateStyle: "long", timeStyle: "short" });
    const sep  = "━━━━━━━━━━━━━━━━━━━━━";
    const sub  = product.precio * qty;

    let lines = [];
    lines.push(`*${_t("wa.consult_title", { store: STORE_NAME })}*`);
    lines.push(sep);
    lines.push(`${_t("wa.ref")}: *${ref}*`);
    lines.push(`${_t("wa.date_label")}: ${now}`);
    lines.push(``);
    lines.push(_t("wa.greeting", { store: STORE_NAME }));
    lines.push(_t("wa.interest"));
    lines.push(``);
    lines.push(sep);
    lines.push(`*${_t("wa.order_detail")}*`);
    lines.push(sep);
    lines.push(``);
    lines.push(`· ${_t("wa.product_label")}: *${product.nombre}*`);
    lines.push(`· ${_t("wa.qty")}: ${qty} ${qty === 1 ? _t("wa.ud") : _t("wa.uds")}`);
    lines.push(`· ${_t("wa.unit_price")}: ${SYMBOL} ${fmt(product.precio)}`);
    lines.push(`· ${_t("wa.subtotal")}: *${SYMBOL} ${fmt(sub)}*`);
    lines.push(``);
    lines.push(sep);
    lines.push(`*${_t("wa.total_pay")}: ${SYMBOL} ${fmt(sub)}*`);
    lines.push(sep);
    lines.push(``);
    lines.push(`*${_t("wa.how_receive")}*`);
    lines.push(`· ${_t("wa.pickup", { location: LOCATION })}`);
    lines.push(`· ${_t("wa.delivery")}`);
    lines.push(``);
    lines.push(`*${_t("wa.payment_method")}*`);
    lines.push(`· ${_t("wa.yape")}`);
    lines.push(`· ${_t("wa.transfer")}`);
    lines.push(`· ${_t("wa.cash")}`);
    lines.push(``);
    lines.push(_t("wa.available_q"));

    return lines.join("\n");
  }

  function buyNow(product, qty) {
    const text = encodeURIComponent(buildProductMessage(product, qty));
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener");
  }

  function checkoutWhatsApp() {
    if (cart.length === 0) { showToast((window.t || function(k){return k;})("cart.toast_empty"), "error"); return; }
    const text = encodeURIComponent(buildCheckoutMessage());
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener");
  }

  /* ---------- Renderizado del drawer ---------- */
  function ensureDrawer() {
    if (document.getElementById("cartDrawer")) return;

    const overlay = document.createElement("div");
    overlay.className = "cart-overlay"; overlay.id = "cartOverlay";
    overlay.addEventListener("click", close);

    const drawer = document.createElement("div");
    drawer.className = "cart-drawer"; drawer.id = "cartDrawer";
    drawer.innerHTML = `
      <div class="cart-drawer-header">
        <h3 data-i18n="cart.title">${(window.t||function(k){return k;})("cart.title")}</h3>
        <button class="cart-close" id="cartCloseBtn" data-i18n-aria="cart.close" aria-label="${(window.t||function(k){return k;})("cart.close")}">✕</button>
      </div>
      <div class="cart-items" id="cartItems"></div>
      <div class="cart-drawer-footer" id="cartFooter" style="display:none">
        <div class="cart-total">
          <span data-i18n="cart.total">${(window.t||function(k){return k;})("cart.total")}</span>
          <span id="cartTotal"></span>
        </div>
        <button class="btn btn-whatsapp cart-checkout-btn" id="cartCheckoutBtn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span data-i18n="cart.checkout">${(window.t||function(k){return k;})("cart.checkout")}</span>
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.getElementById("cartCloseBtn").addEventListener("click", close);
    document.getElementById("cartCheckoutBtn").addEventListener("click", checkoutWhatsApp);
  }

  function render() {
    ensureDrawer();
    const container = document.getElementById("cartItems");
    const footer    = document.getElementById("cartFooter");
    const totalEl   = document.getElementById("cartTotal");
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <p>${(window.t||function(k){return k;})("cart.empty")}</p>
        </div>`;
      if (footer) footer.style.display = "none";
      return;
    }

    if (footer) footer.style.display = "block";
    if (totalEl) totalEl.textContent = `${SYMBOL} ${total().toFixed(2)}`;

    container.innerHTML = cart.map((item) => {
      const imgSrc = `${IMG_PREFIX}img/${item.product.id}.webp`;
      return `
        <div class="cart-item" data-id="${item.product.id}">
          <img class="cart-item-img" src="${imgSrc}" alt="${item.product.nombre}"
               onerror="this.style.background='#e8e8e8';this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2272%22 height=%2272%22%3E%3Crect width=%2272%22 height=%2272%22 fill=%22%23e8e8e8%22/%3E%3Ctext x=%2250%25%22 y=%2255%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2224%22%3E🏄%3C/text%3E%3C/svg%3E'">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.product.nombre}</div>
            <div class="cart-item-price">${SYMBOL} ${item.product.precio.toFixed(2)} ${(window.t||function(k){return k;})("cart.each")}</div>
            <div class="cart-item-controls">
              <button class="qty-btn" data-action="dec" data-id="${item.product.id}" aria-label="${(window.t||function(k){return k;})("cart.reduce")}">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" data-action="inc" data-id="${item.product.id}" aria-label="${(window.t||function(k){return k;})("cart.increase")}">+</button>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:12px">
            <span class="cart-item-subtotal">${SYMBOL} ${(item.product.precio * item.qty).toFixed(2)}</span>
            <button class="remove-item" data-id="${item.product.id}" aria-label="${(window.t||function(k){return k;})("cart.remove")}">✕</button>
          </div>
        </div>`;
    }).join("");

    // Eventos de controles
    container.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id    = parseInt(btn.dataset.id, 10);
        const delta = btn.dataset.action === "inc" ? 1 : -1;
        updateQty(id, delta);
      });
    });
    container.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", () => remove(parseInt(btn.dataset.id, 10)));
    });
  }

  function renderBadge() {
    document.querySelectorAll(".cart-badge").forEach((el) => {
      const n = count();
      el.textContent = n;
      el.style.display = n === 0 ? "none" : "flex";
    });
  }

  /* ---------- Abrir / cerrar ---------- */
  function open() {
    ensureDrawer();
    render();
    document.getElementById("cartOverlay")?.classList.add("open");
    document.getElementById("cartDrawer")?.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    document.getElementById("cartOverlay")?.classList.remove("open");
    document.getElementById("cartDrawer")?.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ---------- Toast ---------- */
  function showToast(msg, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container"; container.id = "toastContainer";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  /* ---------- Inicialización ---------- */
  load();

  // Conectar botones del carrito que ya existan en el DOM
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-cart-open]").forEach((el) =>
      el.addEventListener("click", open)
    );
    // Botones de añadir al carrito generados dinámicamente se conectan en renderProducts()
  });

  // Re-renderizar drawer cuando cambia el idioma
  window.addEventListener("liquido:langchange", () => {
    if (document.getElementById("cartDrawer")) {
      // Eliminar el drawer para recrearlo con textos actualizados
      document.getElementById("cartDrawer")?.remove();
      document.getElementById("cartOverlay")?.remove();
      ensureDrawer();
      render();
    }
  });

  /* ---------- API pública ---------- */
  window.Cart = {
    add, open, close, render, count, load, save, buyNow,
    buildProductMessage, buildCheckoutMessage, showToast,
  };
})();
