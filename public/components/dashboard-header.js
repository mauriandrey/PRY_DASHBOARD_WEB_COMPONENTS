class DashboardHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        header {
          background: var(--primary-color);
          color: white;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
        }
      </style>
      <header>
        <h1>📊 Dashboard de Productividad</h1>
      </header>
    `;
  }
}

customElements.define('dashboard-header', DashboardHeader);
