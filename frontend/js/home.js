/* ============================================================
   HOME.JS — Vista: Inicio
   Módulo 02 · Página de inicio con hero section completa

   Exporta el objeto de página con:
   - title:   string para <title>
   - render(): string HTML que se inyecta en #app
   - init():   lógica post-render (vacía en home, el hero
               no tiene interactividad propia)
   ============================================================ */

export default {

  title: 'Jose Rivera · Junior Fullstack Developer',

  /* ──────────────────────────────────────────────────────────
     RENDER — Retorna el HTML completo del hero.
     Es exactamente el mismo markup del Módulo 01,
     preservando todas las clases CSS y atributos ARIA.
     Solo cambia href="#proyectos" → href="/proyectos"
     para que el router lo intercepte correctamente.
  ────────────────────────────────────────────────────────── */
  render() {
    return `
      <!-- ════════════════════════════════════════════════════
           HERO — Presentación principal
           ════════════════════════════════════════════════════ -->
      <section id="inicio" class="hero" aria-label="Presentación">
        <div class="container">
          <div class="hero__inner">

            <!-- Contenido: izquierda en desktop, único en mobile -->
            <div class="hero__content">

              <!-- Disponibilidad -->
              <span class="hero__availability" aria-label="Disponible para trabajar">
                <span class="hero__availability-dot" aria-hidden="true"></span>
                Disponible para trabajar
              </span>

              <!-- Nombre principal -->
              <h1 class="hero__headline">Jose Rivera</h1>

              <!-- Rol -->
              <p class="hero__subtitle">Junior Fullstack Developer</p>

              <!-- Bio -->
              <p class="hero__bio">
                Construyo aplicaciones web completas, desde la interfaz hasta la base de datos.
                Apasionado por el código limpio, las buenas prácticas y seguir aprendiendo cada día
                desde Medellín, Colombia.
              </p>

              <!-- CTAs + separador + social links -->
              <div class="hero__cta">
                <a href="/proyectos" class="btn btn-primary">Ver Proyectos</a>
                <a href="/contacto"  class="btn btn-outline">Contáctame</a>

                <span class="hero__divider" aria-hidden="true"></span>

                <div class="hero__social" aria-label="Redes sociales">

                  <!-- GitHub — externo, no interceptado por el router -->
                  <a href="https://github.com/JoseRivera-07"
                     class="social-link"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="Ver perfil de GitHub de Jose Rivera">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                    </svg>
                  </a>

                  <!-- LinkedIn — externo, no interceptado por el router -->
                  <a href="https://linkedin.com/in/jose-rivera"
                     class="social-link"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="Ver perfil de LinkedIn de Jose Rivera">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/>
                    </svg>
                  </a>

                </div>
              </div>

            </div>

            <!-- Visual decorativo — terminal de código (solo desktop) -->
            <div class="hero__visual" aria-hidden="true">
              <div class="hero__code-block">

                <!-- Barra de título terminal -->
                <div class="hero__code-header">
                  <span class="hero__code-dot hero__code-dot--red"></span>
                  <span class="hero__code-dot hero__code-dot--yellow"></span>
                  <span class="hero__code-dot hero__code-dot--green"></span>
                  <span class="hero__code-title">jose-rivera.js</span>
                </div>

                <!-- Líneas de código -->
                <div class="hero__code-body">
                  <span class="hero__code-line"><span class="code-comment">// Junior Fullstack Developer</span></span>
                  <span class="hero__code-line">&nbsp;</span>
                  <span class="hero__code-line"><span class="code-keyword">const </span><span class="code-variable">developer</span><span class="code-bracket"> = {</span></span>
                  <span class="hero__code-line">&nbsp;&nbsp;<span class="code-property">name</span>: <span class="code-string">"Jose Rivera"</span>,</span>
                  <span class="hero__code-line">&nbsp;&nbsp;<span class="code-property">location</span>: <span class="code-string">"Medellín, CO"</span>,</span>
                  <span class="hero__code-line">&nbsp;&nbsp;<span class="code-property">stack</span>: <span class="code-bracket">[</span></span>
                  <span class="hero__code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-string">"HTML"</span>, <span class="code-string">"CSS"</span>,</span>
                  <span class="hero__code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-string">"JavaScript"</span>,</span>
                  <span class="hero__code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-string">"PostgreSQL"</span>,</span>
                  <span class="hero__code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-string">"Gemini AI"</span>,</span>
                  <span class="hero__code-line">&nbsp;&nbsp;<span class="code-bracket">],</span></span>
                  <span class="hero__code-line">&nbsp;&nbsp;<span class="code-property">available</span>: <span class="code-value">true</span>,</span>
                  <span class="hero__code-line"><span class="code-bracket">};</span></span>
                  <span class="hero__code-line">&nbsp;</span>
                  <span class="hero__code-line"><span class="code-comment">// open to opportunities</span><span class="hero__code-cursor"></span></span>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- Scroll indicator → apunta a /proyectos via router -->
        <a href="/proyectos" class="hero__scroll" aria-label="Ir a la sección de proyectos">
          <span>Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>

      </section>
    `;
  },

  /* ──────────────────────────────────────────────────────────
     INIT — Lógica post-render
     El hero no tiene interactividad propia. Los clicks en
     "Ver Proyectos", "Contáctame" y el scroll indicator
     los captura el event delegation del router en document.
  ────────────────────────────────────────────────────────── */
  init() {
    // Sin lógica adicional en esta versión del hero.
    // Aquí se añadirán animaciones de entrada (Módulo 03)
    // si se deciden implementar con JS.
  }

};