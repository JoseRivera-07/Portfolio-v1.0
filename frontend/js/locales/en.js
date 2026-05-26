// frontend/js/locales/en.js

export default {
  nav: {
    home: 'Home',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    contact: 'Contact',
  },

  hero: {
    available: 'Available for work',
    role: 'Junior Fullstack Developer & Data Analyst',
    bio: 'I build complete web applications, from the interface to the database. Passionate about clean code, best practices, and learning every day from Medellín, Colombia.',
    cta_projects: 'View Projects',
    cta_contact: 'Contact Me',
    scroll_hint: 'Go to the projects section',
    code_comment1: '// Junior Fullstack Developer & Data Analyst',
    code_comment2: '// open to opportunities',
  },

  projects: {
    label: 'Projects',
    title: "What I've <span>built</span>",
    subtitle: 'Public repositories from GitHub — updated automatically.',
    orgs_label: 'Organizations',
    orgs_title: 'Teamwork',
    loading: 'Loading projects...',
    error_title: 'Could not load projects',
    error_text: 'There was a problem connecting to GitHub. Check your connection and try again.',
    retry: 'Retry',
    view_github: 'View on GitHub',
    empty_personal_title: 'No projects available',
    empty_personal_text: 'No public projects available yet.',
    empty_orgs_title: 'No org repos',
    empty_orgs_text: 'No public repositories found in your organizations.',
    view_profile: 'View GitHub profile',
  },

  skills: {
    label: 'Skills',
    title: 'Technologies I <span>work with</span>',
    subtitle: 'Tools and technologies I use to build fullstack applications.',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      tools: 'Tools',
      ai: 'Artificial Intelligence',
      methodologies: 'Methodologies',
      languages: 'Languages',
      cloud: 'Cloud',
      data: 'Data & Analytics',
    },
    levels: {
      native: 'Native',
      english_level: 'B1 — fluent technical reading',
    },
  },

  experience: {
    label: 'Experience',
    title: 'My Experience',
    subtitle: 'My professional journey so far.',
    entries: {
      e1: {
        badge: 'Active training',
        institution: 'Riwi',
        inst_desc: 'Tech training academy',
        title: 'Collaborative Fullstack Development',
        period: '2025 · Present',
        b1: 'Built complete fullstack projects (frontend, backend, and database) working in teams',
        b2: 'Applied Scrum methodology across 3+ projects, rotating as Developer, Product Owner, and Scrum Master',
        b3: 'Active ceremonies: Sprint Planning, Daily Standup, Sprint Review, and Retrospective',
        b4: 'Collaborated on shared repositories using Git and GitHub',
        b5: 'Technical communication and team decision-making under sprint pressure',
      },
      e2: {
        badge: 'Finish',
        institution: 'SENA',
        inst_desc: 'National Learning Service',
        title: 'Software Development Technician',
        period: '2023 · 2024',
        b1: 'Official technical training in software development',
        b2: 'Foundations of programming, databases, and application building',
        b3: 'Degree project as graduation requirement',
      },
      e3: {
        badge: 'Technical base',
        institution: 'Self-learning',
        inst_desc: 'Independent learning',
        title: 'Web Development Fundamentals',
        period: '2024 — 2025',
        b1: 'Semantic HTML5, accessibility, and ARIA',
        b2: 'Advanced CSS3: custom properties, Grid, Flexbox, animations, and responsive design',
        b3: 'JavaScript ES6+: DOM, events, fetch, async/await, and ES modules',
        b4: 'Version control with Git and GitHub',
        b5: 'Application deployment on Vercel and Neon (serverless PostgreSQL)',
        b6: 'Scrum methodology: roles, ceremonies, artifacts and sprint dynamics',
        b7: 'Jira boards manage'
      },
    },
    scrum: {
      block_title: 'How I work with Scrum',
      block_subtitle: 'Ceremonies I actively practice',
      planning: { name: 'Sprint Planning', desc: 'Define goals and tasks for the sprint' },
      daily: { name: 'Daily Standup', desc: 'Daily sync on progress and blockers' },
      review: { name: 'Sprint Review', desc: 'Demo and validate sprint deliverables' },
      retro: { name: 'Retrospective', desc: 'Reflect and improve as a team' },
    },
  },

  contact: {
    label: 'Contact',
    title: 'Let\'s talk',
    subtitle: "Let's build something together.",
    available: 'Available for work',
    linkedin_soon: 'LinkedIn profile coming soon.',
    cards: {
      whatsapp: {
        title: 'WhatsApp',
        desc: 'Prefer a quick chat? Message me directly.',
        btn: 'Open WhatsApp'
      },
      email: {
        title: 'Email',
        desc: 'Prefer email? I usually reply within 24h.',
        btn: 'Send Email'
      },
      github: {
        title: 'GitHub',
        desc: 'Check out my public projects and code.',
        btn: 'View Profile'
      }
    }
  },

  footer: {
    tagline: 'Junior Fullstack Developer · Medellín, Colombia',
    rights: 'All rights reserved.',
    made_with: 'Made with <span class="footer__heart" aria-label="love">♥</span> using&nbsp;<span>HTML</span>,&nbsp;<span>CSS</span>&nbsp;and&nbsp;<span>JS Vanilla</span>',
  },

  theme: {
    to_dark: 'Switch to dark mode',
    to_light: 'Switch to light mode',
  },

  lang: {
    switch_label: 'Select language',
  },
};