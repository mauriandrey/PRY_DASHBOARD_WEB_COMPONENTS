class ProgressBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.value = parseInt(this.getAttribute('value')) || 0;
  }

  connectedCallback() {
    this.render();

    document.addEventListener('task-updated', () => {
      this.updateProgress();
    });
  }

  updateProgress() {
    const total = document.querySelectorAll('task-item').length;
    const completed = Array.from(document.querySelectorAll('task-item'))
      .filter(t => t.completed).length;

    this.value = Math.round((completed / total) * 100);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .bar {
          width: 100%;
          height: 20px;
          background: #ddd;
          border-radius: 10px;
          overflow: hidden;
        }
        .fill {
          width: ${this.value}%;
          height: 100%;
          background: var(--success-color, #2ecc71);
          transition: width 0.3s ease;
        }
        p { text-align: center; font-size: 0.9rem; }
      </style>
      <div class="bar"><div class="fill"></div></div>
      <p>Progreso: ${this.value}%</p>
    `;
  }
}

customElements.define('progress-bar', ProgressBar);
