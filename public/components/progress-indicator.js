// Web Component para indicador de progreso reutilizable
export class ProgressIndicator extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
            <link rel="stylesheet" href="./public/components/css/progress-indicator.css">
            <div class="progress-indicator">
                <div class="progress-text">Progreso: <span id="progressValue">0</span>%</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
        `;
        
        this.progressValue = shadow.getElementById('progressValue');
        this.progressFill = shadow.getElementById('progressFill');
    }
    
    // Establecer el porcentaje de progreso
    setProgress(percentage) {
        const validPercentage = Math.max(0, Math.min(100, percentage));
        this.progressValue.textContent = Math.round(validPercentage);
        this.progressFill.style.width = `${validPercentage}%`;
    }
    
    // Obtener el porcentaje actual
    getProgress() {
        return parseFloat(this.progressValue.textContent);
    }
}

// Registrar el Custom Element
customElements.define('progress-indicator', ProgressIndicator);


