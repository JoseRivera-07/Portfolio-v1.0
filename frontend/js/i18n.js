/* ============================================================
   I18N.JS — Motor de internacionalización
   Módulo 05 · Jose Rivera Portfolio

   Expone window.i18n con:
     t(key)              → texto traducido por notación de punto
     setLanguage(lang)   → cambia idioma, actualiza DOM y storage
     getCurrentLang()    → retorna 'en' | 'es'
     applyTranslations() → recorre data-i18n* y actualiza el DOM
     init()              → lee storage, carga idioma inicial

   Convención de atributos en el DOM:
     data-i18n="key"             → actualiza textContent
     data-i18n-html="key"        → actualiza innerHTML (textos con tags)
     data-i18n-aria="key"        → actualiza aria-label
     data-i18n-placeholder="key" → actualiza placeholder (inputs futuros)
   ============================================================ */

/* ─── BLOQUE 1: Imports de locales ───────────────────────── */
/* Se importan de forma estática. Al ser módulos ES ligeros
   (solo objetos de strings) no hay penalización de carga.   */

import en from './locales/en.js';
import es from './locales/es.js';

/* ─── BLOQUE 2: Estado interno ───────────────────────────── */

const LOCALES = { en, es };
const SUPPORTED_LANGS = ['en', 'es'];
const STORAGE_KEY = 'portfolio_lang';
const DEFAULT_LANG = 'en';

/* El idioma activo vive aquí. Solo se modifica en setLanguage(). */
let currentLang = DEFAULT_LANG;

/* ─── BLOQUE 3: t() — resolver una key con notación de punto */
/* Recorre el objeto de traducciones usando la key separada
   por puntos. Si la key no existe, devuelve la key misma
   como fallback visible (útil para detectar keys faltantes). */

function t(key) {
  const keys = key.split('.');
  let value = LOCALES[currentLang];

  for (const k of keys) {
    if (value == null || typeof value !== 'object') {
      // Key no encontrada → fallback al inglés
      value = LOCALES[DEFAULT_LANG];
      for (const k2 of keys) {
        if (value == null || typeof value !== 'object') return key;
        value = value[k2];
      }
      return typeof value === 'string' ? value : key;
    }
    value = value[k];
  }

  return typeof value === 'string' ? value : key;
}

/* ─── BLOQUE 4: applyTranslations() — recorrer el DOM ───── */
/* Selecciona todos los elementos con cualquier atributo
   data-i18n* y aplica la traducción correspondiente.
   Se llama: en init(), en setLanguage(), y en cada
   navegación desde router.js.                              */

function applyTranslations() {

  /* — data-i18n → textContent — */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (el.textContent !== text) el.textContent = text;
  });

  /* — data-i18n-html → innerHTML (textos con <span> u otros tags) — */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = t(key);
  });

  /* — data-i18n-aria → aria-label — */
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    el.setAttribute('aria-label', t(key));
  });

  /* — data-i18n-placeholder → placeholder — */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });

  /* — Sincronizar aria-pressed de los botones del switcher — */
  const btnEN = document.getElementById('lang-en');
  const btnES = document.getElementById('lang-es');
  if (btnEN) btnEN.setAttribute('aria-pressed', currentLang === 'en' ? 'true' : 'false');
  if (btnES) btnES.setAttribute('aria-pressed', currentLang === 'es' ? 'true' : 'false');

  /* — Sincronizar aria-label del theme-toggle con el idioma activo —
     theme.js no se modifica, pero sí podemos actualizar el botón
     que ya está en el DOM con el texto correcto del idioma activo.  */
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-label', isDark ? t('theme.to_light') : t('theme.to_dark'));
  }

  /* — data-i18n-aria-group → aria-label (para .skills-group) — */
  document.querySelectorAll('[data-i18n-aria-group]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-group');
    el.setAttribute('aria-label', t(key));
  });
}

/* ─── BLOQUE 5: updateLangSwitcherUI() ───────────────────── */
/* Actualiza visualmente qué botón (EN / ES) está activo.
   Aplica la clase --active al botón del idioma actual
   y la quita del otro. Los atributos aria-pressed se
   gestionan dentro de applyTranslations().               */

function updateLangSwitcherUI(lang) {
  const btnEN = document.getElementById('lang-en');
  const btnES = document.getElementById('lang-es');

  if (!btnEN || !btnES) return;

  if (lang === 'en') {
    btnEN.classList.add('lang-btn--active');
    btnES.classList.remove('lang-btn--active');
  } else {
    btnES.classList.add('lang-btn--active');
    btnEN.classList.remove('lang-btn--active');
  }
}

/* ─── BLOQUE 6: announceChange() — accesibilidad aria-live  */
/* Anuncia el cambio de idioma a lectores de pantalla
   mediante un elemento aria-live="polite" oculto.         */

function announceChange(lang) {
  const announcer = document.getElementById('i18n-announcer');
  if (!announcer) return;

  const message = lang === 'en'
    ? 'Language changed to English'
    : 'Idioma cambiado a Español';

  /* Limpiar primero para forzar re-anuncio aunque el texto sea igual */
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}

/* ─── BLOQUE 7: setLanguage() — cambiar idioma ───────────── */
/* Punto de entrada principal para cambiar el idioma.
   1. Valida que el lang sea soportado
   2. Actualiza el estado interno
   3. Persiste en localStorage
   4. Actualiza <html lang="">
   5. Aplica traducciones al DOM completo
   6. Actualiza la UI del switcher
   7. Anuncia el cambio para accesibilidad            */

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {
    console.warn(`[i18n] Idioma no soportado: "${lang}". Usando "${DEFAULT_LANG}".`);
    lang = DEFAULT_LANG;
  }

  currentLang = lang;

  /* Persistir en localStorage */
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    /* localStorage puede estar bloqueado en modo privado estricto */
    console.warn('[i18n] No se pudo guardar el idioma en localStorage:', e);
  }

  /* Actualizar atributo lang del <html> */
  document.documentElement.setAttribute('lang', lang);

  /* Aplicar traducciones a todo el DOM actual */
  applyTranslations();

  /* Actualizar UI del botón switcher */
  updateLangSwitcherUI(lang);

  /* Notificar el cambio de idioma globalmente*/
  document.dispatchEvent(new CustomEvent('i18n:langchange', {
    detail: { lang }
  }));
  
  /* Anunciar a lectores de pantalla */
  announceChange(lang);
}

/* ─── BLOQUE 8: getCurrentLang() ─────────────────────────── */
/* Getter simple. Accesible globalmente en window.i18n
   para que el Módulo 06 (chatbot Gemini) pueda leer
   el idioma activo y ajustar su system prompt.          */

function getCurrentLang() {
  return currentLang;
}

/* ─── BLOQUE 9: bindLangButtons() — event listeners ──────── */
/* Adjunta los listeners a los botones EN y ES.
   Se llama desde init() después de que el DOM esté listo.
   Usa comprobación defensiva: si los botones no existen
   (ej: en un entorno de test) no lanza error.           */

function bindLangButtons() {
  const btnEN = document.getElementById('lang-en');
  const btnES = document.getElementById('lang-es');

  btnEN?.addEventListener('click', () => setLanguage('en'));
  btnES?.addEventListener('click', () => setLanguage('es'));
}

/* ─── BLOQUE 10: init() — arranque del motor ─────────────── */
/* Lee la preferencia guardada en localStorage.
   Si no hay preferencia → inglés por defecto.
   Aplica el idioma inicial sin anuncio (el usuario
   no cambió nada, solo cargó la página).             */

function init() {
  let savedLang = DEFAULT_LANG;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      savedLang = stored;
    }
  } catch (e) {
    /* localStorage no disponible → usar default */
  }

  currentLang = savedLang;

  /* Actualizar <html lang> desde el arranque */
  document.documentElement.setAttribute('lang', currentLang);

  /* Aplicar traducciones al DOM estático (navbar, footer) */
  applyTranslations();

  /* Actualizar visual del switcher */
  updateLangSwitcherUI(currentLang);

  /* Conectar los botones */
  bindLangButtons();
}

/* ─── BLOQUE 11: Exposición global ───────────────────────── */
/* Se expone en window.i18n para que:
   - theme.js (IIFE con defer) pueda leer las keys de
     aria-label sin necesidad de importar este módulo
   - El Módulo 06 (chatbot) acceda a getCurrentLang()
   - applyTranslations() sea llamable desde router.js    */

window.i18n = {
  t,
  setLanguage,
  getCurrentLang,
  applyTranslations,
  init,
  onLanguageChange(callback) {
    document.addEventListener('i18n:langchange', callback);
  },
};

/* ─── ARRANQUE ───────────────────────────────────────────── */
/* Los módulos ES esperan DOMContentLoaded automáticamente,
   pero añadimos la guardia explícita por consistencia
   con el patrón ya usado en router.js.                  */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}