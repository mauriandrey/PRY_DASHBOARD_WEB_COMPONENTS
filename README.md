# PRY_DASHBOARD_WEB_COMPONENTS
Dashboard modular construido con Web Components (Custom Elements + Shadow DOM).

**Autor:** mauriandrey

**Descripción breve**
Este repositorio contiene un conjunto de componentes web reutilizables que forman un pequeño dashboard de gestión de tareas. El proyecto está desarrollado con JavaScript nativo (ES Modules) y componentes web (Shadow DOM) sin frameworks.

**Dónde empezar**
- **Archivo principal:** `index.html` — punto de entrada de la UI.
- **Carpeta pública:** `public/` — contiene los componentes, estilos, scripts y assets.

**Estructura principal**
- `public/components/` : Web Components y sus estilos.
- `public/css/` : estilos globales y variables.
- `public/js/` : lógica de la aplicación (servicios, utilidades, inicializadores).
- `public/assets/icons/` : iconos SVG usados en el menú y botones.
- `data/` : JSON de ejemplo para tareas y secciones.

**Componentes incluidos**
- `dashboard-header` — encabezado con fecha y título (ajusta el título cuando el sidebar se contrae).
- `task-manager` — UI para crear/editar secciones y tareas.
- `task-list`, `task-item` — listado y representación de tareas.
- `user-card` — tarjeta de información del usuario.
- `progress-bar`, `progress-indicator` — visualización del progreso.

**Qué hace el proyecto**
- Menú lateral con iconos y modo contraído (solo iconos).
- Crear / eliminar secciones y añadir tareas por sección.
- Marca tareas como completadas y calcula progreso.
- Componentes encapsulados con Shadow DOM para estilos aislados.

**Ejecutar localmente**
Por soporte de ES Modules y seguridad de los navegadores es recomendable servir el proyecto desde un servidor local. Opciones rápidas:

- Con Python 3 (PowerShell):
```
python -m http.server 8000
```

- Con `http-server` (Node.js, si tienes `npm`):
```
npx http-server -c-1
```

Luego abrir en el navegador `http://localhost:8000` (o el puerto que hayas elegido).

Nota: en muchos navegadores abrir `index.html` directamente puede funcionar, pero al usar ES Modules y rutas relativas algunos recursos pueden bloquearse por política de CORS.

**Personalizar / desarrollo**
- Cambiar estilos globales en `public/css/variables.css` y `public/css/global.css`.
- Modificar comportamiento del sidebar en `public/js/services/sidebarManager.js`.
- Los iconos SVG están en `public/assets/icons/` y se usan como imágenes `img` en los botones. Puedes reemplazarlos por tus propios SVG manteniendo el mismo nombre o actualizando la ruta.

**Pruebas manuales rápidas**
- Abrir la app y verificar:
	- El menú lateral se contrae/expande con el botón en el header.
	- Los botones de `task-manager` usan iconos (agregar/eliminar).
	- El título del `dashboard-header` cambia a `TM` cuando el sidebar está contraído.

**Contribuir**
- Fork + PR: crea una rama con tu cambio y abre un Pull Request.
- Sigue el formato existente de componentes y evita romper la API pública de los Custom Elements.

**Licencia**
- Este repositorio no incluye una licencia explícita.

