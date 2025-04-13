document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');

    const galleryImages = [
        { url: 'youngla.jpeg', title: 'Youngla 1' },
        { url: '2.jpeg', title: 'Youngla 2' },
        { url: '3.jpeg', title: 'Youngla 3' },
        { url: '4.jpeg', title: 'Youngla 4' }
    ];

    const reportsData = [
        { url: '5.jpeg', title: 'Shark 1' },
        { url: '6.jpeg', title: 'Shark 2' }
    ];

    const imageGallery = document.querySelector('.image-gallery');
    const reportsContainer = document.querySelector('.reports-container');

    menuItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.getAttribute('data-target');
            sections.forEach(section => {
                section.classList.toggle('active', section.id === targetId);
            });
        });
    });

    function loadGallery() {
        imageGallery.innerHTML = galleryImages.map(
            img => `
                <div class="gallery-item">
                    <img src="${img.url}" alt="${img.title}">
                    <div class="gallery-caption">${img.title}</div>
                </div>
            `
        ).join('');
    }

    function loadReports() {
        reportsContainer.innerHTML = reportsData.map(
            report => `
                <div class="report-card">
                    <img src="${report.url}" alt="${report.title}">
                    <div class="report-caption">${report.title}</div>
                </div>
            `
        ).join('');
    }

    loadGallery();
    loadReports();
});