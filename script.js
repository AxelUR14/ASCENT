document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const galleries = document.querySelectorAll('.gallery');

    // Ejemplo de imágenes para las galerías
    const images = [
        { url: '1.jpeg', title: 'Producto 1' },
        { url: '2.jpeg', title: 'Producto 2' },
        { url: '3.jpeg', title: 'Producto 3' },
        { url: '4.jpeg', title: 'Producto 4' }
    ];

    // Cargar galerías
    galleries.forEach(gallery => {
        images.forEach(image => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${image.url}" alt="${image.title}">
            `;
            gallery.appendChild(item);
        });
    });

    // Cambiar sección
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Cambiar estado activo del menú
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Mostrar sección correspondiente
            const sectionId = item.getAttribute('data-section');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
        });
    });
});