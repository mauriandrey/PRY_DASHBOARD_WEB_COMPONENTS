class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const name = this.getAttribute('name') || 'Usuario';
    const role = this.getAttribute('role') || 'Rol no definido';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 1rem;
        }
      </style>
      <div class="card">
        <img src="./public/assets/img/" alt="user">
        <div>
          <h3>${name}</h3>
          <p>${role}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('user-card', UserCard);
