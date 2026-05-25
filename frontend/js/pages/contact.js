/* ============================================================
   CONTACT PAGE
   Sin formulario — tarjetas de contacto directo
   i18n: window.i18n.t(key) en render()
         data-i18n en textos que applyTranslations() actualiza
   ============================================================ */

const CONTACT_DATA = [
  {
    id: 'whatsapp',
    iconSvg: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
               -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075
               -.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059
               -.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52
               .149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52
               -.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
               -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
               -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074
               .149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625
               .712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413
               .248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            fill="#25D366"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413
               A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18
               a7.946 7.946 0 01-4.077-1.117l-.292-.174-3.035.862.872-3.093-.19-.317
               A7.948 7.948 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"
            fill="#25D366"/>
    </svg>`,
    titleKey: 'contact.cards.whatsapp.title',
    descKey: 'contact.cards.whatsapp.desc',
    btnKey: 'contact.cards.whatsapp.btn',
    href: 'https://wa.me/573135312854',
    detail: null,
    external: true,
    ariaLabel: 'contact.cards.whatsapp.aria'
  },
  {
    id: 'email',
    iconSvg: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2"
            stroke="var(--color-primary)" stroke-width="1.75" fill="none"/>
      <path d="M2 8l10 7 10-7"
            stroke="var(--color-primary)" stroke-width="1.75"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    titleKey: 'contact.cards.email.title',
    descKey: 'contact.cards.email.desc',
    btnKey: 'contact.cards.email.btn',
    href: 'mailto:miguel.quiroz0310@gmail.com',
    detail: 'miguel.quiroz0310@gmail.com',
    external: false,
    ariaLabel: 'contact.cards.email.aria'
  },
  {
    id: 'github',
    iconSvg: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489
               .5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703
               -2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
               -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032
               .892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338
               -2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
               -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026
               A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337
               c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
               .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943
               .359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747
               0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
            fill="var(--text-primary)"/>
    </svg>`,
    titleKey: 'contact.cards.github.title',
    descKey: 'contact.cards.github.desc',
    btnKey: 'contact.cards.github.btn',
    href: 'https://github.com/JoseRivera-07',
    detail: '@JoseRivera-07',
    external: true,
    ariaLabel: 'contact.cards.github.aria'
  }
]

/* ---- Helper: construye una tarjeta ---- */
function buildCard(card) {
  const t = window.i18n.t.bind(window.i18n)

  const externalAttrs = card.external
    ? `target="_blank" rel="noopener noreferrer"`
    : ''

  const detailHtml = card.detail
    ? `<span class="contact-card__detail">${card.detail}</span>`
    : ''

  const btnText = t(card.btnKey)

  return `
    <article class="contact-card" role="article" id="contact-card-${card.id}">
      <div class="contact-card__icon" aria-hidden="true">
        ${card.iconSvg}
      </div>

      <h2 class="contact-card__title" data-i18n="${card.titleKey}">
        ${t(card.titleKey)}
      </h2>

      <p class="contact-card__desc" data-i18n="${card.descKey}">
        ${t(card.descKey)}
      </p>

      ${detailHtml}

      <a
        class="contact-card__btn"
        href="${card.href}"
        ${externalAttrs}
        data-i18n="${card.btnKey}"
        aria-label="${btnText}"
      >${btnText}</a>
    </article>
  `
}

/* ============================================================
   MÓDULO PRINCIPAL
   ============================================================ */
export default {
  title: 'Contact — Jose Rivera',

  render() {
    const t = window.i18n.t.bind(window.i18n)

    const cardsHtml = CONTACT_DATA.map(buildCard).join('')

    return `
      <section
        class="contact"
        aria-labelledby="contact-title"
      >
        <div class="contact__inner">

          <!-- Header -->
          <header class="contact-header">
            <span
              class="contact-header__label"
              data-i18n="contact.label"
            >
              ${t('contact.label')}
            </span>
          
            <h1
              class="contact-header__title"
              data-i18n="contact.title"
              id="contact-title"
            >
              ${t('contact.title').replace(
                /Contacto|Contact/,
                match => `<span>${match}</span>`
              )}
            </h1>

            <p
              class="contact-header__subtitle"
              data-i18n="contact.subtitle"
            >
              ${t('contact.subtitle')}
            </p>
          </header>

          <!-- Badge disponibilidad -->
          <div class="contact__availability">
            <span class="contact__badge">
              <span class="contact__badge-dot" aria-hidden="true"></span>
              <span data-i18n="contact.available">
                ${t('contact.available')}
              </span>
            </span>
          </div>

          <!-- Grid de tarjetas -->
          <div class="contact__grid">
            ${cardsHtml}
          </div>

          <!-- Nota LinkedIn -->
          <p
            class="contact__linkedin-note"
            data-i18n="contact.linkedin_soon"
          >
            ${t('contact.linkedin_soon')}
          </p>

        </div>
      </section>
    `
  },

  init() {
    /* Respetar prefers-reduced-motion:
       si está activo, las tarjetas ya son visibles
       por la regla CSS — no necesitamos observer */
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) return

    const cards = document.querySelectorAll('.contact-card')

    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const card = entry.target
          const index = Number(card.dataset.cardIndex ?? 0)

          setTimeout(() => {
            card.classList.add('contact-card--visible')
          }, index * 100)

          observer.unobserve(card)
        })
      },
      { threshold: 0.15 }
    )

    cards.forEach((card, index) => {
      card.dataset.cardIndex = index
      observer.observe(card)
    })
  }
}