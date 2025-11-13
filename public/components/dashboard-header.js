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
                    <h1 id="headerTitle">Task Manager</h1>
                    <div class="date-time" id="datetime"></div>
                </div>
            </header>
        `;
        
        // Actualizar fecha y hora
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
        
        // Observar cambios en el sidebar
        this.observeSidebarChanges();
    }
    
    // Metodo para observar cambios en el sidebar
    observeSidebarChanges() {
        // Esperar a que el DOM este listo
        setTimeout(() => {
            const sidebar = document.querySelector('.sidebar');
            const headerTitle = this.shadowRoot.getElementById('headerTitle');
            
            if (sidebar) {
                // Detectar cambios en las clases del sidebar
                const observer = new MutationObserver(() => {
                    if (sidebar.classList.contains('collapsed')) {
                        headerTitle.textContent = 'Task Manager';
                    } else {
                        headerTitle.textContent = 'Task Manager';
                    }
                });
                
                observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
            }
        }, 100);
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