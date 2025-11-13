// Web Component para marcar tareas como completadas

import { getLocalStorage, setLocalStorage } from '../js/utils/helpers.js';
import {ProgressIndicator} from './progress-indicator.js';

export class TaskList extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
            <link rel="stylesheet" href="./public/components/css/task-list.css">
            <div class="tasks-container">
                <h2>Mis Tareas Diarias</h2>
                <div class="sections-grid" id="sectionsGrid"></div>
            </div>
        `;
        
        this.sectionsGrid = shadow.getElementById('sectionsGrid');
    }
    
    connectedCallback() {
        this.loadTasks();
        
        // Escuchar eventos de cambio en tareas
        this.addEventListener('task-toggle', (e) => {
            this.toggleTask(e.detail.sectionId, e.detail.taskId, e.detail.completed);
        });
    }
    
    // Cargar todas las tareas organizadas por sección
    loadTasks() {
        const sections = getLocalStorage('taskSections');
        const tasks = getLocalStorage('tasks');
        
        if (!sections || sections.length === 0) {
            this.sectionsGrid.innerHTML = `
                <div class="empty-state">
                    <p>No hay secciones creadas aun</p>
                    <p>Ve a Task Manager para crear nuevas secciones y tareas</p>
                </div>
            `;
            return;
        }
        
        this.sectionsGrid.innerHTML = '';
        
        sections.forEach(section => {
            const sectionTasks = tasks[section.id] || [];
            const completedCount = sectionTasks.filter(t => t.completed).length;
            const totalCount = sectionTasks.length;
            const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
            
            const sectionCard = document.createElement('div');
            sectionCard.className = 'section-card';
            sectionCard.style.borderLeftColor = section.color;
            
            sectionCard.innerHTML = `
                <div class="section-header">
                    <div class="section-title">${section.name}</div>
                    <div class="section-stats">${completedCount} / ${totalCount} completadas</div>
                </div>
                
                <div class="tasks-list">
                    ${sectionTasks.length > 0 ? sectionTasks.map(task => `
                        <div class="task-item ${task.completed ? 'completed' : ''}">
                            <input 
                                type="checkbox" 
                                class="task-checkbox" 
                                ${task.completed ? 'checked' : ''}
                                data-section-id="${section.id}"
                                data-task-id="${task.id}"
                            >
                            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                        </div>
                    `).join('') : '<p style="text-align: center; color: #7f8c8d;">No hay tareas en esta seccion</p>'}
                </div>
                
                <progress-indicator data-progress="${progressPercentage}"></progress-indicator>
            `;
            
            this.sectionsGrid.appendChild(sectionCard);
            
            // Inicializar el componente progress-indicator
            const progressIndicator = sectionCard.querySelector('progress-indicator');
            if (progressIndicator) {
                progressIndicator.setProgress(progressPercentage);
            }
        });
        
        // Agregar event listeners a los checkboxes
        this.attachCheckboxListeners();
    }
    
    // Agregar listeners a los checkboxes
    attachCheckboxListeners() {
        const checkboxes = this.shadowRoot.querySelectorAll('.task-checkbox');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const sectionId = e.target.dataset.sectionId;
                const taskId = e.target.dataset.taskId;
                const completed = e.target.checked;
                
                this.toggleTask(sectionId, taskId, completed);
            });
        });
    }
    
    // Cambiar estado de una tarea
    toggleTask(sectionId, taskId, completed) {
        const tasks = getLocalStorage('tasks');
        
        const task = tasks[sectionId].find(t => t.id === taskId);
        if (task) {
            task.completed = completed;
            setLocalStorage('tasks', tasks);
            
            // Recargar para actualizar el progreso
            this.loadTasks();
        }
    }
}

// Registrar el Custom Element
customElements.define('task-list', TaskList);