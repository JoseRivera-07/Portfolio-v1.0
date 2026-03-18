/* ============================================================
   PROJECTS.JS — Vista: Proyectos (placeholder)
   Módulo 02 · Se rellenará con tarjetas reales en Módulo 03
   ============================================================ */

export default {

  title: 'Proyectos — Jose Rivera',

  render() {
    return `
      <section class="section section-alt" aria-label="Proyectos">
        <div class="container">

          <div class="section-header">
            <span class="section-label">Proyectos</span>
            <h1 class="hero__headline">Lo que he construido</h1>
            <p class="hero__bio" style="max-width:520px; margin-inline:auto;">
              Sección en construcción — aquí aparecerán mis proyectos
              con tecnologías, capturas y enlaces a GitHub.
            </p>
          </div>

          <!-- Placeholder visual: grid de tarjetas fantasma -->
          <div class="placeholder-grid" aria-hidden="true">
            ${Array(3).fill(0).map(() => `
              <div class="placeholder-card">
                <div class="placeholder-bar placeholder-bar--title"></div>
                <div class="placeholder-bar"></div>
                <div class="placeholder-bar placeholder-bar--short"></div>
                <div class="placeholder-bar placeholder-bar--tag"></div>
              </div>
            `).join('')}
          </div>

        </div>
      </section>
    `;
  },

  init() {
    // Lógica de filtros y carga dinámica de proyectos — Módulo 03
  }

};