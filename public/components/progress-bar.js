// Web Component para mostrar barras de progreso

class ProgressBar extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
            <link rel="stylesheet" href="./public/components/css/progress-bar.css">
            <div class="progress-container">
                <div class="progress-label">
                    <span id="label">Progreso</span>
                    <span id="percentage">0%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" id="fill"></div>
                </div>
            </div>
        `;
    }
    
    // Método que se ejecuta cuando el componente se conecta al DOM
    connectedCallback() {
        this.updateProgress();
    }
    
    // Observar cambios en los atributos
    static get observedAttributes() {
        return ['label', 'percentage', 'color'];
    }
    
    // Reaccionar a cambios en atributos
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateProgress();
        }
    }
    
    // Actualizar la visualización de la barra de progreso
    updateProgress() {
        const label = this.getAttribute('label') || 'Progreso';
        const percentage = parseInt(this.getAttribute('percentage')) || 0;
        const color = this.getAttribute('color') || '#4a90e2';
        
        const labelEl = this.shadowRoot.getElementById('label');
        const percentageEl = this.shadowRoot.getElementById('percentage');
        const fillEl = this.shadowRoot.getElementById('fill');
        
        labelEl.textContent = label;
        percentageEl.textContent = `${percentage}%`;
        fillEl.style.width = `${percentage}%`;
        fillEl.style.backgroundColor = color;
    }
}

// Registrar el Custom Element
customElements.define('progress-bar', ProgressBar);