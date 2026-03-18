/* ============================================================
   THEME.JS — Toggle dark / light mode
   Módulo 01 · Solo JS de este módulo

   Responsabilidades:
   1. Leer preferencia guardada en localStorage
   2. Aplicar el tema al cargar la página (sin flash)
   3. Toggle al hacer clic en el botón
   4. Persistir la preferencia
   5. Actualizar aria-label del botón
   6. Manejar el menú hamburguesa mobile
   ============================================================ */

(() => {
  'use strict';

  /* ─── CONSTANTES ─────────────────────────────────────── */
  const STORAGE_KEY   = 'jr-portfolio-theme';
  const DARK_THEME    = 'dark';
  const LIGHT_THEME   = 'light';
  const HTML_EL       = document.documentElement;

  /* ─── ELEMENTOS DEL DOM ──────────────────────────────── */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const menuToggleBtn  = document.getElementById('menu-toggle');
  const mobileMenu     = document.getElementById('mobile-menu');

  /* ══════════════════════════════════════════════════════
     MÓDULO: TEMA
     ══════════════════════════════════════════════════════ */

  /**
   * Devuelve el tema activo desde localStorage.
   * Si no hay preferencia guardada, devuelve 'light' como default.
   */
  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || LIGHT_THEME;
  }

  /**
   * Aplica el tema al atributo data-theme del <html>.
   * Actualiza también el aria-label del botón toggle.
   * @param {string} theme — 'dark' | 'light'
   */
  function applyTheme(theme) {
    HTML_EL.setAttribute('data-theme', theme);
    updateToggleLabel(theme);
  }

  /**
   * Guarda el tema en localStorage y lo aplica.
   * @param {string} theme — 'dark' | 'light'
   */
  function saveAndApplyTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  /**
   * Actualiza el aria-label del botón según el tema activo.
   * El label describe la ACCIÓN que realizará el botón,
   * no el estado actual — mejor práctica de accesibilidad.
   * @param {string} theme — 'dark' | 'light'
   */
  function updateToggleLabel(theme) {
    if (!themeToggleBtn) return;

    if (theme === DARK_THEME) {
      themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
      themeToggleBtn.setAttribute('title', 'Cambiar a modo claro');
    } else {
      themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
      themeToggleBtn.setAttribute('title', 'Cambiar a modo oscuro');
    }
  }

  /**
   * Alterna entre dark y light mode.
   */
  function toggleTheme() {
    const current = HTML_EL.getAttribute('data-theme') || LIGHT_THEME;
    const next    = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    saveAndApplyTheme(next);
  }

  /* ══════════════════════════════════════════════════════
     MÓDULO: MENÚ MOBILE
     ══════════════════════════════════════════════════════ */

  /**
   * Abre el menú mobile.
   * Actualiza ARIA y añade la clase .is-open.
   */
  function openMobileMenu() {
    if (!mobileMenu || !menuToggleBtn) return;

    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggleBtn.setAttribute('aria-expanded', 'true');
    menuToggleBtn.setAttribute('aria-label', 'Cerrar menú de navegación');

    // Previene scroll del body mientras el menú está abierto
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el menú mobile.
   */
  function closeMobileMenu() {
    if (!mobileMenu || !menuToggleBtn) return;

    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    menuToggleBtn.setAttribute('aria-label', 'Abrir menú de navegación');

    // Restaura el scroll del body
    document.body.style.overflow = '';
  }

  /**
   * Alterna el estado del menú mobile.
   */
  function toggleMobileMenu() {
    const isOpen = mobileMenu?.classList.contains('is-open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  }

  /* ══════════════════════════════════════════════════════
     MÓDULO: NAVBAR ACTIVA
     Marca como .active el link que corresponde a la
     sección visible según el scroll (Intersection Observer)
     ══════════════════════════════════════════════════════ */

  function initActiveNavLinks() {
    // Recoger todos los links de navegación (desktop + mobile)
    const navLinks = document.querySelectorAll(
      '.navbar__nav-link, .navbar__mobile-link'
    );

    // Recoger todas las secciones con id
    const sections = document.querySelectorAll('section[id]');

    if (!sections.length || !navLinks.length) return;

    /**
     * Marca como activo el link cuyo href coincide con el id de la sección.
     * @param {string} id — id de la sección activa
     */
    function setActiveLink(id) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${id}`) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    }

    // Intersection Observer: activa el link cuando la sección
    // entra en el 30% superior del viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        // rootMargin negativo: dispara cuando la sección
        // está en la zona media del viewport
        rootMargin: '-10% 0px -85% 0px',
        threshold: 0,
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  /* ══════════════════════════════════════════════════════
     INICIALIZACIÓN
     ══════════════════════════════════════════════════════ */

  /**
   * Punto de entrada — se ejecuta cuando el DOM está listo.
   */
  function init() {
    // 1. Aplicar tema guardado (antes del primer paint visible)
    applyTheme(getSavedTheme());

    // 2. Event listener: toggle de tema
    themeToggleBtn?.addEventListener('click', toggleTheme);

    // 3. Event listener: hamburguesa
    menuToggleBtn?.addEventListener('click', toggleMobileMenu);

    // 4. Cerrar menú mobile al hacer clic en un link
    mobileMenu?.querySelectorAll('.navbar__mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // 5. Cerrar menú mobile con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
        closeMobileMenu();
        menuToggleBtn?.focus(); // Devuelve el foco al botón
      }
    });

    // 6. Cerrar menú mobile si se hace clic fuera de él
    document.addEventListener('click', (e) => {
      if (
        mobileMenu?.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !menuToggleBtn?.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // 7. Inicializar links activos por scroll
    initActiveNavLinks();
  }

  // Ejecutar cuando el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // El DOM ya está listo (script con defer)
    init();
  }

})();