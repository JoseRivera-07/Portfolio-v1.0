/* ============================================================
   EXPERIENCE.JS — Página de Experiencia / Timeline
   Módulo 05 · Jose Rivera Portfolio
   ============================================================ */

const EXPERIENCE_DATA = [
  {
    institutionKey: 'experience.entries.e1.institution',
    instDescKey: 'experience.entries.e1.inst_desc',
    titleKey: 'experience.entries.e1.title',
    periodKey: 'experience.entries.e1.period',
    badgeKey: 'experience.entries.e1.badge',
    badgeStyle: 'active',
    bulletKeys: [
      'experience.entries.e1.b1',
      'experience.entries.e1.b2',
      'experience.entries.e1.b3',
      'experience.entries.e1.b4',
      'experience.entries.e1.b5',
      'experience.entries.e3.b6',
      'experience.entries.e3.b7',
    ],
  },
  {
    institutionKey: 'experience.entries.e2.institution',
    instDescKey: 'experience.entries.e2.inst_desc',
    titleKey: 'experience.entries.e2.title',
    periodKey: 'experience.entries.e2.period',
    badgeKey: 'experience.entries.e2.badge',
    badgeStyle: 'progress',
    bulletKeys: [
      'experience.entries.e2.b1',
      'experience.entries.e2.b2',
      'experience.entries.e2.b3',
    ],
  },
  {
    institutionKey: 'experience.entries.e3.institution',
    instDescKey: 'experience.entries.e3.inst_desc',
    titleKey: 'experience.entries.e3.title',
    periodKey: 'experience.entries.e3.period',
    badgeKey: 'experience.entries.e3.badge',
    badgeStyle: 'base',
    bulletKeys: [
      'experience.entries.e3.b1',
      'experience.entries.e3.b2',
      'experience.entries.e3.b3',
      'experience.entries.e3.b4',
      'experience.entries.e3.b5',
    ],
  },
]

const SCRUM_DATA = [
  {
    nameKey: 'experience.scrum.planning.name',
    descKey: 'experience.scrum.planning.desc',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  },
  {
    nameKey: 'experience.scrum.daily.name',
    descKey: 'experience.scrum.daily.desc',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
  {
    nameKey: 'experience.scrum.review.name',
    descKey: 'experience.scrum.review.desc',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  },
  {
    nameKey: 'experience.scrum.retro.name',
    descKey: 'experience.scrum.retro.desc',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
]

/* ─── Helpers de render ──────────────────────────────────── */

function renderBullets(bulletKeys) {
  return bulletKeys.map(key => `
    <li class="experience-card__bullet">
      ${window.i18n.t(key)}
    </li>
  `).join('')
}

function renderEntry(entry, index) {
  const t = window.i18n.t.bind(window.i18n)
  const side = index % 2 === 0 ? 'experience-entry--left' : ''
  const period = entry.periodKey

  return `
    <li class="experience-entry ${side}" role="listitem">
      <div class="experience-entry__dot" aria-hidden="true"></div>
      <article class="experience-card">

        <div class="experience-card__head">
          <div>
            <p class="experience-card__institution">
              ${t(entry.institutionKey)}
            </p>
            <p class="experience-card__inst-desc">
              ${t(entry.instDescKey)}
            </p>
          </div>
          <time class="experience-card__period"
                datetime="${t(period).replace(/[^0-9]/g, '').slice(0, 4)}">
            ${t(period)}
          </time>
        </div>

        <hr class="experience-card__divider">

        <div class="experience-card__body-head">
          <span class="experience-badge experience-badge--${entry.badgeStyle}">
            ${t(entry.badgeKey)}
          </span>
          <h2 class="experience-card__title">
            ${t(entry.titleKey)}
          </h2>
        </div>

        <ul class="experience-card__bullets">
          ${renderBullets(entry.bulletKeys)}
        </ul>

      </article>
    </li>
  `
}

function renderScrumCard(item) {
  const t = window.i18n.t.bind(window.i18n)
  return `
    <div class="scrum-card">
      <div class="scrum-card__icon">${item.icon}</div>
      <p class="scrum-card__name">${t(item.nameKey)}</p>
      <p class="scrum-card__desc">${t(item.descKey)}</p>
    </div>
  `
}

/* ─── Módulo exportado ───────────────────────────────────── */

export default {
  title: 'Experience — Jose Rivera',

  render() {
    const t = window.i18n.t.bind(window.i18n)

    const entriesHTML = EXPERIENCE_DATA
      .map((entry, i) => renderEntry(entry, i))
      .join('')

    const scrumHTML = SCRUM_DATA
      .map(item => renderScrumCard(item))
      .join('')

    return `
      <section
        class="experience-section container"
        aria-labelledby="experience-title"
      >
        <header class="experience-header">
          <span class="experience-header__label">
            ${t('experience.label')}
          </span>
          <h1 class="experience-header__title" id="experience-title">
            ${t('experience.title').replace(
      /Experiencia|Experience/,
      match => `<span>${match}</span>`
    )}
          </h1>
          <p class="experience-header__subtitle">
            ${t('experience.subtitle')}
          </p>
        </header>

        <ol class="timeline" role="list">
          ${entriesHTML}
        </ol>

        <div class="scrum-block">
          <div class="scrum-block__header">
            <h2 class="scrum-block__title">
              ${t('experience.scrum.block_title')}
            </h2>
            <p class="scrum-block__subtitle">
              ${t('experience.scrum.block_subtitle')}
            </p>
          </div>
          <div class="scrum-grid">
            ${scrumHTML}
          </div>
        </div>

      </section>
    `
  },

  init() {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const animate = (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add(
          entry.target.classList.contains('scrum-card')
            ? 'scrum-card--visible'
            : 'experience-entry--visible'
        )
        observer.unobserve(entry.target)
      })
    }

    const observer = new IntersectionObserver(animate, {
      threshold: 0.15,
    })

    const targets = document.querySelectorAll(
      '.experience-entry, .scrum-card'
    )

    targets.forEach((el, i) => {
      if (reducedMotion) {
        el.classList.add(
          el.classList.contains('scrum-card')
            ? 'scrum-card--visible'
            : 'experience-entry--visible'
        )
        return
      }
      el.style.transitionDelay = `${i * 100}ms`
      observer.observe(el)
    })
    // Re-renderizar cuando cambia el idioma
    window.i18n.onLanguageChange(() => {
      const appEl = document.getElementById('app')
      if (!appEl || !appEl.querySelector('.experience-section')) return
      appEl.innerHTML = this.render()
      this.init()
    })
  },
}