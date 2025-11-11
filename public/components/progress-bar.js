class ProgressBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.value = parseInt(this.getAttribute('value')) || 0;

    shadow.innerHTML = `
      <link rel="stylesheet" href="./public/components/css/progress-bar.css">
      <div class="bar">
        <div class="fill" style="width: ${this.value}%"></div>
      </div>
      <p>Progreso: <span>${this.value}%</span></p>
    `;

    // Escuchar cambios en las tareas
    document.addEventListener('task-updated', () => this.updateProgress());
  }

  updateProgress = () => {
    const tasks = document.querySelectorAll('task-item');
    const total = tasks.length;
    const completed = Array.from(tasks).filter(t => t.completed).length;
    this.value = Math.round((completed / total) * 100);
    this.shadowRoot.querySelector('.fill').style.width = `${this.value}%`;
    this.shadowRoot.querySelector('span').textContent = `${this.value}%`;
  };
}

customElements.define('progress-bar', ProgressBar);
