document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const formatSelect = document.getElementById('format-select');
    const wrappers = document.querySelectorAll('.menu-wrapper');
    const wallWrapper = document.getElementById('wall-menu-wrapper');

    // Apply default theme on load
    document.body.setAttribute('data-theme', themeSelect.value);

    themeSelect.addEventListener('change', (e) => {
        document.body.setAttribute('data-theme', e.target.value);
        // Force wall menu to re-render with new theme colors
        if (wallWrapper.style.display !== 'none') {
            document.getElementById('wall-grid-container').innerHTML = '';
            renderWallMenu();
        }
    });

    formatSelect.addEventListener('change', (e) => {
        const fmt = e.target.value;
        
        // Toggle visibility based on format
        const a3Wrappers = document.querySelectorAll('.menu-wrapper');
        const wallWrapper = document.getElementById('wall-menu-wrapper');
        const posterWrapper = document.getElementById('poster-menu-wrapper');

        if (fmt === 'kappa45x280') {
            a3Wrappers.forEach(w => w.style.display = 'none');
            posterWrapper.style.display = 'none';
            wallWrapper.style.display = 'block';
            renderWallMenu();
        } else if (fmt === 'wall70x80') {
            a3Wrappers.forEach(w => w.style.display = 'none');
            wallWrapper.style.display = 'none';
            posterWrapper.style.display = 'block';
            renderPosterMenu();
        } else {
            a3Wrappers.forEach(w => {
                w.style.display = 'block';
                w.setAttribute('data-format', fmt);
            });
            wallWrapper.style.display = 'none';
            posterWrapper.style.display = 'none';
            // Reset so next time it re-renders fresh
            document.getElementById('wall-grid-container').innerHTML = '';
        }
    });

    /* ─── helpers ─────────────────────────────────────────────── */

    function section(title, body) {
        return `<section class="menu-section">
            <h2 class="section-title">${title}</h2>
            ${body}
        </section>`;
    }

    // Simple rows: Name  Price (no dots)
    function simpleItems(items) {
        return items.map(it => `
            <div class="menu-item">
                <div class="item-row">
                    <span class="item-name">${it.name}</span>
                    <span class="item-price">${it.price || (it.norm + ' / ' + it.maxi)}</span>
                </div>
                ${it.description ? `<p class="item-desc">${it.description}</p>` : ''}
            </div>`).join('');
    }

    // Dotted rows: Name ................ Price
    function dottedItems(items) {
        return items.map(it => `
            <div class="menu-item">
                <div class="item-row">
                    <span class="item-name">${it.name}</span>
                    <span class="item-dots"></span>
                    <span class="item-price">${it.price || (it.norm + ' / ' + it.maxi)}</span>
                </div>
                ${it.description ? `<p class="item-desc">${it.description}</p>` : ''}
            </div>`).join('');
    }

    // Boxed items (border around each)
    function boxedItems(items) {
        return items.map(it => `
            <div class="boxed-item">
                <div class="boxed-item-text">
                    <span class="item-name">${it.name}</span>
                    ${it.description ? `<p class="item-desc">${it.description}</p>` : ''}
                    ${it.singolo ? `<p class="item-desc">Singolo / Menù</p>` : ''}
                </div>
                <span class="item-price">${it.price || (it.singolo ? it.singolo + ' / ' + it.menu : '')}</span>
            </div>`).join('');
    }

    // Image-list items (small photo + text)
    function imageItems(items) {
        return items.map(it => `
            <div class="image-list-item">
                <div class="image-list-img" style="background-image:url('${it.image || 'assets/kebab.png'}')"></div>
                <div class="image-list-text">
                    <div class="item-row">
                        <span class="item-name" style="font-size:1rem;">${it.name}</span>
                        <span class="item-price" style="font-size:1.05rem;">${it.price || (it.norm + ' / ' + it.maxi)}</span>
                    </div>
                    ${it.description ? `<p class="item-desc" style="font-size:0.78rem;">${it.description}</p>` : ''}
                </div>
            </div>`).join('');
    }

    /* ─── WALL & POSTER HELPERS ───────────────────────────────── */
    function wallImgPanel(url) {
        return `<div class="wall-img-panel">
            <div class="wall-img" style="background-image:url('${url}')"></div>
        </div>`;
    }

    function wallPanel(title, items, imgUrl = null) {
        const rows = items.map(it => `
            <div class="wall-item">
                <div class="wall-item-row">
                    <span class="w-name">${it.name}</span>
                    <span class="w-price">${it.price || ((it.norm || '') + (it.maxi ? ' / ' + it.maxi : ''))}</span>
                </div>
                ${it.description ? `<p class="w-desc">${it.description}</p>` : ''}
            </div>`).join('');
        
        const imgHtml = imgUrl ? wallImgPanel(imgUrl) : '';
        return `
            <div class="wall-panel">
                <div class="wall-title">${title}</div>
                ${imgHtml}
                <div class="wall-body">${rows}</div>
            </div>`;
    }

    function wallDoubleCol(panelA_title, panelA_items, panelB_title, panelB_items, imgUrl = null) {
        return `<div class="wall-col-double">
            ${wallPanel(panelA_title, panelA_items, imgUrl)}
            ${wallPanel(panelB_title, panelB_items)}
        </div>`;
    }

    /* ─── WALL MENU (kappa45x280) — Horizontal Dark Banner ────── */
    function renderWallMenu() {
        const wallGrid = document.getElementById('wall-grid-container');
        if (wallGrid.innerHTML.trim() !== '') return;

        /* Col 1 — KEBAB */
        const col1 = `<div class="wall-col">
            ${wallPanel('KEBAB', menuData.kebab.map(it => ({
                name: it.name,
                price: it.norm + ' / ' + it.maxi,
                description: it.description
            })), 'assets/kebab.png')}
        </div>`;

        /* Col 2 — FRENCH TACOS + PANINI */
        const tacoData = menuData.frenchTacos.sizes.map(s => ({
            name: s.name,
            price: s.singolo + ' / ' + s.menu,
            description: menuData.frenchTacos.baseIngredients
        }));
        const col2 = wallDoubleCol('FRENCH TACOS', tacoData, 'PANINI', menuData.panini, 'assets/tacos.png');

        /* Col 3 — MENÙ BAMBINI + VEGETARIANO */
        const bambiniData = menuData.menuBambini.map(it => ({
            name: it.name, price: it.menu, description: it.description
        }));
        const col3 = wallDoubleCol('MENÙ BAMBINI', bambiniData, 'VEGETARIANO', menuData.vegetariano.map(it => ({
            name: it.name, price: it.norm + ' / ' + it.maxi, description: it.description
        })));

        /* Center brand column */
        const colBrand = `
            <div class="wall-brand-col">
                <img class="wall-brand-logo" src="assets/PHOTO-2026-05-30-15-30-38.jpg" alt="El Mayor Logo">
                <div class="wall-brand-name">EL MAYOR</div>
                <div class="wall-brand-sub">KEBAB &amp; RISTORANTE</div>
                <div class="wall-brand-hours">11:00 – <span>24:00</span></div>
                
                <div class="wall-brand-details">
                    <p class="w-detail-address">📍 Via Rosa, 4 - Ragusa</p>
                    <p class="w-detail-phone">📞 0932 518480</p>
                    
                    <div class="w-social-badges">
                        <span class="w-badge">📸 @elmayorkebab</span>
                        <span class="w-badge">👥 El Mayor Kebab</span>
                    </div>
                    
                    <div class="w-delivery-box">
                        <span>CONSEGNE Glovo &amp; Deliveroo</span>
                    </div>
                </div>
            </div>`;

        /* Col 5 — PIATTI + FRITTURA */
        const col5 = wallDoubleCol('PIATTI', menuData.piatti.map(it => ({
            name: it.name, price: it.price, description: it.description
        })), 'FRITTURA', menuData.frittura.map(it => ({name:it.name, price:it.price})), 'assets/piatti_mix.png');

        /* Col 6 — COUS COUS + PANE ARABO */
        const col6 = wallDoubleCol('COUS COUS', menuData.cousCous, 'PANE ARABO', menuData.paneArabo.map(it => ({
            name: it.name, price: it.price, description: it.description
        })));

        /* Col 7 — SALSE + BIBITE */
        const salsePriceLabel = menuData.salsePrice ? ` (${menuData.salsePrice})` : '';
        const salseRows = `<div class="salse-grid">${menuData.salse.map(s => `<span class="w-salsa">${s}</span>`).join('')}</div>`;
        const col7 = `<div class="wall-col-double">
            <div class="wall-panel">
                <div class="wall-title">SALSE${salsePriceLabel}</div>
                <div class="wall-body">${salseRows}</div>
            </div>
            ${wallPanel('BIBITE', menuData.bibite)}
        </div>`;

        /* Col 8 — CHOCO KEBAB + KEBAB VASCHETTA */
        const vp = menuData.kebabVaschetta?.prices || {};
        const col8 = wallDoubleCol('CHOCO KEBAB', menuData.chocoKebab.map(it => ({
            name: it.name, price: it.price, description: it.description
        })), 'KEBAB IN VASCHETTA', [
            {name: 'Small',  price: vp.small || '€3.50'},
            {name: 'Normal', price: vp.norm  || '€5.00'},
            {name: 'Maxi',   price: vp.maxi  || '€6.50'},
            ...menuData.aggiunte.map(it => ({name: it.name.split(',')[0], price: it.norm + ' / ' + it.maxi}))
        ], 'assets/choco.png');

        wallGrid.innerHTML = col1 + col2 + col3 + colBrand + col5 + col6 + col7 + col8;
    }

    /* ─── POSTER MENU (70x80) — Single Page Square Banner ────── */
    function renderPosterMenu() {
        const posterGrid = document.getElementById('poster-grid-container');
        if (posterGrid.innerHTML.trim() !== '') return;

        /* Col 1 */
        const col1 = `<div class="wall-col">
            ${wallPanel('KEBAB', menuData.kebab.map(it => ({name: it.name, price: it.norm + ' / ' + it.maxi, description: it.description})), 'assets/kebab.png')}
            ${wallPanel('FRITTURA', menuData.frittura.map(it => ({name:it.name, price:it.price})))}
            <div class="wall-panel">
                <div class="wall-title">SALSE${menuData.salsePrice ? ` (${menuData.salsePrice})` : ''}</div>
                <div class="wall-body"><div class="salse-grid">${menuData.salse.map(s => `<span class="w-salsa">${s}</span>`).join('')}</div></div>
            </div>
            ${wallPanel('BIBITE', menuData.bibite)}
        </div>`;

        /* Col 2 */
        const tacoData = menuData.frenchTacos.sizes.map(s => ({name: s.name, price: s.singolo + ' / ' + s.menu, description: menuData.frenchTacos.baseIngredients}));
        const vp = menuData.kebabVaschetta?.prices || {};
        const col2 = `<div class="wall-col">
            ${wallPanel('PANINI', menuData.panini, 'assets/premium_burger.png')}
            ${wallPanel('VEGETARIANO', menuData.vegetariano.map(it => ({name: it.name, price: it.norm + ' / ' + it.maxi, description: it.description})))}
            ${wallPanel('FRENCH TACOS', tacoData)}
            ${wallPanel('PANE ARABO', menuData.paneArabo.map(it => ({name: it.name, price: it.price, description: it.description})))}
            ${wallPanel('KEBAB IN VASCHETTA', [
                {name: 'Small',  price: vp.small || '€3.50'},
                {name: 'Normal', price: vp.norm  || '€5.00'},
                {name: 'Maxi',   price: vp.maxi  || '€6.50'}
            ])}
        </div>`;

        /* Col 3 */
        const col3 = `<div class="wall-col">
            ${wallPanel('MENÙ BAMBINI', menuData.menuBambini.map(it => ({name: it.name, price: it.menu, description: it.description})), 'assets/test_kebab.png')}
            ${wallPanel('AGGIUNTE', menuData.aggiunte.map(it => ({name: it.name.split(',')[0], price: it.norm + ' / ' + it.maxi})))}
            ${wallPanel('COUS COUS', menuData.cousCous)}
            ${wallPanel('PIATTI', menuData.piatti.map(it => ({name: it.name, price: it.price, description: it.description})))}
            ${wallPanel('CHOCO KEBAB', menuData.chocoKebab.map(it => ({name: it.name, price: it.price, description: it.description})))}
        </div>`;

        posterGrid.innerHTML = col1 + col2 + col3;
    }

    /* ─── PAGE 1 content ──────────────────────────────────────── */

    // Column 1 — Kebab (2 sub-sections)
    const kebabSimple = dottedItems(menuData.kebab.map(it => ({
        name: it.name, price: it.norm + ' / ' + it.maxi, description: it.description
    })));

    const vegSimple = dottedItems(menuData.vegetariano.map(it => ({
        name: it.name, price: it.norm + ' / ' + it.maxi, description: it.description
    })));

    document.getElementById('col-1-p1').innerHTML = `
        <div class="col-top-food" style="background-image:url('assets/kebab.png')"></div>
        ${section('KEBAB', kebabSimple)}
        ${section('VEGETARIANO', vegSimple)}
    `;

    // Column 2 — Panini + Pane Arabo
    document.getElementById('col-2-p1').innerHTML =
        section('PANINI', dottedItems(menuData.panini)) +
        section('PANE ARABO', dottedItems(menuData.paneArabo));

    // Column 3 — French Tacos (boxed) + thumbnail gallery + Frittura
    const tacoBoxed = menuData.frenchTacos.sizes.map(s => ({
        name: s.name,
        description: `Ingredienti: ${menuData.frenchTacos.baseIngredients.substring(0, 40)}…`,
        singolo: s.singolo,
        menu: s.menu
    }));
    const thumbGallery = `
        <div class="thumb-gallery">
            <div class="thumb" style="background-image:url('assets/img_fries.jpg')"></div>
            <div class="thumb" style="background-image:url('assets/img_nuggets.png')"></div>
            <div class="thumb" style="background-image:url('assets/img_wings.jpg')"></div>
        </div>`;
    document.getElementById('col-3-p1').innerHTML =
        section('FRENCH TACOS', boxedItems(tacoBoxed)) +
        thumbGallery +
        section('FRITTURA', imageItems(menuData.frittura.slice(0, 4)));

    // Column 4 (Red) content is already hardcoded in index.html — do not touch it.

    /* ─── PAGE 2 content ──────────────────────────────────────── */

    // Col 1 (narrow) — Cous Cous + Bibite
    document.getElementById('col-1-p2').innerHTML =
        section('COUS COUS', dottedItems(menuData.cousCous)) +
        section('BIBITE', dottedItems(menuData.bibite));

    // Col 2 — Frittura (dotted) + Piatti (image)
    document.getElementById('col-2-p2').innerHTML =
        section('FRITTURA', dottedItems(menuData.frittura.slice(0, 5))) +
        section('PIATTI', imageItems(menuData.piatti));

    // Col 3 — Menù Bambini (dotted) + Choco Kebab (image)
    const bambiniItems = menuData.menuBambini.map(it => ({
        name: it.name, price: it.menu, description: it.description
    }));
    const chocoItems = menuData.chocoKebab.map(it => ({
        ...it, image: it.image || 'assets/choco.png'
    }));
    document.getElementById('col-3-p2').innerHTML =
        section('MENÙ BAMBINI', dottedItems(bambiniItems)) +
        section('CHOCO KEBAB', imageItems(chocoItems));

    // Col 4 (narrow) — Aggiunte + Salse
    const salseText = `<p class="item-desc" style="line-height:1.9;color:#aaa;">${menuData.salse.join(' &bull; ')}</p>`;
    document.getElementById('col-4-p2').innerHTML =
        section('SALSE', salseText) +
        section('PANE ARABO', simpleItems(menuData.paneArabo));
});

/* ─── PRINT — opens a dedicated print window at exact physical size ────
   Opening a fresh window lets us:
     • Set the exact @page dimensions for the printer
     • Include ONLY the active format's content (no blank pages)
     • Resolve all asset URLs via <base href>
     • Apply background-color printing (-webkit-print-color-adjust)
──────────────────────────────────────────────────────────────────────── */
function printMenu() {
    const fmt   = document.getElementById('format-select').value;
    const theme = document.body.getAttribute('data-theme') || 'dark';
    const isKappa = fmt === 'kappa45x280';

    /* Logical dimensions [width, height, unit] */
    const dims = {
        'a3':           [420, 297, 'mm'],   // A3 landscape per page
        'desk15x30':    [150, 300, 'mm'],   // Desk tent portrait
        'wall70x80':    [700, 800, 'mm'],   // Wall poster portrait
        'kappa45x280':  [2800, 450, 'px'],  // Wide horizontal banner
    };
    const [w, h, unit] = dims[fmt] || dims['a3'];

    /* 
       Chrome / Mac OS print dialogs often reject massive custom page sizes 
       (like 2.8 meters or 700x800mm), defaulting to A4 and ruining the layout.
       FIX: We scale down huge formats by 50% for the PDF generator, which 
       yields a perfectly proportioned vector PDF that the print shop can scale back up.
    */
    let scale = 1.0;
    if (fmt === 'wall70x80') scale = 0.5;   // 700x800mm -> 350x400mm
    if (fmt === 'kappa45x280') scale = 0.5; // 2800x450px -> 1400x225px
    
    const pageW = (w * scale) + unit;
    const pageH = (h * scale) + unit;
    
    const wrapperW = w + unit;
    const wrapperH = h + unit;

    /* Resolve base URL so relative paths (assets/, css/) work in new window */
    const baseHref = window.location.href.replace(/[^/]*(\?.*)?$/, '');

    /* ── Build the HTML content to print ─────────────────────── */
    let bodyContent;

    if (isKappa) {
        /* Kappa: render only the wall grid banner */
        const gridInner = document.getElementById('wall-grid-container').innerHTML;
        bodyContent = `
        <div class="page-break-wrapper">
          <div style="transform: scale(${scale}); transform-origin: top left; width:${wrapperW}; height:${wrapperH};">
            <div class="wall-theme" style="width:${wrapperW}; overflow:visible;">
              <main class="wall-grid" id="wall-grid-container"
                    style="min-width:unset; width:${wrapperW}; height:${wrapperH};">
                ${gridInner}
              </main>
            </div>
          </div>
        </div>`;
    } else if (fmt === 'wall70x80') {
        /* Poster: render only the poster grid */
        const gridInner = document.getElementById('poster-grid-container').innerHTML;
        bodyContent = `
        <div class="page-break-wrapper">
          <div style="transform: scale(${scale}); transform-origin: top left; width:${wrapperW}; height:${wrapperH};">
            <div class="wall-theme" style="width:${wrapperW}; overflow:visible;">
              <main class="poster-grid" id="poster-grid-container"
                    style="min-width:unset; width:${wrapperW}; height:${wrapperH};">
                ${gridInner}
              </main>
            </div>
          </div>
        </div>`;
    } else {
        /* A3 / desk / wall: clone each menu page wrapper */
        bodyContent = Array.from(document.querySelectorAll('.menu-wrapper'))
            .map(wNode => {
                const cl = wNode.cloneNode(true);
                cl.style.display   = 'block';
                cl.style.margin    = '0';
                cl.style.boxShadow = 'none';
                cl.style.width     = wrapperW;
                cl.style.height    = wrapperH;
                cl.style.overflow  = 'hidden';
                cl.setAttribute('data-format', fmt);
                
                return `
                <div class="page-break-wrapper">
                  <div style="transform: scale(${scale}); transform-origin: top left; width:${wrapperW}; height:${wrapperH};">
                    ${cl.outerHTML}
                  </div>
                </div>`;
            }).join('\n');
    }

    /* ── Open a dedicated print window ───────────────────────── */
    const win = window.open('', '_blank');
    if (!win) {
        alert('Pop-up blocked! Please allow pop-ups for this page and try again.');
        return;
    }

    win.document.write(`<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <base href="${baseHref}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Roboto:ital,wght@0,400;0,700;1,400&family=Oswald:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="css/style.css">
  <style>
    @page {
      size: ${pageW} ${pageH};
      margin: 0;
    }
    html, body {
      margin: 0; padding: 0;
      background: none !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      width: ${pageW};
      height: ${pageH};
    }
    .no-print { display: none !important; }
    .toolbar  { display: none !important; }

    .page-break-wrapper {
      width: ${pageW};
      height: ${pageH};
      overflow: hidden;
      page-break-after: always;
      break-after: page;
    }
    .page-break-wrapper:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Override Kappa overrides */
    .wall-theme { overflow: visible !important; }
    .wall-col, .wall-col-double { flex: 1 !important; }
  </style>
</head>
<body data-theme="${theme}">
${bodyContent}
<script>
  window.addEventListener('load', function () {
    setTimeout(function () { window.print(); }, 1200);
  });
<\/script>
</body>
</html>`);
    win.document.close();
}

