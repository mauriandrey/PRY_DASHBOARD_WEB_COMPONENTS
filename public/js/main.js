// Importar todos los componentes usando ES Modules
import '../components/index.js';

// Importar servicios
import { initializeDefaultData } from './services/dataInitializer.js';
import { navigateToSection } from './services/navigationService.js';
import { toggleSidebar } from './services/sidebarManager.js';

// Exportar funciones al objeto window para usarlas globalmente
window.navigateToSection = navigateToSection;
window.toggleSidebar = toggleSidebar;

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    // Inicializar datos
    await initializeDefaultData();

    // Configurar navegación del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            navigateToSection(section);
        });
    });

    // Configurar botón de toggle del sidebar
    const toggleBtn = document.getElementById('toggleSidebar');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }

    // Cargar la sección de inicio por defecto
    navigateToSection('home');
});