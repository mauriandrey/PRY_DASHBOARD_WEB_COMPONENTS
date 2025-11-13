// Web Component para representar una tarea individual

export class TaskItem extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
            <link rel="stylesheet" href="./public/components/css/task-item.css">
            <div class="task-item" id="taskItem">
                <input type="checkbox" class="task-checkbox" id="checkbox">
                <span class="task-text" id="taskText"></span>
                <button class="delete-btn" id="deleteBtn">Eliminar</button>
            </div>
        `;
        
        // Referencias a elementos
        this.checkbox = shadow.getElementById('checkbox');
        this.taskText = shadow.getElementById('taskText');
        this.taskItem = shadow.getElementById('taskItem');
        this.deleteBtn = shadow.getElementById('deleteBtn');
        
        // Event listeners
        this.checkbox.addEventListener('change', () => this.handleToggle());
        this.deleteBtn.addEventListener('click', () => this.handleDelete());
    }
    
    connectedCallback() {
        this.render();
    }
    
    // Renderizar el componente con los datos
    render() {
        const text = this.getAttribute('text') || '';
        const completed = this.getAttribute('completed') === 'true';
        
        this.taskText.textContent = text;
        this.checkbox.checked = completed;
        
        if (completed) {
            this.taskItem.classList.add('completed');
            this.taskText.classList.add('completed');
        } else {
            this.taskItem.classList.remove('completed');
            this.taskText.classList.remove('completed');
        }
    }
    
    // Manejar el cambio de estado de la tarea
    handleToggle() {
        const event = new CustomEvent('task-toggle', {
            detail: {
                id: this.getAttribute('task-id'),
                completed: this.checkbox.checked
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
    
    // Manejar la eliminación de la tarea
    handleDelete() {
        const event = new CustomEvent('task-delete', {
            detail: {
                id: this.getAttribute('task-id')
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}

// Registrar el Custom Element
customElements.define('task-item', TaskItem);