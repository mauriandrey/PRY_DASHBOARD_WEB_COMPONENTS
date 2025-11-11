class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const name = this.getAttribute('name') || 'Usuario';
    const role = this.getAttribute('role') || 'Cargo no definido';

    shadow.innerHTML = `
      <link rel="stylesheet" href="./public/components/css/user-card.css">
      <div class="card">
        <img src="./public/assets/img/user-default.png" alt="Usuario">
        <div class="info">
          <h3>${name}</h3>
          <p>${role}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('user-card', UserCard);
