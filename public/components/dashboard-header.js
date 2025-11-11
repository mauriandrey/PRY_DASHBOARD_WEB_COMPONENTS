class DashboardHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <link rel="stylesheet" href="./public/components/css/dashboard-header.css">
      <header>
        <h1> Dashboard Productividad</h1>
      </header>
    `;
  }
}

customElements.define('dashboard-header', DashboardHeader);
