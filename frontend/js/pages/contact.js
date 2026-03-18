/* ============================================================
   CONTACT.JS — Vista: Contacto (placeholder)
   Módulo 02 · Se rellenará con formulario real en Módulo 03
   ============================================================ */

export default {

  title: 'Contacto — Jose Rivera',

  render() {
    return `
      <section class="section" aria-label="Contacto">
        <div class="container">

          <div class="section-header">
            <span class="section-label">Contacto</span>
            <h1 class="hero__headline">Hablemos</h1>
            <p class="hero__bio" style="max-width:520px; margin-inline:auto;">
              Sección en construcción — aquí encontrarás un formulario
              para escribirme directamente.
            </p>
          </div>

          <!-- Acceso directo mientras el formulario no está listo -->
          <div style="text-align:center; margin-top:var(--space-8);">
            <a href="https://github.com/JoseRivera-07"
               class="btn btn-outline"
               target="_blank"
               rel="noopener noreferrer">
              Mientras tanto → GitHub
            </a>
          </div>

        </div>
      </section>
    `;
  },

  init() {
    // Validación y envío del formulario de contacto — Módulo 03
  }

};