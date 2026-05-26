/* ============================================================
   SKILLS.JS — Vista: /skills
   Módulo 04 · Jose Rivera Portfolio
   ============================================================ */


/* ─── BLOQUE 1: Data de skills ───────────────────────────── */
/* groupKey: key de i18n para el nombre del grupo.
   levelKey: key de i18n para el nivel (solo type:'languages').
   El motor t() resuelve ambas en tiempo de render.          */

const SKILLS = [
  {
    group: 'Frontend',
    groupKey: 'skills.groups.frontend',
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
    groupKey: 'skills.groups.backend',
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
    groupKey: 'skills.groups.database',
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
    groupKey: 'skills.groups.tools',
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
    groupKey: 'skills.groups.ai',
    items: [
      {
        name: 'Gemini AI',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 4-2.34 7.44-5.7 9.11M12 2a10 10 0 0 0-10 10c0 4 2.34 7.44 5.7 9.11"/><circle cx="12" cy="12" r="3"/></svg>`,
      },
    ],
  },
  {
    group: 'Metodologías',
    groupKey: 'skills.groups.methodologies',
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
    group: 'Cloud',
    groupKey: 'skills.groups.cloud',
    items: [
      {
        name: 'AWS EC2',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      },
      {
        name: 'AWS S3',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
      },
      {
        name: 'AWS VPC',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M9 9h6v6H9z"/></svg>`,
      },
      {
        name: 'Security Groups',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      },
      {
        name: 'Peering Connections',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7M11 18H8a2 2 0 0 1-2-2V9"/></svg>`,
      },
    ],
  },
  {
    group: 'Data & Analytics',
    groupKey: 'skills.groups.data',
    items: [
      {
        name: 'Python',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      },
      {
        name: 'Pandas',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>`,
      },
      {
        name: 'Apache Spark',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      },
      {
        name: 'Apache Airflow',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.18-4.96"/></svg>`,
      },
      {
        name: 'Power BI',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      },
      {
        name: 'RabbitMQ',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      },
      {
        name: 'uv (Astral)',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 8 14 16 14"/></svg>`,
      },
    ],
  },
  {
    group: 'Idiomas',
    groupKey: 'skills.groups.languages',
    type: 'languages',
    items: [
      {
        name: 'Español',
        levelKey: 'skills.levels.native',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      },
      {
        name: 'Inglés',
        levelKey: 'skills.levels.english_level',
        icon: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      },
    ],
  },
];


/* ─── BLOQUE 2: renderBadge ──────────────────────────────── */
/* Para badges de idioma usa levelKey para resolver el nivel
   en el idioma activo. Para el resto, solo nombre e ícono.  */

function renderBadge(item, isLanguage = false) {
  if (isLanguage) {
    return `
      <div class="skill-badge skill-badge--language">
        <span class="skill-badge__top">
          <span class="skill-badge__icon">${item.icon}</span>
          ${item.name}
        </span>
        <small class="skill-badge__level"
               data-i18n="${item.levelKey}">
          ${window.i18n?.t(item.levelKey) ?? item.levelKey}
        </small>
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


function renderGroup(groupData, index) {
  const isLanguage = groupData.type === 'languages';
  const groupName = window.i18n?.t(groupData.groupKey) ?? groupData.group;
  const badges = groupData.items
    .map(item => renderBadge(item, isLanguage))
    .join('');

  return `
    <div
      class="skills-group"
      role="group"
      aria-label="${groupName}"
      data-group-index="${index}"
      data-i18n-aria-group="${groupData.groupKey}"
    >
      <span class="skills-group__label"
            data-i18n="${groupData.groupKey}">
        ${groupName}
      </span>
      <div class="skills-group__badges">
        ${badges}
      </div>
    </div>
  `;
}


/* ─── BLOQUE 4: Módulo exportado ─────────────────────────── */

export default {

  title: 'Skills — Jose Rivera',

  render() {
    const groups = SKILLS
      .map((group, index) => renderGroup(group, index))
      .join('');

    return `
      <section class="skills-section" aria-label="Skills y tecnologías">
        <div class="container">

          <header class="skills-header">
            <span class="skills-header__label" data-i18n="skills.label">Skills</span>
            <h1 class="skills-header__title"
                data-i18n-html="skills.title">
              Technologies I <span>work with</span>
            </h1>
            <p class="skills-header__subtitle" data-i18n="skills.subtitle">
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

  init() {
    const groups = document.querySelectorAll('.skills-group');
    if (!groups.length) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      groups.forEach(g => g.classList.add('skills-group--visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.groupIndex);
          const delay = index * 80;

          setTimeout(() => {
            entry.target.classList.add('skills-group--visible');
          }, delay);

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    groups.forEach(g => observer.observe(g));
  },

};