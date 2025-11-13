// Web Component para el encabezado del dashboard
export class DashboardHeader extends HTMLElement {
    constructor() {
        super();
        
        // Crear Shadow DOM para encapsular estilos
        const shadow = this.attachShadow({ mode: 'open' });
        
        // Estructura HTML del componente
        shadow.innerHTML = `
        <link rel="stylesheet" href="./public/components/css/dashboard-header.css">
            <header>
                <div class="header-content">
                    <div class="date-time" id="datetime"></div>
                </div>
            </header>
        `;
        
        // Actualizar fecha y hora
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
        
    }
    
    
    // Método para actualizar la fecha y hora
    updateDateTime() {
        const datetimeEl = this.shadowRoot.getElementById('datetime');
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        datetimeEl.textContent = now.toLocaleDateString('es-ES', options);
    }
}

// Registrar el Custom Element
customElements.define('dashboard-header', DashboardHeader);