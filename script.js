document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuItems = document.querySelectorAll('.menu-item');
    const contentViews = document.querySelectorAll('.content-view');
    const imageGallery = document.querySelector('.image-gallery');
    const imageReports = document.querySelector('.image-reports');

    // Datos de ejemplo para la galería
    const galleryImages = [
        { url: '2.jpeg', title: 'Galería 1' },
        { url: '2.jpeg', title: 'Galería 2' },
        { url: '3.jpeg', title: 'Galería 3' },
        { url: '4.jpeg', title: 'Galería 4' },
        { url: '5.jpeg', title: 'Galería 5' },
        { url: '6.jpeg', title: 'Galería 6' },
    ];

    // Datos de ejemplo para reportes
    const reportImages = [
        { url: '1.jpeg', title: 'Reporte 1' },
        { url: '2.jpeg', title: 'Reporte 2' },
        { url: '3.jpeg', title: 'Reporte 3' },
        { url: '4.jpeg', title: 'Reporte 4' },
        { url: '5.jpeg', title: 'Reporte 5' },
        { url: '6.jpeg', title: 'Reporte 6' },
    ];

    // Función para cargar la galería
    function loadGallery() {
        imageGallery.innerHTML = '';
        galleryImages.forEach(({ url, title }) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${url}" alt="${title}">
                <div class="gallery-caption">${title}</div>
            `;
            imageGallery.appendChild(item);
        });
    }

    // Función para cargar reportes
    function loadReports() {
        imageReports.innerHTML = '';
        reportImages.forEach(({ url, title }) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${url}" alt="${title}">
                <div class="gallery-caption">${title}</div>
            `;
            imageReports.appendChild(item);
        });
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
            if (viewId === 'galeria') {
                loadGallery();
            } else if (viewId === 'reportes') {
                loadReports();
            }
        }
    }

    // Event listeners para los items del menú
    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
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
});