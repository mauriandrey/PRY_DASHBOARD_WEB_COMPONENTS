// Función para toggle del sidebar
export const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    
    sidebar.classList.toggle('hidden');
    
    // Cambiar el icono del botón
    if (sidebar.classList.contains('hidden')) {
        toggleBtn.innerHTML = '☰';
    } else {
        toggleBtn.innerHTML = '✕';
    }
};
