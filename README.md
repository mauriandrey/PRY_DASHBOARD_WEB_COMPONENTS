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

**Estructura del proyecto**
Para referencia rápida, esta es la estructura actual del proyecto:

```
/PRY_DASHBOARD_WEB_COMPONENTS
│
├── index.html
│
├── public/
│   ├── css/
│   │   ├── global.css
│   │   └── variables.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── services/
│   │   │   ├── dataInitializer.js
│   │   │   ├── navigationService.js
│   │   │   ├── sectionLoader.js
│   │   │   └── sidebarManager.js
│   │   └── utils/
│   │       └── helpers.js
│   │
│   ├── components/
│   │   ├── index.js
│   │   ├── dashboard-header.js
│   │   ├── user-card.js
│   │   ├── task-item.js
│   │   ├── task-list.js
│   │   ├── task-manager.js
│   │   ├── progress-bar.js
│   │   ├── progress-indicator.js
│   │   └── css/
│   │       ├── dashboard-header.css
│   │       ├── user-card.css
│   │       ├── task-item.css
│   │       ├── task-list.css
│   │       ├── task-manager.css
│   │       ├── progress-bar.css
│   │       └── progress-indicator.css
│   │
│   ├── assets/
│   │   ├── icons/
│   │   │   └── (varios .svg)
│   │   └── img/
│   │       └── user-default.png
│   │
│   └── data/
│       ├── tasks.json
│       ├── taskSection.json
│       └── userInformation.json
│
└── README.md
```

Nota: la lista incluye los ficheros principales actuales; hay otros auxiliares (por ejemplo iconos en `public/assets/icons/`, y archivos dentro de `public/components/` y `public/js/services/`) que también forman parte del proyecto.

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

**Clonar el repositorio y ejecutar con Live Server (VSCode)**

1. Clonar el repositorio localmente:

```powershell
git clone https://github.com/mauriandrey/PRY_DASHBOARD_WEB_COMPONENTS.git
cd .\PRY_DASHBOARD_WEB_COMPONENTS
```

2. Abrir la carpeta en VSCode:

- En VSCode: `File` → `Open Folder...` y selecciona la carpeta del proyecto.

3. Instalar la extensión **Live Server** (si no la tienes):

- Busca `Live Server` (autor: Ritwick Dey / extension id: `ritwickdey.LiveServer`) en el Marketplace de VSCode e instálala.

4. Ejecutar con Live Server:

- Abre `index.html` en el editor y haz clic derecho → `Open with Live Server`, o usa el botón `Go Live` en la barra de estado de VSCode.
- Live Server levantará un servidor (por ejemplo `http://127.0.0.1:5500` o `http://localhost:5500`) y abrirá la app en el navegador.

5. Notas y solución de problemas:

- Live Server sirve correctamente los módulos ES, por lo que evita problemas de CORS al importar módulos locales.
- Si Live Server no abre la ruta correcta, revisa la URL en la barra de estado de la extensión o la salida del servidor (puerto y ruta base).

**Alternativa (CLI)**

Si prefieres no usar la extensión, desde PowerShell puedes usar un servidor estático rápido:

```powershell
# usando http-server (si tienes npm)
npx http-server -c-1

# o usando live-server directamente (si no está instalado globalmente usa npx)
npx live-server --port=5500
```

Ambas opciones servirán los archivos y permitirán usar ES Modules correctamente.

**Personalizar / desarrollo**
- Cambiar estilos globales en `public/css/variables.css` y `public/css/global.css`.
- Modificar comportamiento del sidebar en `public/js/services/sidebarManager.js`.
- Los iconos SVG están en `public/assets/icons/` y se usan como imágenes `img` en los botones. Puedes reemplazarlos por tus propios SVG manteniendo el mismo nombre o actualizando la ruta.

**Pruebas manuales rápidas**
- Abrir la app y verificar:
	- El menú lateral se contrae/expande con el botón en el header.
	- Los botones de `task-manager` usan iconos (agregar/eliminar).
	- El título del `dashboard-header` contiene la hora local del dispositivo en uso.

**Contribuir**
- Fork + PR: crea una rama con tu cambio y abre un Pull Request.
- Sigue el formato existente de componentes y evita romper la API pública de los Custom Elements.

**Licencia**
- Este repositorio no incluye una licencia explícita.

