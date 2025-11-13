// Función para toggle del sidebar
export const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const img = toggleBtn ? toggleBtn.querySelector('img') : null;

    // Alternar estado 'collapsed' (modo solo iconos)
    const isCollapsed = sidebar.classList.toggle('collapsed');

    // Actualizar icono según estado: mostrar 'hamburger' para expandir cuando está contraído,
    // y mostrar 'close' cuando está expandido (indica acción de contraer).
    if (img) {
        img.src = isCollapsed ? './public/assets/icons/hamburger.svg' : './public/assets/icons/close.svg';
        img.alt = isCollapsed ? 'Expandir menú' : 'Contraer menú';
    }
};

// Mantener función por compatibilidad futura si se necesitara mostrar/ocultar completamente
export const collapseSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');


};

// Configurar botón de toggle del sidebar
const toggleBtn = document.getElementById('toggleSidebar');
if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleSidebar);
}

// Sincronizar icono inicial según el estado del sidebar (por si viene pre-contraído)
if (toggleBtn) {
    const img = toggleBtn.querySelector('img');
    const sidebar = document.querySelector('.sidebar');
    if (img && sidebar) {
        img.src = sidebar.classList.contains('collapsed') ? './public/assets/icons/hamburger.svg' : './public/assets/icons/close.svg';
        img.alt = sidebar.classList.contains('collapsed') ? 'Expandir menú' : 'Contraer menú';
    }
}

