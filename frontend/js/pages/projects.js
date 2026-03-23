/* ============================================================
   PROJECTS.JS — Vista: /proyectos
   Módulo 03 · Jose Rivera Portfolio
   ============================================================ */

import { fetchRepos, fetchAllOrgRepos } from '../services/github.js';


export default {

  title: 'Proyectos — Jose Rivera',

  render() {
    return `
      <section class="projects-section" aria-label="Proyectos de Jose Rivera">
        <div class="container">

          <header class="projects-header">
            <span class="projects-header__label">Proyectos</span>
            <h1 class="projects-header__title">
              Lo que he <span>construido</span>
            </h1>
            <p class="projects-header__subtitle">
              Repositorios públicos desde GitHub — actualizados automáticamente.
            </p>
          </header>

          <!-- Grid repos personales -->
          <div
            id="projects-grid"
            class="projects-grid"
            aria-live="polite"
            aria-atomic="true"
          ></div>

          <!-- Sección organizaciones -->
          <div id="orgs-section" class="orgs-section" aria-live="polite">
            <div class="orgs-section__header">
              <span class="projects-header__label">Organizaciones</span>
              <h2 class="orgs-section__title">Trabajo en equipo</h2>
            </div>
            <div
              id="orgs-grid"
              class="projects-grid"
              aria-atomic="true"
            ></div>
          </div>

        </div>
      </section>
    `;
  },

  async init() {
    const grid     = document.getElementById('projects-grid');
    const orgsGrid = document.getElementById('orgs-grid');
    if (!grid || !orgsGrid) return;

    // Mostrar skeletons en ambos grids simultáneamente
    renderSkeletons(grid, 6);
    renderSkeletons(orgsGrid, 3);

    // Fetch paralelo: repos personales + repos de orgs
    const [reposResult, orgsResult] = await Promise.allSettled([
      fetchRepos(),
      fetchAllOrgRepos(),
    ]);

    // — Repos personales —
    if (reposResult.status === 'fulfilled') {
      const repos = reposResult.value;
      if (repos.length === 0) {
        renderEmpty(grid, 'personal');
      } else {
        renderCards(grid, repos);
      }
    } else {
      console.error('[projects.js] Error repos personales:', reposResult.reason);
      renderError(grid, 'personal');
    }

    // — Repos de organizaciones —
    if (orgsResult.status === 'fulfilled') {
      const orgRepos = orgsResult.value;
      if (orgRepos.length === 0) {
        renderEmpty(orgsGrid, 'orgs');
      } else {
        renderCards(orgsGrid, orgRepos, 150); // delay inicial mayor para escalonar
      }
    } else {
      console.error('[projects.js] Error repos de orgs:', orgsResult.reason);
      renderError(orgsGrid, 'orgs');
    }
  },

};


/* ─── renderSkeletons ────────────────────────────────────── */

function renderSkeletons(grid, count = 6) {
  grid.innerHTML = Array(count).fill(0).map(() => `
    <div
      class="project-skeleton"
      aria-busy="true"
      aria-label="Cargando proyectos"
      role="article"
    >
      <div class="skeleton-bar skeleton-bar--lang"></div>
      <div class="skeleton-bar skeleton-bar--title"></div>
      <div class="skeleton-bar skeleton-bar--desc"></div>
      <div class="skeleton-bar skeleton-bar--desc"></div>
      <div class="skeleton-spacer"></div>
      <div class="skeleton-stats">
        <div class="skeleton-bar skeleton-bar--stat"></div>
        <div class="skeleton-bar skeleton-bar--stat"></div>
      </div>
      <div class="skeleton-footer">
        <div class="skeleton-bar skeleton-bar--link"></div>
      </div>
    </div>
  `).join('');
}


/* ─── renderCards ────────────────────────────────────────── */

function renderCards(grid, repos, baseDelay = 0) {
  grid.innerHTML = repos.map(repo => buildCardHTML(repo)).join('');

  const cards = grid.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('project-card--visible');
    }, baseDelay + index * 50);
  });
}


/* ─── buildCardHTML ──────────────────────────────────────── */

function buildCardHTML(repo) {
  const langBadge = repo.language
    ? `
      <div class="project-card__lang" aria-label="Lenguaje: ${repo.language}">
        <span
          class="project-card__lang-dot"
          style="background-color: ${repo.languageColor}"
          aria-hidden="true"
        ></span>
        <span class="project-card__lang-name">${repo.language}</span>
      </div>
    `
    : `<div class="project-card__lang"></div>`;

  const orgBadge = repo.org
    ? `<span class="project-card__org-badge">${repo.org}</span>`
    : '';

  const statsRow = `
    <div class="project-card__stats">
      <span class="project-card__stat" title="Estrellas">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02
            12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        ${repo.stars}
      </span>

      <span class="project-card__stat" title="Forks">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <line x1="6" y1="3" x2="6" y2="15"/>
          <circle cx="18" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="6" cy="6" r="3"/>
          <path d="M18 9a9 9 0 0 1-9 9"/>
        </svg>
        ${repo.forks}
      </span>

      <span class="project-card__date" aria-label="Última actualización: ${repo.updatedLabel}">
        ${repo.updatedLabel}
      </span>
    </div>
  `;

  return `
    <article class="project-card" role="article">

      <div class="project-card__top">
        ${langBadge}
        ${orgBadge}
      </div>

      <h2 class="project-card__name">${repo.displayName}</h2>

      <p class="project-card__description">
        ${repo.description}
      </p>

      ${statsRow}

      <div class="project-card__footer">
        
         <a href="${repo.url}"
          class="project-card__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver ${repo.displayName} en GitHub"
        >
          Ver en GitHub
          
        </a>
      </div>

    </article>
  `;
}


/* ─── renderEmpty ────────────────────────────────────────── */

function renderEmpty(grid, type = 'personal') {
  const isOrg = type === 'orgs';
  grid.innerHTML = `
    <div class="projects-empty">
      <span class="projects-empty__icon" aria-hidden="true">${isOrg ? '🏢' : '📭'}</span>
      <p class="projects-empty__title">
        ${isOrg ? 'Sin repos de organizaciones' : 'Sin proyectos disponibles'}
      </p>
      <p class="projects-empty__text">
        ${isOrg
          ? 'No se encontraron repositorios públicos en tus organizaciones.'
          : 'Aún no hay proyectos públicos disponibles.'}
      </p>
      
        <a href="https://github.com/JoseRivera-07"
        class="projects-empty__link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver perfil de Jose Rivera en GitHub"
      >
        Ver perfil en GitHub 
      </a>
    </div>
  `;
}


/* ─── renderError ────────────────────────────────────────── */

function renderError(grid, type = 'personal') {
  const cacheKey = type === 'orgs' ? 'github_orgs_repos' : 'github_repos';

  grid.innerHTML = `
    <div class="projects-error" role="alert">
      <span class="projects-error__icon" aria-hidden="true">⚠️</span>
      <p class="projects-error__title">No se pudieron cargar los proyectos</p>
      <p class="projects-error__text">
        Hubo un problema al conectar con GitHub. Verifica tu conexión
        e inténtalo de nuevo.
      </p>
      <button class="projects-error__btn" id="retry-btn-${type}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          width="16" height="16" aria-hidden="true">
          <polyline points="1 4 1 10 7 10"/>
          <path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
        </svg>
        Reintentar
      </button>
    </div>
  `;

  const fetchFn = type === 'orgs' ? fetchAllOrgRepos : fetchRepos;

  document.getElementById(`retry-btn-${type}`)?.addEventListener('click', () => {
    sessionStorage.removeItem(cacheKey);
    renderSkeletons(grid, type === 'orgs' ? 3 : 6);

    fetchFn()
      .then(repos => {
        if (repos.length === 0) {
          renderEmpty(grid, type);
        } else {
          renderCards(grid, repos);
        }
      })
      .catch(err => {
        console.error(`[projects.js] Error en reintento (${type}):`, err);
        renderError(grid, type);
      });
  });
}