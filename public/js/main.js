// Importar todos los componentes usando ES Modules
import '../components/index.js';
import { getLocalStorage, setLocalStorage, shouldResetTasks, getCurrentDate } from './utils/helpers.js';

// Inicializar datos por defecto si no existen
const initializeDefaultData = () => {
    // Datos del usuario por defecto
    if (!getLocalStorage('userData')) {
        const defaultUser = {
            nombre: 'Usuario',
            apellido: 'Ejemplo',
            fechaNacimiento: '2000-01-01',
            fotoPerfil: './public/assets/img/user-default.png'
        };
        setLocalStorage('userData', defaultUser);
    }

    // Secciones por defecto
    if (!getLocalStorage('taskSections')) {
        const defaultSections = [
            { id: 'estudio', name: 'Estudio', color: '#4a90e2' },
            { id: 'gym', name: 'Gym', color: '#e74c3c' },
            { id: 'trabajo', name: 'Trabajo', color: '#f39c12' },
            { id: 'hogar', name: 'Hogar', color: '#9b59b6' },
            { id: 'personal', name: 'Personal', color: '#1abc9c' }
        ];
        setLocalStorage('taskSections', defaultSections);
    }

    // Tareas por defecto
    if (!getLocalStorage('tasks')) {
        const defaultTasks = {
            estudio: [
                { id: '1', text: 'Estudiar para examen', completed: false }
            ],
            gym: [
                { id: '2', text: 'Rutina de cardio', completed: false }
            ],
            trabajo: [
                { id: '3', text: 'Revisar correos', completed: false }
            ],
            hogar: [
                { id: '4', text: 'Limpiar habitacion', completed: false }
            ],
            personal: [
                { id: '5', text: 'Leer 30 minutos', completed: false }
            ]
        };
        setLocalStorage('tasks', defaultTasks);
        setLocalStorage('lastResetDate', getCurrentDate());
    }

    // Verificar si es un nuevo día y reiniciar tareas
    const lastResetDate = getLocalStorage('lastResetDate');
    if (shouldResetTasks(lastResetDate)) {
        const tasks = getLocalStorage('tasks');
        // Reiniciar el estado de completado de todas las tareas
        Object.keys(tasks).forEach(sectionId => {
            tasks[sectionId].forEach(task => {
                task.completed = false;
            });
        });
        setLocalStorage('tasks', tasks);
        setLocalStorage('lastResetDate', getCurrentDate());
    }
};

// Función para cambiar entre secciones
const navigateToSection = (sectionName) => {
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

// Cargar sección de inicio
const loadHomeSection = (container) => {
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
    
    document.getElementById('goToTasks').addEventListener('click', () => {
        navigateToSection('tasks');
    });
};

// Cargar sección de perfil
const loadProfileSection = (container) => {
    container.innerHTML = '<user-card></user-card>';
};

// Cargar sección de administrador de tareas
const loadTaskManagerSection = (container) => {
    container.innerHTML = '<task-manager></task-manager>';
};

// Cargar sección de tareas
const loadTasksSection = (container) => {
    container.innerHTML = '<task-list></task-list>';
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar datos
    initializeDefaultData();

    // Configurar navegación del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            navigateToSection(section);
        });
    });

    // Cargar la sección de inicio por defecto
    navigateToSection('home');
});