class TaskItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Estado inicial
    this.completed = false;
    const title = this.getAttribute('title') || 'Tarea sin título';

    shadow.innerHTML = `
      <link rel="stylesheet" href="./public/components/css/task-item.css">
      <div class="task">
        <button>${title}</button>
      </div>
    `;

    // Evento: marcar como completada
    const btn = shadow.querySelector('button');
    btn.addEventListener('click', () => {
      this.completed = !this.completed;
      btn.classList.toggle('done', this.completed);
      this.dispatchEvent(new CustomEvent('task-updated', {
        detail: { completed: this.completed },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define('task-item', TaskItem);
