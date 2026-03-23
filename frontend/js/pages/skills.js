/* ============================================================
   SKILLS.JS — Vista: /skills
   Módulo 04 · Jose Rivera Portfolio
   ============================================================ */


/* ─── BLOQUE 1: Data de skills ───────────────────────────── */
/* Fuente de verdad local. Ninguna llamada a API.
   type: 'languages' marca el grupo con diseño especial.    */

const SKILLS = [
  {
    group: 'Frontend',
    items: [
      {
        name: 'HTML5',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
      },
      {
        name: 'CSS3',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>`,
      },
      {
        name: 'JavaScript (ES6+)',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      },
    ],
  },
  {
    group: 'Backend',
    items: [
      {
        name: 'Node.js',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 8 14 16 14"/></svg>`,
      },
      {
        name: 'Express',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/></svg>`,
      },
    ],
  },
  {
    group: 'Base de Datos',
    items: [
      {
        name: 'PostgreSQL',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
      },
      {
        name: 'pgAdmin4',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
      },
    ],
  },
  {
    group: 'Herramientas',
    items: [
      {
        name: 'Git',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>`,
      },
      {
        name: 'GitHub',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
      },
      {
        name: 'Vite',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      },
      {
        name: 'npm',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
      },
    ],
  },
  {
    group: 'Inteligencia Artificial',
    items: [
      {
        name: 'Gemini AI',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 4-2.34 7.44-5.7 9.11M12 2a10 10 0 0 0-10 10c0 4 2.34 7.44 5.7 9.11"/><circle cx="12" cy="12" r="3"/></svg>`,
      },
    ],
  },
  {
    group: 'Metodologías',
    items: [
      {
        name: 'Scrum',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      },
      {
        name: 'Agile',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.18-4.96"/></svg>`,
      },
    ],
  },
  {
    group: 'Idiomas',
    type: 'languages',
    items: [
      {
        name: 'Español',
        level: 'Nativo',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      },
      {
        name: 'Inglés',
        level: 'B1 — lectura técnica fluida',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      },
    ],
  },
];


/* ─── BLOQUE 2: Helper — renderizar un badge ─────────────── */
/* Devuelve el HTML string de un badge.
   Si el grupo es 'languages', usa la variante apilada
   con el nivel visible debajo del nombre.                  */

function renderBadge(item, isLanguage = false) {
  if (isLanguage) {
    return `
      <div class="skill-badge skill-badge--language">
        <span class="skill-badge__top">
          <span class="skill-badge__icon">${item.icon}</span>
          ${item.name}
        </span>
        <small class="skill-badge__level">${item.level}</small>
      </div>
    `;
  }

  return `
    <div class="skill-badge">
      <span class="skill-badge__icon">${item.icon}</span>
      ${item.name}
    </div>
  `;
}


/* ─── BLOQUE 3: Helper — renderizar un grupo ─────────────── */
/* Cada grupo tiene: label de categoría + contenedor de
   badges. El atributo data-group-index permite escalonar
   la animación de entrada en init().                       */

function renderGroup(groupData, index) {
  const isLanguage = groupData.type === 'languages';
  const badges = groupData.items
    .map(item => renderBadge(item, isLanguage))
    .join('');

  return `
    <div
      class="skills-group"
      role="group"
      aria-label="${groupData.group}"
      data-group-index="${index}"
    >
      <span class="skills-group__label">${groupData.group}</span>
      <div class="skills-group__badges">
        ${badges}
      </div>
    </div>
  `;
}


/* ─── BLOQUE 4: Módulo exportado ─────────────────────────── */

export default {

  title: 'Skills — Jose Rivera',

  /* render() — construye el HTML completo de la vista.
     El router lo inyecta en el DOM antes de llamar init(). */
  render() {
    const groups = SKILLS
      .map((group, index) => renderGroup(group, index))
      .join('');

    return `
      <section class="skills-section" aria-label="Skills y tecnologías">
        <div class="container">

          <header class="skills-header">
            <span class="skills-header__label">Skills</span>
            <h1 class="skills-header__title">
              Technologies I <span>work with</span>
            </h1>
            <p class="skills-header__subtitle">
              Tools and technologies I use to build fullstack applications.
            </p>
          </header>

          <div class="skills-grid">
            ${groups}
          </div>

        </div>
      </section>
    `;
  },

  /* init() — llamado por el router después del fade-in,
     cuando el DOM ya tiene el HTML de la vista.
     Registra un IntersectionObserver sobre cada .skills-group
     para añadir la clase --visible al entrar en viewport.  */
  init() {
    const groups = document.querySelectorAll('.skills-group');
    if (!groups.length) return;

    /* Si el usuario prefiere sin movimiento, marcamos
       todos como visibles de forma inmediata y salimos.   */
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      groups.forEach(g => g.classList.add('skills-group--visible'));
      return;
    }

    /* Observer: threshold 0.1 — el grupo se activa cuando
       al menos el 10 % de su área entra en el viewport.
       El escalonado (delay) se calcula con el índice del
       grupo para que aparezcan en cascada al hacer scroll. */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.groupIndex);
          const delay = index * 80; // 80ms entre grupos

          setTimeout(() => {
            entry.target.classList.add('skills-group--visible');
          }, delay);

          // Una vez visible, dejar de observar ese grupo
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    groups.forEach(g => observer.observe(g));
  },

};