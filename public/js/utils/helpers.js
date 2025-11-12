// Funciones auxiliares para el manejo de LocalStorage y utilidades

// Guardar datos en LocalStorage
export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error al guardar en LocalStorage:', error);
        return false;
    }
};

// Obtener datos de LocalStorage
export const getLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error al leer LocalStorage:', error);
        return null;
    }
};

// Calcular edad a partir de fecha de nacimiento
export const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Ajustar si aún no ha cumplido años este año
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
};

// Obtener la fecha actual en formato YYYY-MM-DD
export const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

// Verificar si una tarea debe reiniciarse (nuevo día)
export const shouldResetTasks = (lastResetDate) => {
    const currentDate = getCurrentDate();
    return lastResetDate !== currentDate;
};

// Calcular porcentaje de progreso
export const calculateProgress = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
};

// Generar ID único para tareas y secciones
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};