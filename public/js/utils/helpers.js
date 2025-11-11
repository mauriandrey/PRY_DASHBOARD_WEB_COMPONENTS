export function loadTasks() {
  console.log('Cargando datos del archivo JSON...');
  fetch('./public/data/tasks.json')
    .then(res => res.json())
    .then(data => console.log('Tareas cargadas:', data))
    .catch(err => console.error('Error cargando tareas:', err));
}
