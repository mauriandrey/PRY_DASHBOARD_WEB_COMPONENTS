import { getLocalStorage } from '../utils/helpers.js';
import { loadHomeSection, loadProfileSection, loadTaskManagerSection, loadTasksSection } from './sectionLoader.js';

// Función para cambiar entre secciones
export const navigateToSection = (sectionName) => {
    const content = document.getElementById('content');
    
    // Actualizar el menú activo
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Cargar el contenido según la sección
    switch(sectionName) {
        case 'home':
            loadHomeSection(content);
            break;
        case 'profile':
            loadProfileSection(content);
            break;
        case 'task-manager':
            loadTaskManagerSection(content);
            break;
        case 'tasks':
            loadTasksSection(content);
            break;
    }
};
