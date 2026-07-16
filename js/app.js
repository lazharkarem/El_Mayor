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
        if (fmt === 'kappa45x280') {
            wrappers.forEach(w => w.style.display = 'none');
            wallWrapper.style.display = 'block';
            renderWallMenu();
        } else {
            wrappers.forEach(w => {
                w.style.display = 'block';
                w.setAttribute('data-format', fmt);
            });
            wallWrapper.style.display = 'none';
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

    /* ─── WALL MENU (kappa45x280) — Horizontal Dark Banner ────── */
    function renderWallMenu() {
        const wallGrid = document.getElementById('wall-grid-container');
        if (wallGrid.innerHTML.trim() !== '') return;

        /* Image Panel */
        function wallImgPanel(url) {
            return `<div class="wall-img-panel">
                <div class="wall-img" style="background-image:url('${url}')"></div>
            </div>`;
        }

        /* Single-title column panel */
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

        /* Double-stacked column: two panels sharing full height */
        function wallDoubleCol(panelA_title, panelA_items, panelB_title, panelB_items, imgUrl = null) {
            return `<div class="wall-col-double">
                ${wallPanel(panelA_title, panelA_items, imgUrl)}
                ${wallPanel(panelB_title, panelB_items)}
            </div>`;
        }

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
            <div class="thumb" style="background-image:url('assets/img_nuggets.jpg')"></div>
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
        ...it, image: 'assets/choco.png'
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

/* ─── PRINT with correct physical page size ────────────────────
   Each format maps to its real print dimensions.
   We inject a temporary <style> with the exact @page size,
   call window.print(), then remove it so screen view is unchanged.
──────────────────────────────────────────────────────────────── */
function printMenu() {
    const fmt = document.getElementById('format-select').value;

    // Map format → exact page size (width height)
    const sizes = {
        'a3':           '594mm 420mm',   // A3 landscape (2 pages side by side)
        'desk15x30':    '150mm 300mm',   // Desk tent portrait
        'wall70x80':    '700mm 800mm',   // Wall poster portrait
        'kappa45x280':  '2800mm 450mm',  // Kappa wide banner landscape
    };

    const pageSize = sizes[fmt] || '594mm 420mm';

    // Remove any old override first
    const old = document.getElementById('__print-size-override');
    if (old) old.remove();

    // Hide pages that are not active, show only the one being printed
    const isKappa = fmt === 'kappa45x280';
    const hideRules = isKappa
        ? `#menu-page-1, #menu-page-2 { display: none !important; }
           #wall-menu-wrapper { display: block !important; overflow: visible !important; }`
        : `#wall-menu-wrapper { display: none !important; }`;

    // Inject temporary print style
    const style = document.createElement('style');
    style.id = '__print-size-override';
    style.textContent = `
        @page { size: ${pageSize}; margin: 0; }
        @media print {
            ${hideRules}
            body { background: none !important; }
            .wall-grid { min-width: unset !important; width: 100% !important; }
        }
    `;
    document.head.appendChild(style);

    window.print();

    // Remove it after print dialog closes
    setTimeout(() => {
        const s = document.getElementById('__print-size-override');
        if (s) s.remove();
    }, 1500);
}
