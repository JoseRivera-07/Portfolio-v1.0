// ═══════════════════════════════════════════════════════════
// chatbot.js — Lógica completa del widget Cynthia
// Módulo ES autocontenido — no exporta nada
// ═══════════════════════════════════════════════════════════

// ── Configuración ───────────────────────────────────────────
const API_KEY    = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL      = 'gemini-2.0-flash';
const ENDPOINT   = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const MAX_TOKENS = 300;
const MAX_HISTORY = 10;

// ── Referencias DOM ─────────────────────────────────────────
const widget     = document.getElementById('chatbot-widget');
const toggleBtn  = document.getElementById('chatbot-toggle');
const closeBtn   = document.getElementById('chatbot-close');
const window_    = document.getElementById('chatbot-window');
const messagesEl = document.getElementById('chatbot-messages');
const input      = document.getElementById('chatbot-input');
const sendBtn    = document.getElementById('chatbot-send');
const headerSub  = document.getElementById('chatbot-header-sub');

// ── Estado ───────────────────────────────────────────────────
let isOpen       = false;
let isProcessing = false;
let history      = [];   // formato Gemini: [{role, parts}]

// ── System prompt dinámico ───────────────────────────────────
function getSystemPrompt(lang) {
  if (lang === 'es') {
    return `Eres Cynthia, asistente virtual de Jose Rivera.
Responde preguntas sobre Jose usando esta información:

Nombre: Jose Rivera
Rol: Junior Fullstack Developer
Ciudad: Medellín, Colombia
GitHub: github.com/JoseRivera-07
Disponibilidad: Abierto a oportunidades laborales

Formación:
- Riwi (2025 · Presente): Academia de formación tech. Proyectos fullstack colaborativos con metodología Scrum. Roles: Developer, Product Owner, Scrum Master en 3+ proyectos.
- SENA (2023–2024): Técnico en Desarrollo de Software.
- Autoformación (2024–2025): HTML, CSS, JS, Git, Vite, despliegue en Vercel y Neon.

Skills técnicos:
- Frontend: HTML5, CSS3, JavaScript ES6+
- Backend: Node.js, Express
- Base de datos: PostgreSQL, pgAdmin4
- Herramientas: Git, GitHub, Vite, npm
- IA: Gemini AI
- Metodologías: Scrum, Agile

Idiomas: Español (nativo), Inglés B1 — lectura técnica fluida, comunicación escrita funcional.

Proyectos: Visibles en github.com/JoseRivera-07
Este portafolio está construido con HTML, CSS y JS vanilla puro, sin frameworks.

Reglas:
- Responde SOLO sobre Jose Rivera
- Sé amigable y concisa (máximo 3 oraciones)
- Si te preguntan algo que no está en tu contexto, dilo claramente
- Responde SIEMPRE en español`;
  }

  return `You are Cynthia, Jose Rivera's virtual assistant.
Answer questions about Jose using this information:

Name: Jose Rivera
Role: Junior Fullstack Developer
City: Medellín, Colombia
GitHub: github.com/JoseRivera-07
Availability: Open to job opportunities

Education:
- Riwi (2025 · Present): Tech training academy. Collaborative fullstack projects with Scrum methodology. Roles: Developer, Product Owner, Scrum Master in 3+ projects.
- SENA (2023–2024): Software Development Technician.
- Self-learning (2024–2025): HTML, CSS, JS, Git, Vite, deployment on Vercel and Neon.

Technical skills:
- Frontend: HTML5, CSS3, JavaScript ES6+
- Backend: Node.js, Express
- Database: PostgreSQL, pgAdmin4
- Tools: Git, GitHub, Vite, npm
- AI: Gemini AI
- Methodologies: Scrum, Agile

Languages: Spanish (native), English B1 — fluent technical reading, functional written communication.

Projects: Visible at github.com/JoseRivera-07
This portfolio is built with pure HTML, CSS and vanilla JS, no frameworks.

Rules:
- Answer ONLY about Jose Rivera
- Be friendly and concise (max 3 sentences)
- If asked something not in your context, say so clearly
- Always respond in English`;
}

// ── Helpers de traducción ────────────────────────────────────
function t(key) {
  try {
    return window.i18n?.t(key) ?? key;
  } catch {
    return key;
  }
}

function getLang() {
  try {
    return window.i18n?.getCurrentLang() ?? 'en';
  } catch {
    return 'en';
  }
}

// ── Renderizado de burbujas ──────────────────────────────────
function addBubble(text, type = 'bot') {
  const bubble = document.createElement('div');
  bubble.classList.add('chatbot__bubble', `chatbot__bubble--${type}`);
  bubble.textContent = text;
  messagesEl.appendChild(bubble);
  scrollToBottom();
  return bubble;
}

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// ── Indicador de escritura ───────────────────────────────────
function showTyping() {
  const el = document.createElement('div');
  el.classList.add('chatbot__typing');
  el.id = 'chatbot-typing';
  el.setAttribute('aria-label', t('chatbot.typing'));
  el.innerHTML = `
    <span class="chatbot__typing-dot" aria-hidden="true"></span>
    <span class="chatbot__typing-dot" aria-hidden="true"></span>
    <span class="chatbot__typing-dot" aria-hidden="true"></span>
  `;
  messagesEl.appendChild(el);
  scrollToBottom();
}

function hideTyping() {
  document.getElementById('chatbot-typing')?.remove();
}

// ── Control del estado del input ─────────────────────────────
function setProcessing(state) {
  isProcessing = state;
  input.disabled = state;
  sendBtn.disabled = state;
}

// ── Historial: límite MAX_HISTORY ────────────────────────────
function trimHistory() {
  if (history.length > MAX_HISTORY) {
    // Conserva siempre el primer mensaje (bienvenida del modelo)
    const first = history[0];
    history = [first, ...history.slice(-(MAX_HISTORY - 1))];
  }
}

// ── Llamada a Gemini ─────────────────────────────────────────
async function sendToGemini(userText) {
  const lang = getLang();

  // Añadir mensaje del usuario al historial
  history.push({ role: 'user', parts: [{ text: userText }] });
  trimHistory();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: getSystemPrompt(lang) }]
        },
        contents: history,
        generationConfig: {
          maxOutputTokens: MAX_TOKENS,
          temperature: 0.7
        }
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botText) throw new Error('Empty response');

    // Añadir respuesta del modelo al historial
    history.push({ role: 'model', parts: [{ text: botText }] });
    trimHistory();

    return botText;

  } catch (err) {
    clearTimeout(timeout);

    if (err.name === 'AbortError') {
      console.error('[Chatbot] Timeout al conectar con Gemini');
      return null; // señal de timeout
    }

    console.error('[Chatbot] Error al llamar a Gemini:', err.message);
    throw err; // señal de error de red
  }
}

// ── Flujo principal: enviar mensaje ─────────────────────────
async function handleSend() {
  const text = input.value.trim();
  if (!text || isProcessing) return;

  input.value = '';
  setProcessing(true);

  addBubble(text, 'user');
  showTyping();

  try {
    const reply = await sendToGemini(text);
    hideTyping();

    if (reply === null) {
      // Timeout
      addBubble(t('chatbot.error_timeout'), 'error');
    } else {
      addBubble(reply, 'bot');
    }
  } catch {
    hideTyping();
    addBubble(t('chatbot.error_network'), 'error');
  } finally {
    setProcessing(false);
    input.focus();
  }
}

// ── Abrir / cerrar el widget ─────────────────────────────────
function openChat() {
  isOpen = true;

  window_.classList.add('chatbot__window--open');
  window_.setAttribute('aria-hidden', 'false');
  toggleBtn.setAttribute('aria-expanded', 'true');
  toggleBtn.setAttribute('aria-label', t('chatbot.toggle_close'));

  // Mostrar bienvenida solo si el chat está vacío
  if (history.length === 0) {
    showWelcome();
  }

  // Foco al input
  setTimeout(() => input.focus(), 50);
}

function closeChat() {
  isOpen = false;

  window_.classList.remove('chatbot__window--open');
  window_.setAttribute('aria-hidden', 'true');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.setAttribute('aria-label', t('chatbot.toggle_open'));

  // Foco de vuelta al botón toggle
  toggleBtn.focus();
}

function toggleChat() {
  isOpen ? closeChat() : openChat();
}

// ── Mensaje de bienvenida ────────────────────────────────────
function showWelcome() {
  const welcomeText = t('chatbot.welcome');
  messagesEl.innerHTML = '';
  const bubble = addBubble(welcomeText, 'bot');
  bubble.id = 'chatbot-welcome';

  // Registrar en historial como primer mensaje del modelo
  history = [{ role: 'model', parts: [{ text: welcomeText }] }];
}

// ── Trap de foco dentro del dialog ──────────────────────────
function handleFocusTrap(e) {
  if (!isOpen || e.key !== 'Tab') return;

  const focusable = window_.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// ── Escape cierra el chat ────────────────────────────────────
function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen) closeChat();
  handleFocusTrap(e);
}

// ── Re-render al cambiar idioma ──────────────────────────────
function handleLangChange() {
  // Actualizar placeholder
  input.placeholder = t('chatbot.placeholder');

  // Actualizar subtítulo del header
  headerSub.textContent = t('chatbot.header_sub');

  // Actualizar aria-labels de botones
  const currentToggleLabel = isOpen
    ? t('chatbot.toggle_close')
    : t('chatbot.toggle_open');
  toggleBtn.setAttribute('aria-label', currentToggleLabel);
  closeBtn.setAttribute('aria-label', t('chatbot.toggle_close'));

  // Actualizar bienvenida si el chat solo tiene ese mensaje
  if (history.length <= 1) {
    showWelcome();
  }
}

// ── Eventos ──────────────────────────────────────────────────
toggleBtn.addEventListener('click', toggleChat);
closeBtn.addEventListener('click', closeChat);
sendBtn.addEventListener('click', handleSend);

input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

document.addEventListener('keydown', handleKeydown);

// Escuchar cambio de idioma
try {
  window.i18n?.onLanguageChange(handleLangChange);
} catch (err) {
  console.warn('[Chatbot] No se pudo registrar listener de idioma:', err);
}