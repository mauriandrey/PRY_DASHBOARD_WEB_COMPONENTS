// Web Component para el perfil del usuario
import { getLocalStorage, setLocalStorage, calculateAge, calculateProgress } from '../js/utils/helpers.js';

export class UserCard extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
            <link rel="stylesheet" href="./public/components/css/user-card.css">
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-info">
                        <img src="" alt="Foto de perfil" class="profile-image" id="profileImage">
                        <div class="profile-details">
                            <h2 id="userName">Nombre Usuario</h2>
                            <p><strong>Edad:</strong> <span id="userAge">0</span> años</p>
                            <p><strong>Fecha de nacimiento:</strong> <span id="userBirthDate">-</span></p>
                            <button class="edit-btn" id="editBtn">Editar Perfil</button>
                        </div>
                    </div>
                </div>
                
                <div class="sections-summary">
                    <h3>Resumen de Tareas por Seccion</h3>
                    <div id="sectionsProgress"></div>
                </div>
                
                <div class="chart-container">
                    <h3>Tareas Completadas por Seccion</h3>
                    <div class="pie-chart">
                        <canvas id="pieChart" width="300" height="300"></canvas>
                    </div>
                    <div class="chart-legend" id="chartLegend"></div>
                </div>
            </div>
            
            <div class="modal" id="editModal">
                <div class="modal-content">
                    <h2>Editar Perfil</h2>
                    <form id="editForm">
                        <div class="form-group">
                            <label>Nombre:</label>
                            <input type="text" id="inputNombre" required>
                        </div>
                        <div class="form-group">
                            <label>Apellido:</label>
                            <input type="text" id="inputApellido" required>
                        </div>
                        <div class="form-group">
                            <label>Fecha de Nacimiento:</label>
                            <input type="date" id="inputFecha" required>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-save">Guardar</button>
                            <button type="button" class="btn-cancel" id="cancelBtn">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Referencias
        this.editBtn = shadow.getElementById('editBtn');
        this.editModal = shadow.getElementById('editModal');
        this.editForm = shadow.getElementById('editForm');
        this.cancelBtn = shadow.getElementById('cancelBtn');
        
        // Event listeners
        this.editBtn.addEventListener('click', () => this.openEditModal());
        this.cancelBtn.addEventListener('click', () => this.closeEditModal());
        this.editForm.addEventListener('submit', (e) => this.saveProfile(e));
    }
    
    connectedCallback() {
        this.loadUserData();
        this.loadSectionsProgress();
        this.drawPieChart();
    }
    
    // Cargar datos del usuario
    loadUserData() {
        const userData = getLocalStorage('userData');
        const shadow = this.shadowRoot;
        
        shadow.getElementById('profileImage').src = userData.fotoPerfil;
        shadow.getElementById('userName').textContent = `${userData.nombre} ${userData.apellido}`;
        shadow.getElementById('userAge').textContent = calculateAge(userData.fechaNacimiento);
        shadow.getElementById('userBirthDate').textContent = new Date(userData.fechaNacimiento).toLocaleDateString('es-ES');
    }
    
    // Cargar progreso de secciones
    loadSectionsProgress() {
        const sections = getLocalStorage('taskSections');
        const tasks = getLocalStorage('tasks');
        const container = this.shadowRoot.getElementById('sectionsProgress');
        
        container.innerHTML = '';
        
        sections.forEach(section => {
            const sectionTasks = tasks[section.id] || [];
            const completed = sectionTasks.filter(t => t.completed).length;
            const total = sectionTasks.length;
            const percentage = calculateProgress(completed, total);
            
            const progressBar = document.createElement('progress-bar');
            progressBar.setAttribute('label', section.name);
            progressBar.setAttribute('percentage', percentage);
            progressBar.setAttribute('color', section.color);
            
            container.appendChild(progressBar);
        });
    }
    
    // Dibujar gráfico de pastel
    drawPieChart() {
        const sections = getLocalStorage('taskSections');
        const tasks = getLocalStorage('tasks');
        const canvas = this.shadowRoot.getElementById('pieChart');
        const legend = this.shadowRoot.getElementById('chartLegend');
        const ctx = canvas.getContext('2d');
        
        // Calcular datos
        const data = sections.map(section => {
            const sectionTasks = tasks[section.id] || [];
            return {
                name: section.name,
                value: sectionTasks.filter(t => t.completed).length,
                color: section.color
            };
        });
        
        const total = data.reduce((sum, item) => sum + item.value, 0);
        
        // Dibujar gráfico
        let currentAngle = -Math.PI / 2;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;
        
        data.forEach(item => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
        
        // Crear leyenda
        legend.innerHTML = '';
        data.forEach(item => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
                <div class="legend-color" style="background-color: ${item.color}"></div>
                <span>${item.name}: ${item.value} tareas</span>
            `;
            legend.appendChild(legendItem);
        });
    }
    
    // Abrir modal de edición
    openEditModal() {
        const userData = getLocalStorage('userData');
        const shadow = this.shadowRoot;
        
        shadow.getElementById('inputNombre').value = userData.nombre;
        shadow.getElementById('inputApellido').value = userData.apellido;
        shadow.getElementById('inputFecha').value = userData.fechaNacimiento;
        
        this.editModal.classList.add('active');
    }
    
    // Cerrar modal
    closeEditModal() {
        this.editModal.classList.remove('active');
    }
    
    // Guardar perfil
    saveProfile(e) {
        e.preventDefault();
        
        const shadow = this.shadowRoot;
        const userData = {
            nombre: shadow.getElementById('inputNombre').value,
            apellido: shadow.getElementById('inputApellido').value,
            fechaNacimiento: shadow.getElementById('inputFecha').value,
            fotoPerfil: getLocalStorage('userData').fotoPerfil
        };
        
        setLocalStorage('userData', userData);
        this.loadUserData();
        this.closeEditModal();
    }
}

// Registrar el Custom Element
customElements.define('user-card', UserCard);