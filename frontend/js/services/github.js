
/* ============================================================
   GITHUB.JS — Servicio de datos: GitHub REST API
   Módulo 03 · Proyectos · Jose Rivera Portfolio
   ============================================================ */


/* ─── BLOQUE 1: Constantes de configuración ─────────────── */

const GITHUB_USER  = 'JoseRivera-07';
const CACHE_KEY    = 'github_repos';


const CACHE_KEY_ORGS = 'github_orgs_repos';
const MAX_REPOS    = 9;

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`
  + '?sort=updated&per_page=20&type=public';

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

const DEFAULT_LANGUAGE_COLOR = '#10B981';


/* ─── BLOQUE 2: getLanguageColor ─────────────────────────── */

export function getLanguageColor(language) {
  if (!language) return DEFAULT_LANGUAGE_COLOR;
  return LANGUAGE_COLORS[language] ?? DEFAULT_LANGUAGE_COLOR;
}


/* ─── BLOQUE 3: formatDate ───────────────────────────────── */

export function formatDate(dateString) {
  if (!dateString) return '';

  const now    = Date.now();
  const then   = new Date(dateString).getTime();
  const diffMs = now - then;

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

function transformRepo(repo, orgName = null) {
  const name        = repo.name ?? '';
  const displayName = name
    .replace(/-/g, ' ')
    .replace(/^./, ch => ch.toUpperCase());

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
    org:           orgName,
  };
}


/* ─── BLOQUE 5: fetchRepos — repos personales ───────────── */

export async function fetchRepos() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    console.info('[GitHub] Repos personales desde caché.');
    return JSON.parse(cached);
  }

  const response = await fetch(API_URL, { headers: HEADERS });

  const remaining = response.headers.get('X-RateLimit-Remaining');
  const resetTs   = response.headers.get('X-RateLimit-Reset');
  const resetTime = resetTs
    ? new Date(Number(resetTs) * 1000).toLocaleTimeString('es-CO')
    : '—';
  console.info(`[GitHub] Rate limit restante: ${remaining ?? '?'} | Reset: ${resetTime}`);

  if (!response.ok) {
    throw new Error(`GitHub API respondió con ${response.status} ${response.statusText}`);
  }

  const rawRepos = await response.json();
  const IGNORED_NAMES = /^\.|^\.github$|^config$/i;

  const filtered = rawRepos.filter(repo => {
    if (repo.fork)                     return false;
    if (!repo.description?.trim())     return false;
    if (IGNORED_NAMES.test(repo.name)) return false;
    return true;
  });

  filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const repos = filtered.slice(0, MAX_REPOS).map(r => transformRepo(r));

  sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos));
  console.info(`[GitHub] ${repos.length} repos personales cargados.`);

  return repos;
}


/* ─── BLOQUE 6: fetchUserOrgs — obtener organizaciones ─── */

export async function fetchUserOrgs() {
  const response = await fetch(
    'https://api.github.com/user/orgs?per_page=100',
    { headers: HEADERS }
  );

  if (!response.ok) {
    throw new Error(`Error obteniendo orgs: ${response.status}`);
  }

  const orgs = await response.json();
  console.info(`[GitHub] ${orgs.length} organizaciones encontradas.`);
  return orgs;
}


/* ─── BLOQUE 7: fetchOrgRepos — repos de una org ────────── */

async function fetchOrgRepos(orgLogin) {
  const response = await fetch(
    `https://api.github.com/orgs/${orgLogin}/repos?sort=updated&per_page=20&type=public`,
    { headers: HEADERS }
  );

  if (!response.ok) {
    console.warn(`[GitHub] No se pudieron cargar repos de org: ${orgLogin}`);
    return [];
  }

  const rawRepos = await response.json();
  const IGNORED_NAMES = /^\.|^\.github$|^config$/i;

  return rawRepos
    .filter(repo => {
      if (repo.fork)                     return false;
      if (!repo.description?.trim())     return false;
      if (IGNORED_NAMES.test(repo.name)) return false;
      return true;
    })
    .map(r => transformRepo(r, orgLogin));
}


/* ─── BLOQUE 8: fetchAllOrgRepos — todas las orgs ───────── */

export async function fetchAllOrgRepos() {
  const cached = sessionStorage.getItem(CACHE_KEY_ORGS);
  if (cached) {
    console.info('[GitHub] Repos de orgs desde caché.');
    return JSON.parse(cached);
  }

  const orgs = await fetchUserOrgs();

  // Fetch paralelo de todas las orgs
  const results = await Promise.allSettled(
    orgs.map(org => fetchOrgRepos(org.login))
  );

  // Aplanar resultados, ignorar los que fallaron
  const allRepos = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value);

  // Ordenar por fecha descendente
  allRepos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  sessionStorage.setItem(CACHE_KEY_ORGS, JSON.stringify(allRepos));
  console.info(`[GitHub] ${allRepos.length} repos de orgs cargados.`);

  return allRepos;
}