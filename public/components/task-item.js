class TaskItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.completed = false;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.completed = !this.completed;
      this.dispatchEvent(new CustomEvent('task-updated', {
        detail: { completed: this.completed },
        bubbles: true,
        composed: true
      }));
      this.render();
    });
  }

  render() {
    const title = this.getAttribute('title') || 'Tarea sin título';
    this.shadowRoot.innerHTML = `
      <style>
        button {
          width: 100%;
          padding: 0.8rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          background: ${this.completed ? '#2ecc71' : '#007bff'};
          color: white;
          text-align: left;
          transition: 0.3s;
        }
      </style>
      <button>${this.completed ? '✅ ' : '⬜️ '} ${title}</button>
    `;
  }
}

customElements.define('task-item', TaskItem);
