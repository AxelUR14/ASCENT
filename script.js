document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuItems = document.querySelectorAll('.menu-item');
    const contentViews = document.querySelectorAll('.content-view');
    const imageGallery = document.querySelector('.image-gallery');
    const reportsContainer = document.querySelector('.reports-container');
    const settingsForm = document.querySelector('.settings-form');
    
    // Datos de ejemplo para la galería
    const galleryImages = [
        { url: 'https://source.unsplash.com/random/600x400?nature', title: 'Naturaleza' },
        { url: 'https://source.unsplash.com/random/600x400?architecture', title: 'Arquitectura' },
        { url: 'https://source.unsplash.com/random/600x400?technology', title: 'Tecnología' },
        { url: 'https://source.unsplash.com/random/600x400?business', title: 'Negocios' },
        { url: 'https://source.unsplash.com/random/600x400?people', title: 'Personas' },
        { url: 'https://source.unsplash.com/random/600x400?food', title: 'Comida' }
    ];
    
    // Datos de ejemplo para reportes
    const reportsData = [
        { title: 'Ventas Mensuales', value: '$24,500', change: '+12%' },
        { title: 'Usuarios Activos', value: '1,240', change: '+5%' },
        { title: 'Tasa de Conversión', value: '3.2%', change: '-0.5%' }
    ];
    
    // Función para cargar la galería
    function loadGallery() {
        imageGallery.innerHTML = '';
        galleryImages.forEach(image => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${image.url}" alt="${image.title}">
                <div class="gallery-caption">${image.title}</div>
            `;
            imageGallery.appendChild(item);
        });
    }
    
    // Función para cargar reportes
    function loadReports() {
        reportsContainer.innerHTML = '';
        reportsData.forEach(report => {
            const card = document.createElement('div');
            card.className = 'report-card';
            card.innerHTML = `
                <h3>${report.title}</h3>
                <p class="report-value">${report.value}</p>
                <p class="report-change ${report.change.startsWith('+') ? 'positive' : 'negative'}">
                    ${report.change}
                </p>
            `;
            reportsContainer.appendChild(card);
        });
    }
    
    // Función para cargar configuración
    function loadSettings() {
        settingsForm.innerHTML = `
            <form>
                <div class="form-group">
                    <label for="theme">Tema del Sistema</label>
                    <select id="theme" class="form-control">
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                        <option value="pastel">Pastel</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="notifications">Notificaciones</label>
                    <div class="checkbox-container">
                        <input type="checkbox" id="notifications" checked>
                        <label for="notifications">Activar notificaciones</label>
                    </div>
                </div>
                <button type="submit" class="btn-save">Guardar Configuración</button>
            </form>
        `;
    }
    
    // Función para cambiar vista
    function changeView(viewId) {
        // Ocultar todas las vistas
        contentViews.forEach(view => {
            view.classList.remove('active');
        });
        
        // Mostrar la vista seleccionada
        const selectedView = document.getElementById(`${viewId}-content`);
        if (selectedView) {
            selectedView.classList.add('active');
            
            // Cargar contenido dinámico según la vista
            switch(viewId) {
                case 'galeria':
                    loadGallery();
                    break;
                case 'reportes':
                    loadReports();
                    break;
                case 'configuracion':
                    loadSettings();
                    break;
            }
        }
    }
    
    // Event listeners para los items del menú
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los items
            menuItems.forEach(i => {
                i.classList.remove('active');
            });
            
            // Añadir clase active al item clickeado
            this.classList.add('active');
            
            // Cambiar la vista
            const contentId = this.getAttribute('data-content');
            changeView(contentId);
        });
    });
    
    // Inicializar la vista de inicio
    loadGallery();
    loadReports();
    loadSettings();
});