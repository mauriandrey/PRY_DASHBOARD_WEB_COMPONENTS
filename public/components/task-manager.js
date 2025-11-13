// Web Component para administrar secciones y tareas

import { getLocalStorage, setLocalStorage, generateId } from '../js/utils/helpers.js';

export class TaskManager extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
            <link rel="stylesheet" href="./public/components/css/task-manager.css">
            <div class="manager-container">
                <h2>Administrador de Tareas</h2>
                
                <div class="section-card">
                    <h3>Crear Nueva Seccion</h3>
                    <div class="add-section-form">
                        <input type="text" id="sectionName" placeholder="Nombre de la seccion">
                        <input type="color" id="sectionColor" value="#4a90e2">
                        <button class="btn btn-primary" id="addSectionBtn">Crear Seccion</button>
                    </div>
                </div>
                
                <div class="section-card">
                    <h3>Secciones Existentes</h3>
                    <div class="sections-list" id="sectionsList"></div>
                </div>
            </div>
        `;
        
        // Referencias
        this.addSectionBtn = shadow.getElementById('addSectionBtn');
        this.sectionsList = shadow.getElementById('sectionsList');
        
        // Event listeners
        this.addSectionBtn.addEventListener('click', () => this.addSection());
    }
    
    connectedCallback() {
        this.loadSections();
    }
    
    // Cargar todas las secciones
    loadSections() {
        const sections = getLocalStorage('taskSections');
        const tasks = getLocalStorage('tasks');
        this.sectionsList.innerHTML = '';
        
        sections.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'section-item';
            sectionEl.style.borderLeftColor = section.color;
            
            const sectionTasks = tasks[section.id] || [];
            
            sectionEl.innerHTML = `
                <div class="section-header">
                    <div class="section-title">${section.name}</div>
                    <button class="btn-danger btn-small" data-section-id="${section.id}">Eliminar Seccion</button>
                </div>
                
                <div class="add-task-form">
                    <input type="text" placeholder="Nueva tarea" data-input-section="${section.id}">
                    <button class="btn-success" data-add-task="${section.id}">Agregar Tarea</button>
                </div>
                
                <div class="tasks-list" data-tasks-section="${section.id}">
                    ${sectionTasks.map(task => `
                        <div class="task-row">
                            <span class="task-text">${task.text}</span>
                            <button class="btn-danger btn-small" data-delete-task="${task.id}" data-task-section="${section.id}">Eliminar</button>
                        </div>
                    `).join('')}
                </div>
            `;
            
            this.sectionsList.appendChild(sectionEl);
        });
        
        // Agregar event listeners a los botones dinámicos
        this.attachDynamicListeners();
    }
    
    // Agregar listeners a elementos dinámicos
    attachDynamicListeners() {
        const shadow = this.shadowRoot;
        
        // Botones de eliminar sección
        shadow.querySelectorAll('[data-section-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionId = e.target.dataset.sectionId;
                this.deleteSection(sectionId);
            });
        });
        
        // Botones de agregar tarea
        shadow.querySelectorAll('[data-add-task]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionId = e.target.dataset.addTask;
                const input = shadow.querySelector(`[data-input-section="${sectionId}"]`);
                this.addTask(sectionId, input.value);
                input.value = '';
            });
        });
        
        // Botones de eliminar tarea
        shadow.querySelectorAll('[data-delete-task]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.dataset.deleteTask;
                const sectionId = e.target.dataset.taskSection;
                this.deleteTask(sectionId, taskId);
            });
        });
    }
    
    // Agregar nueva sección
    addSection() {
        const shadow = this.shadowRoot;
        const name = shadow.getElementById('sectionName').value.trim();
        const color = shadow.getElementById('sectionColor').value;
        
        if (!name) {
            alert('Por favor ingresa un nombre para la seccion');
            return;
        }
        
        const sections = getLocalStorage('taskSections');
        const tasks = getLocalStorage('tasks');
        
        const newSection = {
            id: generateId(),
            name: name,
            color: color
        };
        
        sections.push(newSection);
        tasks[newSection.id] = [];
        
        setLocalStorage('taskSections', sections);
        setLocalStorage('tasks', tasks);
        
        // Limpiar inputs
        shadow.getElementById('sectionName').value = '';
        shadow.getElementById('sectionColor').value = '#4a90e2';
        
        this.loadSections();
    }
    
    // Eliminar sección
    deleteSection(sectionId) {
        if (!confirm('¿Estas seguro de eliminar esta seccion y todas sus tareas?')) {
            return;
        }
        
        const sections = getLocalStorage('taskSections');
        const tasks = getLocalStorage('tasks');
        
        const updatedSections = sections.filter(s => s.id !== sectionId);
        delete tasks[sectionId];
        
        setLocalStorage('taskSections', updatedSections);
        setLocalStorage('tasks', tasks);
        
        this.loadSections();
    }
    
    // Agregar tarea a una sección
    addTask(sectionId, taskText) {
        if (!taskText.trim()) {
            alert('Por favor ingresa una tarea');
            return;
        }
        
        const tasks = getLocalStorage('tasks');
        
        const newTask = {
            id: generateId(),
            text: taskText,
            completed: false
        };
        
        if (!tasks[sectionId]) {
            tasks[sectionId] = [];
        }
        
        tasks[sectionId].push(newTask);
        setLocalStorage('tasks', tasks);
        
        this.loadSections();
    }
    
    // Eliminar tarea
    deleteTask(sectionId, taskId) {
        const tasks = getLocalStorage('tasks');
        
        tasks[sectionId] = tasks[sectionId].filter(t => t.id !== taskId);
        setLocalStorage('tasks', tasks);
        
        this.loadSections();
    }
}

// Registrar el Custom Element
customElements.define('task-manager', TaskManager);