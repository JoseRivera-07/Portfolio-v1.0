/* ============================================================
   GITHUB.JS — Servicio de datos: GitHub REST API
   Módulo 03 · Proyectos · Jose Rivera Portfolio
   ============================================================
   Responsabilidades:
     - Comunicación con la GitHub API (fetch nativo)
     - Filtrado y transformación de repos
     - Caché en sessionStorage
     - Utilidades de presentación (colores, fechas)

   Regla de oro: este módulo NO toca el DOM.
   Solo recibe datos, los procesa y los devuelve.
   ============================================================ */


/* ─── BLOQUE 1: Constantes de configuración ─────────────── */

const GITHUB_USER    = 'JoseRivera-07';
const CACHE_KEY      = 'github_repos';
const MAX_REPOS      = 9;

const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`
  + '?sort=updated&per_page=20&type=public';

// Mapa de colores de lenguajes de programación
// Fuente de referencia: github-linguist
const LANGUAGE_COLORS = {
  JavaScript:  '#F7DF1E',
  TypeScript:  '#3178C6',
  Python:      '#3776AB',
  HTML:        '#E34F26',
  CSS:         '#1572B6',
  Java:        '#007396',
  'C#':        '#239120',
  'C++':       '#F34B7D',
  C:           '#555555',
  PHP:         '#777BB4',
  Ruby:        '#CC342D',
  Go:          '#00ADD8',
  Rust:        '#DEA584',
  Swift:       '#FA7343',
  Kotlin:      '#7F52FF',
  Dart:        '#00B4AB',
  Shell:       '#89E051',
  Vue:         '#41B883',
  Svelte:      '#FF3E00',
};

// Color de fallback: verde esmeralda del portafolio
const DEFAULT_LANGUAGE_COLOR = '#10B981';


/* ─── BLOQUE 2: getLanguageColor ─────────────────────────── */
/* Recibe el nombre de un lenguaje y retorna su color hex.
   Si no está mapeado, retorna el verde del portafolio.     */

export function getLanguageColor(language) {
  if (!language) return DEFAULT_LANGUAGE_COLOR;
  return LANGUAGE_COLORS[language] ?? DEFAULT_LANGUAGE_COLOR;
}


/* ─── BLOQUE 3: formatDate ───────────────────────────────── */
/* Recibe una fecha ISO de GitHub y retorna un string
   legible en español: "hace 2 días", "hace 3 semanas", etc. */

export function formatDate(dateString) {
  if (!dateString) return '';

  const now      = Date.now();
  const then     = new Date(dateString).getTime();
  const diffMs   = now - then;

  const MINUTE = 60 * 1000;
  const HOUR   = 60 * MINUTE;
  const DAY    = 24 * HOUR;
  const WEEK   = 7  * DAY;
  const MONTH  = 30 * DAY;
  const YEAR   = 365 * DAY;

  if (diffMs < HOUR) {
    const mins = Math.floor(diffMs / MINUTE);
    return mins <= 1 ? 'hace un momento' : `hace ${mins} minutos`;
  }

  if (diffMs < DAY) {
    const hours = Math.floor(diffMs / HOUR);
    return hours === 1 ? 'hace 1 hora' : `hace ${hours} horas`;
  }

  if (diffMs < WEEK) {
    const days = Math.floor(diffMs / DAY);
    return days === 1 ? 'hace 1 día' : `hace ${days} días`;
  }

  if (diffMs < MONTH) {
    const weeks = Math.floor(diffMs / WEEK);
    return weeks === 1 ? 'hace 1 semana' : `hace ${weeks} semanas`;
  }

  if (diffMs < YEAR) {
    const months = Math.floor(diffMs / MONTH);
    return months === 1 ? 'hace 1 mes' : `hace ${months} meses`;
  }

  const years = Math.floor(diffMs / YEAR);
  return years === 1 ? 'hace 1 año' : `hace ${years} años`;
}


/* ─── BLOQUE 4: transformRepo ────────────────────────────── */
/* Función interna. Convierte un objeto raw de la API
   al contrato de datos limpio que consume la vista.        */

function transformRepo(repo) {
  const name        = repo.name ?? '';
  const displayName = name
    .replace(/-/g, ' ')                          // guiones → espacios
    .replace(/^./, ch => ch.toUpperCase());      // capitalizar primera letra

  return {
    id:            repo.id,
    name,
    displayName,
    description:   repo.description,
    language:      repo.language ?? null,
    languageColor: getLanguageColor(repo.language),
    stars:         repo.stargazers_count ?? 0,
    forks:         repo.forks_count ?? 0,
    updatedAt:     repo.updated_at,
    updatedLabel:  formatDate(repo.updated_at),
    url:           repo.html_url,
  };
}


/* ─── BLOQUE 5: fetchRepos ───────────────────────────────── */
/* Función principal exportada.
   Orden de operaciones:
     1. Revisar caché en sessionStorage
     2. Si no hay caché → fetch a la API
     3. Loguear X-RateLimit-Remaining en consola
     4. Filtrar: sin forks, sin repos sin descripción,
        sin nombres que empiecen por "." o sean de config
     5. Ordenar por updated_at DESC (ya viene ordenado,
        pero lo reforzamos para garantizar consistencia)
     6. Limitar a MAX_REPOS (9)
     7. Transformar cada repo al contrato de datos
     8. Guardar en caché y retornar                        */

export async function fetchRepos() {

  // 1 — Revisar caché en sessionStorage
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    console.info('[GitHub] Repos cargados desde caché (sessionStorage).');
    return JSON.parse(cached);
  }

  // 2 — Fetch a la API
  const response = await fetch(API_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  // 3 — Loguear rate limit restante
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const resetTs   = response.headers.get('X-RateLimit-Reset');
  const resetTime = resetTs
    ? new Date(Number(resetTs) * 1000).toLocaleTimeString('es-CO')
    : '—';
  console.info(
    `[GitHub] Rate limit restante: ${remaining ?? '?'} | Reset: ${resetTime}`
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API respondió con ${response.status} ${response.statusText}`
    );
  }

  const rawRepos = await response.json();

  // 4 — Filtros
  const IGNORED_NAMES = /^\.|^\.github$|^config$/i;

  const filtered = rawRepos.filter(repo => {
    if (repo.fork)                         return false; // excluir forks
    if (!repo.description?.trim())         return false; // excluir sin descripción
    if (IGNORED_NAMES.test(repo.name))     return false; // excluir configs
    return true;
  });

  // 5 — Ordenar por updated_at descendente (refuerzo)
  filtered.sort((a, b) =>
    new Date(b.updated_at) - new Date(a.updated_at)
  );

  // 6 & 7 — Limitar y transformar
  const repos = filtered
    .slice(0, MAX_REPOS)
    .map(transformRepo);

  // 8 — Guardar en caché y retornar
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos));
  console.info(`[GitHub] ${repos.length} repos cargados y guardados en caché.`);

  return repos;
}