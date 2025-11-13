import { getLocalStorage, setLocalStorage, shouldResetTasks, getCurrentDate, loadJSON } from '../utils/helpers.js';

// Inicializar datos desde archivos JSON o LocalStorage
export const initializeDefaultData = async () => {
    // Cargar datos del usuario desde JSON si no existen en LocalStorage
    if (!getLocalStorage('userData')) {
        const userData = await loadJSON('./public/data/userInformation.json');
        if (userData) {
            setLocalStorage('userData', userData);
        } else {
            // Datos de respaldo si falla la carga del JSON
            const defaultUser = {
                nombre: 'Usuario',
                apellido: 'Ejemplo',
                fechaNacimiento: '2000-01-01',
                fotoPerfil: './public/assets/img/user-default.png'
            };
            setLocalStorage('userData', defaultUser);
        }
    }

    // Cargar secciones desde JSON si no existen en LocalStorage
    if (!getLocalStorage('taskSections')) {
        const taskSections = await loadJSON('./public/data/taskSection.json');
        if (taskSections) {
            setLocalStorage('taskSections', taskSections);
        } else {
            // Datos de respaldo si falla la carga del JSON
            const defaultSections = [
                { id: 'estudio', name: 'Estudio', color: '#4a90e2' },
                { id: 'gym', name: 'Gym', color: '#e74c3c' },
                { id: 'trabajo', name: 'Trabajo', color: '#f39c12' },
                { id: 'hogar', name: 'Hogar', color: '#9b59b6' },
                { id: 'personal', name: 'Personal', color: '#1abc9c' }
            ];
            setLocalStorage('taskSections', defaultSections);
        }
    }

    // Cargar tareas desde JSON si no existen en LocalStorage
    if (!getLocalStorage('tasks')) {
        const tasks = await loadJSON('./public/data/tasks.json');
        if (tasks) {
            setLocalStorage('tasks', tasks);
            setLocalStorage('lastResetDate', getCurrentDate());
        } else {
            // Datos de respaldo si falla la carga del JSON
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
