// frontend/js/locales/es.js

export default {
  nav: {
    home: 'Inicio',
    projects: 'Proyectos',
    skills: 'Skills',
    experience: 'Experiencia',
    contact: 'Contacto',
  },

  hero: {
    available: 'Disponible para trabajar',
    role: 'Junior Fullstack Developer & Data Analyst',
    bio: 'Construyo aplicaciones web completas, desde la interfaz hasta la base de datos. Apasionado por el código limpio, las buenas prácticas y seguir aprendiendo cada día desde Medellín, Colombia.',
    cta_projects: 'Ver Proyectos',
    cta_contact: 'Contáctame',
    scroll_hint: 'Ir a la sección de proyectos',
    code_comment1: '// Junior Fullstack Developer & Data Analyst',
    code_comment2: '// open to opportunities',
  },

  projects: {
    label: 'Proyectos',
    title: 'Lo que he <span>construido</span>',
    subtitle: 'Repositorios públicos desde GitHub — actualizados automáticamente.',
    orgs_label: 'Organizaciones',
    orgs_title: 'Trabajo en equipo',
    loading: 'Cargando proyectos...',
    error_title: 'No se pudieron cargar los proyectos',
    error_text: 'Hubo un problema al conectar con GitHub. Verifica tu conexión e inténtalo de nuevo.',
    retry: 'Reintentar',
    view_github: 'Ver en GitHub',
    empty_personal_title: 'Sin proyectos disponibles',
    empty_personal_text: 'Aún no hay proyectos públicos disponibles.',
    empty_orgs_title: 'Sin repos de organizaciones',
    empty_orgs_text: 'No se encontraron repositorios públicos en tus organizaciones.',
    view_profile: 'Ver perfil en GitHub',
  },

  skills: {
    label: 'Habilidades',
    title: 'Tecnologías con las que <span>trabajo</span>',
    subtitle: 'Herramientas y tecnologías que uso para construir aplicaciones fullstack.',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Base de Datos',
      tools: 'Herramientas',
      ai: 'Inteligencia Artificial',
      methodologies: 'Metodologías',
      languages: 'Idiomas',
      cloud: 'Cloud',
      data: 'Data & Analytics',
    },
    levels: {
      native: 'Nativo',
      english_level: 'B1 — lectura técnica fluida',
    },
  },

  experience: {
    label: 'Experiencia',
    title: 'Mi Experiencia',
    subtitle: 'Mi trayectoria profesional hasta ahora.',
    entries: {
      e1: {
        badge: 'Formación activa',
        institution: 'Riwi',
        inst_desc: 'Academia de formación tech',
        title: 'Desarrollo Fullstack Colaborativo',
        period: '2025 - Actualidad',
        b1: 'Desarrollo de proyectos fullstack completos (frontend, backend y base de datos) en equipo',
        b2: 'Aplicación de metodología Scrum en 3+ proyectos: roles de Developer, Product Owner y Scrum Master según el proyecto',
        b3: 'Ceremonias activas: Sprint Planning, Daily Standup, Sprint Review y Retrospectiva',
        b4: 'Colaboración en repositorios compartidos con Git y GitHub',
        b5: 'Comunicación técnica y toma de decisiones en equipo bajo presión de sprint',
      },
      e2: {
        badge: 'Finalizado',
        institution: 'SENA',
        inst_desc: 'Servicio Nacional de Aprendizaje',
        title: 'Técnico en Desarrollo de Software',
        period: '2023 · 2024',
        b1: 'Formación técnica oficial en desarrollo de software',
        b2: 'Fundamentos de programación, bases de datos y construcción de aplicaciones',
        b3: 'Proyecto de grado como requisito de titulación',
      },
      e3: {
        badge: 'Base técnica',
        institution: 'Autoformación',
        inst_desc: 'Aprendizaje independiente',
        title: 'Fundamentos de Desarrollo Web',
        period: '2023 — Actualidad',
        b1: 'HTML5 semántico, accesibilidad y ARIA',
        b2: 'CSS3 avanzado: variables, Grid, Flexbox, animaciones y responsive design',
        b3: 'JavaScript ES6+: DOM, eventos, fetch, async/await y módulos ES',
        b4: 'Control de versiones con Git y GitHub',
        b5: 'Despliegue de aplicaciones en Vercel y Neon (PostgreSQL serverless)',
        b6: 'Metodología Scrum: roles, ceremonias, artefactos y dinámica de sprints',
        b7: 'Manejo de tableros en Jira',
      },
    },
    scrum: {
      block_title: 'Cómo trabajo con Scrum',
      block_subtitle: 'Ceremonias que practico activamente',
      planning: { name: 'Sprint Planning', desc: 'Definir objetivos y tareas del sprint' },
      daily: { name: 'Daily Standup', desc: 'Sincronización diaria de avances y bloqueos' },
      review: { name: 'Sprint Review', desc: 'Demostrar y validar los entregables del sprint' },
      retro: { name: 'Retrospectiva', desc: 'Reflexionar y mejorar como equipo' },
    },
  },

  contact: {
    label: 'Contacto',
    title: 'Hablemos',
    subtitle: 'Construyamos algo juntos.',
    available: 'Disponible para trabajar',
    linkedin_soon: 'Perfil de LinkedIn próximamente.',
    cards: {
      whatsapp: {
        title: 'WhatsApp',
        desc: '¿Prefieres hablar rápido? Escríbeme directo.',
        btn: 'Abrir WhatsApp'
      },
      email: {
        title: 'Email',
        desc: '¿Prefieres el correo? Respondo en menos de 24h.',
        btn: 'Enviar Email'
      },
      github: {
        title: 'GitHub',
        desc: 'Revisa mis proyectos públicos y código.',
        btn: 'Ver Perfil'
      }
    }
  },

  footer: {
    tagline: 'Junior Fullstack Developer · Medellín, Colombia',
    rights: 'Todos los derechos reservados.',
    made_with: 'Hecho con <span class="footer__heart" aria-label="amor">♥</span> usando&nbsp;<span>HTML</span>,&nbsp;<span>CSS</span>&nbsp;y&nbsp;<span>JS Vanilla</span>',
  },

  theme: {
    to_dark: 'Cambiar a modo oscuro',
    to_light: 'Cambiar a modo claro',
  },

  lang: {
    switch_label: 'Seleccionar idioma',
  },
};