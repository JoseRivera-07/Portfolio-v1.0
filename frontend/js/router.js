/* ============================================================
   ROUTER.JS — Sistema de enrutamiento SPA
   Módulo 02 · History API nativa · Sin librerías externas

   Responsabilidades:
   1. Mapear rutas a módulos de página (lazy loading)
   2. Renderizar vistas en <div id="app">
   3. Interceptar clicks en links internos (event delegation)
   4. Actualizar URL con pushState
   5. Manejar navegación con botones Atrás / Adelante
   6. Marcar link activo en navbar (aria-current + .active)
   7. Gestionar transiciones fade entre vistas
   8. Actualizar <title> del documento por vista
   ============================================================ */

/* ─── MAPA DE RUTAS ─────────────────────────────────────────
   Cada entrada relaciona un pathname con una función que
   devuelve un dynamic import(). Así el módulo solo se
   descarga cuando se necesita por primera vez.
─────────────────────────────────────────────────────────── */
const routes = {
  '/'           : () => import('./pages/home.js'),
  '/proyectos'  : () => import('./pages/projects.js'),
  '/skills'     : () => import('./pages/skills.js'),
  '/experiencia': () => import('./pages/experience.js'),
  '/contacto'   : () => import('./pages/contact.js'),
};

/* ─── SELECTORES ─────────────────────────────────────────── */
const appEl = document.getElementById('app');

// Todos los links de navegación interna (desktop + mobile + footer)
const NAV_LINK_SELECTOR = [
  '.navbar__nav-link',
  '.navbar__mobile-link',
  '.footer__nav-link',
  '.navbar__logo',
  '.footer__logo',
].join(', ');

/* ══════════════════════════════════════════════════════════
   UTILIDADES DE TRANSICIÓN
   Usamos Promises para poder hacer await en la animación.
   Si el usuario prefiere movimiento reducido, resolvemos
   de inmediato sin esperar el evento transitionend.
══════════════════════════════════════════════════════════ */

/**
 * Detecta si el usuario prefiere movimiento reducido.
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fade OUT: aplica .view-exit y espera que termine la transición.
 * @returns {Promise<void>}
 */
function transitionOut() {
  return new Promise(resolve => {
    if (prefersReducedMotion()) return resolve();

    // Si #app está vacío no hay nada que animar — resolver de inmediato
    if (!appEl.innerHTML.trim()) return resolve();

    appEl.classList.add('view-exit');

    // Timeout de seguridad: si transitionend no dispara en 300ms
    // (ej: pestaña nueva, elemento oculto, etc.) resolvemos igual
    const fallback = setTimeout(resolve, 300);

    appEl.addEventListener('transitionend', () => {
      clearTimeout(fallback);
      resolve();
    }, { once: true });
  });
}
/**
 * Fade IN: aplica .view-enter, inserta el HTML, luego
 * añade .view-enter-active en el siguiente frame para
 * que el navegador pinte primero opacity:0 y luego
 * transite a opacity:1.
 * @returns {Promise<void>}
 */
function transitionIn() {
  return new Promise(resolve => {
    if (prefersReducedMotion()) return resolve();

    appEl.classList.add('view-enter');

    // requestAnimationFrame doble: garantiza que el navegador
    // haya pintado el estado inicial (opacity:0) antes
    // de arrancar la transición hacia opacity:1
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        appEl.classList.add('view-enter-active');
        appEl.addEventListener('transitionend', resolve, { once: true });
      });
    });
  });
}

/**
 * Limpia todas las clases de transición del #app.
 */
function clearTransitionClasses() {
  appEl.classList.remove('view-exit', 'view-enter', 'view-enter-active');
}

/* ══════════════════════════════════════════════════════════
   LINKS ACTIVOS
   Marca con .active y aria-current="page" el link
   que corresponde a la ruta actual. Funciona para
   navbar desktop, menú mobile y footer.
══════════════════════════════════════════════════════════ */

/**
 * Actualiza el estado activo de todos los links de navegación.
 * @param {string} currentPath — pathname actual (ej: '/proyectos')
 */
function setActiveLink(currentPath) {
  document.querySelectorAll(NAV_LINK_SELECTOR).forEach(link => {
    // Obtenemos solo el pathname del href (ignora origin)
    const linkPath = new URL(link.href, window.location.origin).pathname;

    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* ══════════════════════════════════════════════════════════
   SCROLL AL INICIO
   Cada cambio de vista lleva el scroll al top,
   igual que en una navegación tradicional.
══════════════════════════════════════════════════════════ */

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ══════════════════════════════════════════════════════════
   VISTA 404
   Módulo inline — no necesita archivo separado.
══════════════════════════════════════════════════════════ */

const notFoundPage = {
  title: '404 — Página no encontrada · Jose Rivera',
  render() {
    return `
      <section class="hero" aria-label="Página no encontrada">
        <div class="container">
          <div class="hero__content" style="max-width:600px; margin:0 auto; text-align:center;">
            <span class="hero__availability" aria-hidden="true">
              <span class="hero__availability-dot" style="background:var(--color-error, #ef4444);"></span>
              Error 404
            </span>
            <h1 class="hero__headline">Página no encontrada</h1>
            <p class="hero__bio">
              La ruta que buscas no existe. Puede que hayas escrito mal la URL
              o que la página haya sido movida.
            </p>
            <div class="hero__cta">
              <a href="/" class="btn btn-primary">Volver al inicio</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },
  init() {
    // Sin lógica extra en 404
  }
};

/* ══════════════════════════════════════════════════════════
   NAVIGATE — Núcleo del router
   Orquesta: fade-out → lazy load → swap → fade-in
══════════════════════════════════════════════════════════ */

/**
 * Navega a una ruta dada.
 * @param {string} path       — pathname destino (ej: '/skills')
 * @param {boolean} pushState — false cuando viene de popstate
 */
async function navigate(path, pushState = true) {
  // 1. Normalizar la ruta: eliminar trailing slash excepto en '/'
  const normalizedPath = path.length > 1 ? path.replace(/\/$/, '') : path;

  // 2. Obtener el loader del módulo, o usar 404
  const loader = routes[normalizedPath] ?? null;

  // 3. Actualizar URL en el historial (no en popstate, que ya lo hizo el navegador)
  if (pushState) {
    history.pushState({ path: normalizedPath }, '', normalizedPath);
  }

  // 4. FADE OUT de la vista actual
  await transitionOut();

  // 5. Cargar el módulo de página (lazy loading)
  let page;
  try {
    if (loader) {
      const module = await loader();
      page = module.default;
    } else {
      page = notFoundPage;
    }
  } catch (err) {
    console.error('[Router] Error cargando módulo de página:', err);
    page = notFoundPage;
  }

  // 6. Preparar el swap: limpiar clases y aplicar view-enter (opacity:0)
  clearTransitionClasses();

  // 7. Inyectar HTML en el DOM
  appEl.innerHTML = page.render();

  // 8. Actualizar <title> del documento
  document.title = page.title;

  // 9. Actualizar el año del footer (puede haber cambiado el DOM)
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // 10. Marcar link activo en la navbar
  setActiveLink(normalizedPath);

  // 11. Scroll al inicio
  scrollToTop();

  // 12. FADE IN de la nueva vista
  await transitionIn();

  // 13. Limpiar clases de transición
  clearTransitionClasses();

  // 14. Ejecutar la lógica post-render de la página (eventos, etc.)
  try {
    await page.init();
  } catch (err) {
    console.error('[Router] Error en page.init():', err);
  }
}

/* ══════════════════════════════════════════════════════════
   EVENT DELEGATION — Interceptar clicks en links internos
   Se aplica sobre document para capturar cualquier link
   que exista en el DOM, incluyendo los que renderiza
   dinámicamente cada vista.
══════════════════════════════════════════════════════════ */

document.addEventListener('click', (e) => {
  // Buscar el <a> más cercano al elemento clickeado
  const link = e.target.closest('a[href]');
  if (!link) return;

  const href = link.getAttribute('href');
  const url  = new URL(href, window.location.origin);

  // ── Ignorar si es externo (distinto origin) ──────────────
  // Cubre GitHub, LinkedIn, etc. — se abren normal con target="_blank"
  if (url.origin !== window.location.origin) return;

  // ── Ignorar si tiene target="_blank" ─────────────────────
  if (link.target === '_blank') return;

  // ── Ignorar si el usuario usa modificadores de teclado ───
  // Ctrl+click, Cmd+click, Shift+click, etc. → comportamiento nativo
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

  // ── Ignorar fragmentos puros (#algo) sin pathname ────────
  // Ej: si algún link interno usa #id para anclas dentro de una vista
  if (href.startsWith('#')) return;

  // ── Interceptar: prevenir recarga y navegar con el router ─
  e.preventDefault();
  navigate(url.pathname);
});

/* ══════════════════════════════════════════════════════════
   POPSTATE — Botones Atrás / Adelante del navegador
   El navegador ya actualizó la URL, solo renderizamos.
══════════════════════════════════════════════════════════ */

window.addEventListener('popstate', (e) => {
  // Usamos el path guardado en el state, o el pathname actual
  const path = e.state?.path ?? window.location.pathname;
  navigate(path, false); // false: no volver a hacer pushState
});

/* ══════════════════════════════════════════════════════════
   ARRANQUE INICIAL — con guardia de DOM
══════════════════════════════════════════════════════════ */
function boot() {
  // Guardia: si #app no existe todavía, abortamos
  if (!appEl) {
    console.error('[Router] #app no encontrado en el DOM');
    return;
  }

  history.replaceState(
    { path: window.location.pathname },
    '',
    window.location.pathname
  );

  navigate(window.location.pathname, false);
}

// Los módulos ES esperan al DOMContentLoaded automáticamente,
// pero añadimos la guardia explícita por si acaso
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}