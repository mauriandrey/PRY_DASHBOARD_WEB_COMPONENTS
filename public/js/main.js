import '../components/index.js'; // importa y registra todos los componentes
import { loadTasks } from './utils/helpers.js'; // ejemplo de importación de una función auxiliar

document.addEventListener('DOMContentLoaded', () => {
  console.log('Dashboard inicializado');
  loadTasks(); // ejemplo de inicialización o carga de datos
});