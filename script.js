document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuItems = document.querySelectorAll('.menu-item');
    const contentViews = document.querySelectorAll('.content-view');
    const imageGallery = document.querySelector('.image-gallery');
    const reportsContainer = document.querySelector('.reports-container');
    const settingsForm = document.querySelector('.settings-form');
    const modal3D = document.getElementById("model3d-modal");
   const modelViewer = document.getElementById("model-viewer");
   const close3D = document.querySelector(".close-3d");
   document.addEventListener('DOMContentLoaded', function() {
    // 1. Selectores del botón y menú
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', ()=>{
                    sidebar.classList.remove('active');
                });
            });
        });
    }

    // 2. Tus selectores actuales
    const menuItems = document.querySelectorAll('.menu-item');
    const contentViews = document.querySelectorAll('.content-view');
    // ... resto de tu código ...
});
    // Datos de ejemplo para la galería
    const galleryImages = [
        { url: 'youngla.jpeg',
        title: 'Youngla',
        frameText:"Attack of titans",
        borderColor:"#ff0000"
    },
        { url: '2.jpeg', title: '' },
        { url: '3.jpeg', title: '' },
        { url: '4.jpeg', title: '' },
        { url: '5.jpeg', title: '' },
        { url: '6.jpeg', title: '' }
    ];
    
    // Datos de ejemplo para reportes
    const reportsData = [
        { url: 'youngla.jpeg', title: "" },
        { url: '2.jpeg', title: '' },
        { url: '3.jpeg', title: '' },
        { url: '4.jpeg', title: '' },
        { url: '5.jpeg', title: '' },
        { url: '6.jpeg', title: '' }
    ];
    
    // Función para cargar la galería
    function loadGallery() {
        imageGallery.innerHTML = '';
        galleryImages.forEach(image => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            const borderStyle = image.borderColor ? style="border-color:${image.borderColor}" : '';
            item.innerHTML = `
                <div class="image-frame" ${borderStyle}>
                    <img src="${image.url}" alt="${image.title}">
                    <div class="frame-text">${image.frameText||""}</div>
            `;
            item.addEventListener('click', () => openImageModal(image.url));
            imageGallery.appendChild(item);
        });
    }
    
    // Función para cargar reportes
    function loadReports() {
        imageGallery.innerHTML = '';
        galleryImages.forEach(image => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${image.url}" alt="${image.title}">
                <div class="gallery-caption">${image.title}</div>
            `;
            item.addEventListener('click', () => openImageModal(image.url));
            reportsContainer.appendChild(item);
        });
    
    }
    
    
    function openImageModal(imageUrl) {
        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-image");
        modal.style.display = "block";
        modalImg.src = imageUrl;
    }
    
    // Cerrar modal
    document.querySelector(".close").addEventListener("click", () => {
        document.getElementById("image-modal").style.display = "none";
    });
    
    
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
                case 'contactanos':
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