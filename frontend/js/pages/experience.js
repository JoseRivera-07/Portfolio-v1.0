/* ============================================================
   EXPERIENCE.JS — Vista: Experiencia (placeholder)
   Módulo 02 · Se rellenará con timeline en Módulo 03
   ============================================================ */

export default {

  title: 'Experiencia — Jose Rivera',

  render() {
    return `
      <section class="section section-alt" aria-label="Experiencia">
        <div class="container">

          <div class="section-header">
            <span class="section-label">Experiencia</span>
            <h1 class="hero__headline">Trayectoria</h1>
            <p class="hero__bio" style="max-width:520px; margin-inline:auto;">
              Sección en construcción — aquí estará mi historial
              de formación y experiencia profesional.
            </p>
          </div>

          <!-- Placeholder visual: línea de tiempo fantasma -->
          <div class="placeholder-timeline" aria-hidden="true">
            ${Array(3).fill(0).map(() => `
              <div class="placeholder-timeline__item">
                <div class="placeholder-timeline__dot"></div>
                <div class="placeholder-timeline__body">
                  <div class="placeholder-bar placeholder-bar--title"></div>
                  <div class="placeholder-bar placeholder-bar--short"></div>
                  <div class="placeholder-bar"></div>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </section>
    `;
  },

  init() {
    // Animación de entrada del timeline — Módulo 03
  }

};