/* ============================================================
   LIQUIDO BODYBOARD — Ficha de producto (detail.js)
   Requiere: window.PRODUCT_SLUG, window.PRODUCTS, window.Cart
   ============================================================ */
(function () {
  "use strict";

  const SYMBOL     = "S/";
  const IMG_PREFIX = "../";   // siempre relativo desde /producto/

  /* ---------- Encontrar producto ---------- */
  const slug    = window.PRODUCT_SLUG;
  const product = (window.PRODUCTS || []).find((p) => p.slug === slug);

  if (!product) {
    document.getElementById("pdp").innerHTML = `
      <div class="container" style="padding:80px 0;text-align:center">
        <h2 style="font-family:'Bebas Neue',sans-serif;font-size:3rem;margin-bottom:12px">${(window.t||function(k){return k;})("pdp.not_found_h2")}</h2>
        <p style="color:#888;margin-bottom:24px">${(window.t||function(k){return k;})("pdp.not_found_p")}</p>
        <a href="../index.html#catalogo" class="btn btn-dark">${(window.t||function(k){return k;})("pdp.not_found_btn")}</a>
      </div>`;
    return;
  }

  /* ---------- Detección de imágenes ---------- */
  function probeImages(maxExtras) {
    return new Promise((resolve) => {
      const found = [];
      const main  = new Image();
      main.onload  = () => {
        found.push(`${IMG_PREFIX}img/${product.id}.webp`);
        let pending = maxExtras;
        let done    = 0;
        if (pending === 0) { resolve(found); return; }
        for (let i = 2; i <= maxExtras + 1; i++) {
          const src = `${IMG_PREFIX}img/${product.id}-${i}.webp`;
          const img = new Image();
          img.onload = () => { found.push(src); check(); };
          img.onerror = check;
          img.src = src;
        }
        function check() { done++; if (done === pending) resolve(found); }
      };
      main.onerror = () => resolve([]);   // sin imagen principal
      main.src = `${IMG_PREFIX}img/${product.id}.webp`;
    });
  }

  /* ---------- Renderizado principal ---------- */
  async function init() {
    // Actualizar <title>
    document.title = `Liquido Bodyboard · ${product.nombre}`;

    // Breadcrumb
    renderBreadcrumb();

    // Imágenes
    const images = await probeImages(5);
    renderGallery(images);

    // Info
    renderInfo();

    // Pestañas
    renderTabs();

    // Relacionados
    renderRelated();
  }

  /* ---------- Galería ---------- */
  function renderGallery(images) {
    const galleryEl = document.getElementById("pdpGallery");
    if (!galleryEl) return;

    if (images.length === 0) {
      galleryEl.innerHTML = `
        <div class="gallery-main">
          <div class="gallery-main-placeholder">🏄</div>
        </div>`;
      return;
    }

    galleryEl.innerHTML = `
      <div class="gallery-main" id="galleryMain">
        <img id="galleryMainImg" src="${images[0]}" alt="${product.nombre}">
      </div>
      ${images.length > 1 ? `
      <div class="gallery-thumbs" id="galleryThumbs">
        ${images.map((src, i) => `
          <div class="gallery-thumb ${i === 0 ? "active" : ""}" data-src="${src}" data-idx="${i}">
            <img src="${src}" alt="${product.nombre} foto ${i + 1}" loading="lazy">
          </div>`).join("")}
      </div>` : ""}`;

    // Eventos de miniaturas
    galleryEl.querySelectorAll(".gallery-thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        document.getElementById("galleryMainImg").src = thumb.dataset.src;
        galleryEl.querySelectorAll(".gallery-thumb").forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });
  }

  /* ---------- Info del producto ---------- */
  function renderInfo() {
    const infoEl = document.getElementById("pdpInfo");
    if (!infoEl) return;

    const _t = window.t || function(k) { return k; };
    let qty = 1;

    infoEl.innerHTML = `
      <div class="pdp-category">${product.categoria}</div>
      <h1 class="pdp-name">${product.nombre}</h1>
      <p class="pdp-short-desc">${product.descripcion_corta}</p>
      <div class="pdp-price">${SYMBOL} ${product.precio.toFixed(2)}</div>
      <div class="pdp-meta">
        <span class="chip chip-gray">${_t("pdp.weight")}: ${product.peso}</span>
        <span class="chip chip-gray">${_t("pdp.stock")}: ${product.stock} ${_t("pdp.units")}</span>
        ${product.badge ? `<span class="chip chip-accent">${product.badge}</span>` : ""}
      </div>
      <div class="pdp-qty-wrap">
        <label>${_t("pdp.qty_label")}</label>
        <div class="pdp-qty">
          <button id="pdpQtyDec" aria-label="${_t("pdp.qty_dec")}">−</button>
          <span id="pdpQtyVal">1</span>
          <button id="pdpQtyInc" aria-label="${_t("pdp.qty_inc")}">+</button>
        </div>
      </div>
      <div class="pdp-ctas">
        <button class="btn btn-whatsapp" id="pdpBuyNow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          ${_t("pdp.buy_now")}
        </button>
        <button class="btn btn-dark" id="pdpAddCart">${_t("pdp.add_cart")}</button>
      </div>
      <div class="trust-chips">
        <span class="chip chip-gray">${_t("pdp.trust1")}</span>
        <span class="chip chip-gray">${_t("pdp.trust2")}</span>
        <span class="chip chip-gray">${_t("pdp.trust3")}</span>
      </div>`;

    // Selector de cantidad
    const qtyEl  = infoEl.querySelector("#pdpQtyVal");
    infoEl.querySelector("#pdpQtyDec").addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      qtyEl.textContent = qty;
    });
    infoEl.querySelector("#pdpQtyInc").addEventListener("click", () => {
      qty = Math.min(product.stock || 99, qty + 1);
      qtyEl.textContent = qty;
    });

    // CTAs
    infoEl.querySelector("#pdpBuyNow").addEventListener("click", () =>
      window.Cart.buyNow(product, qty)
    );
    infoEl.querySelector("#pdpAddCart").addEventListener("click", () => {
      window.Cart.add(product.id, qty);
      window.Cart.open();
    });
  }

  /* ---------- Pestañas ---------- */
  function renderTabs() {
    const tabsEl = document.getElementById("pdpTabs");
    if (!tabsEl) return;

    const tabs = [];
    const _t = window.t || function(k) { return k; };

    // Descripción
    if (product.descripcion) {
      tabs.push({ id: "desc", label: _t("pdp.tab_desc"), content: `<p>${product.descripcion}</p>` });
    }

    // Especificaciones
    if (product.especificaciones && Object.keys(product.especificaciones).length > 0) {
      const rows = Object.entries(product.especificaciones).map(
        ([k, v]) => `<tr><td>${k.replace(/_/g, " ")}</td><td>${v}</td></tr>`
      ).join("");
      tabs.push({ id: "specs", label: _t("pdp.tab_specs"), content: `<table class="spec-table">${rows}</table>` });
    }

    // Notas adicionales
    if (product.notas) {
      tabs.push({ id: "notas", label: _t("pdp.tab_notes"), content: `<p>${product.notas}</p>` });
    }

    if (tabs.length === 0) return;

    tabsEl.className = "pdp-tabs";
    tabsEl.innerHTML = `
      <div class="tabs-nav">
        ${tabs.map((t, i) => `<button class="tab-btn ${i === 0 ? "active" : ""}" data-tab="${t.id}">${t.label}</button>`).join("")}
      </div>
      ${tabs.map((t, i) => `<div class="tab-panel ${i === 0 ? "active" : ""}" id="tab-${t.id}">${t.content}</div>`).join("")}`;

    tabsEl.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        tabsEl.querySelectorAll(".tab-btn, .tab-panel").forEach((el) => el.classList.remove("active"));
        btn.classList.add("active");
        tabsEl.querySelector(`#tab-${btn.dataset.tab}`)?.classList.add("active");
      });
    });
  }

  /* ---------- Relacionados ---------- */
  function renderRelated() {
    const relEl = document.getElementById("pdpRelated");
    if (!relEl) return;

    const related = (window.PRODUCTS || [])
      .filter((p) => p.id !== product.id && p.categoria === product.categoria)
      .slice(0, 3);

    if (related.length === 0) return;

    relEl.className = "pdp-related";
    relEl.innerHTML = `
      <div class="container">
        <h2>También te puede interesar</h2>
        <div class="related-grid">
          ${related.map((p) => `
            <div class="product-card">
              <div class="card-img-wrap">
                <img src="../img/${p.id}.webp" alt="${p.nombre}" loading="lazy"
                     onerror="this.parentElement.innerHTML='<div class=\\'card-img-placeholder\\'>🏄</div>'">
                ${p.badge ? `<span class="card-badge badge-${p.badge}">${p.badge}</span>` : ""}
              </div>
              <div class="card-body">
                <div class="card-category">${p.categoria}</div>
                <h3 class="card-name">${p.nombre}</h3>
                <div class="card-price">${SYMBOL} ${p.precio.toFixed(2)}</div>
                <div class="card-actions">
                  <a href="${p.slug}.html" class="btn btn-dark btn-sm">Ver ficha</a>
                  <button class="btn btn-primary btn-sm" data-add-id="${p.id}">Añadir</button>
                </div>
              </div>
            </div>`).join("")}
        </div>
      </div>`;

    relEl.querySelectorAll("[data-add-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.Cart.add(parseInt(btn.dataset.addId, 10), 1);
        window.Cart.open();
      });
    });
  }

  /* ---------- Arrancar ---------- */
  function rerender() {
    renderBreadcrumb();
    renderInfo();
    renderTabs();
    renderRelated();
  }

  function renderBreadcrumb() {
    const breadcrumb = document.getElementById("pdpBreadcrumb");
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="../index.html">${(window.t||function(k){return k;})("pdp.breadcrumb_home")}</a>
        <span class="breadcrumb-sep">›</span>
        <a href="../index.html#catalogo">${(window.t||function(k){return k;})("pdp.breadcrumb_catalog")}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${product.nombre}</span>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("liquido:langchange", rerender);
})();
