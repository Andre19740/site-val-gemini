document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const filtersContainer = document.querySelector('.filters');
    if (!grid) return;

    function createBeforeAfterSlider(projectId, title) {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'before-after-slider';
        const imgPath = `assets/images/realisations/${projectId}`;

        sliderContainer.innerHTML = `
            <img src="${imgPath}/avant.webp" alt="Avant - ${title}" class="image-before" loading="lazy">
            <img src="${imgPath}/apres.webp" alt="Après - ${title}" class="image-after" loading="lazy">
            <div class="slider-handle"></div>
            <input type="range" class="slider-input" min="0" max="100" value="50">
        `;

        const sliderInput = sliderContainer.querySelector('.slider-input');
        const imgAfter = sliderContainer.querySelector('.image-after');
        const sliderHandle = sliderContainer.querySelector('.slider-handle');

        sliderInput.addEventListener('input', (e) => {
            const value = e.target.value;
            imgAfter.style.clipPath = `inset(0 0 0 ${value}%)`;
            sliderHandle.style.left = `${value}%`;
        });
        
        return sliderContainer;
    }

    fetch('data/projects.json')
        .then(response => response.json())
        .then(projects => {
            grid.innerHTML = ''; 
            projects.forEach(project => {
                const card = document.createElement('article');
                card.className = 'project-card';
                card.dataset.categories = project.categorie.join(' ');

                const slider = createBeforeAfterSlider(project.id, project.titre);
                
                const info = document.createElement('div');
                info.className = 'project-info';
                info.innerHTML = `<h3>${project.titre}</h3><p>${project.ville}</p><p>${project.contexte}</p>`;
                
                card.append(slider, info);
                grid.appendChild(card);
            });
        });

    filtersContainer.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') return;
        const filter = e.target.dataset.filter;
        filtersContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.categories.includes(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});