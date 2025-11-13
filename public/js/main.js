// Importar todos los componentes 
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

    // Configurar navegación del menú - usar delegación de eventos
    document.addEventListener('click', (e) => {
        const menuItem = e.target.closest('.menu-item');
        if (menuItem) {
            const section = menuItem.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
            }
        }
    });


    // Cargar la sección de inicio por defecto
    navigateToSection('home');
});