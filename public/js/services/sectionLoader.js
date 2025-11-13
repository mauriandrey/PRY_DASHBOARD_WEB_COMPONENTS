import { getLocalStorage } from '../utils/helpers.js';

// Cargar sección de inicio
export const loadHomeSection = (container) => {
    const userData = getLocalStorage('userData');
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh;">
            <h1 style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-color);">
                Bienvenido, ${userData.nombre} ${userData.apellido}
            </h1>
            <p style="font-size: 1.5rem; color: var(--text-secondary); margin-bottom: 2rem;">
                Gestiona tus tareas diarias de manera efectiva
            </p>
            <button class="btn btn-primary" id="goToTasks" style="font-size: 1.2rem; padding: 1rem 2rem;">
                Ir a Tareas
            </button>
        </div>
    `;
    
    // Usar window.navigateToSection que será registrada en main.js
    document.getElementById('goToTasks').addEventListener('click', () => {
        window.navigateToSection('tasks');
    });
};

// Cargar sección de perfil
export const loadProfileSection = (container) => {
    container.innerHTML = '<user-card></user-card>';
};

// Cargar sección de administrador de tareas
export const loadTaskManagerSection = (container) => {
    container.innerHTML = '<task-manager></task-manager>';
};

// Cargar sección de tareas
export const loadTasksSection = (container) => {
    container.innerHTML = '<task-list></task-list>';
};
