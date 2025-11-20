// Wonders Data
const wonders = [
    {
        id: 1,
        name: "Hunza Valley",
        region: "Gilgit-Baltistan",
        description: "A breathtaking valley nestled in the Karakoram Mountains, known for its stunning landscapes, ancient forts, and the longevity of its inhabitants.",
        image: "url('../client/public/hunza-valley.png')",
        highlights: ["Ancient Forts", "Mountain Peaks", "Pristine Rivers"],
    },
    {
        id: 2,
        name: "Mohenjo-daro",
        region: "Sindh",
        description: "One of the world's earliest urban settlements, this 4,600-year-old Indus Valley Civilization site reveals the sophistication of ancient Pakistani culture.",
        image: "url('../client/public/mohenjo-daro.jpg')",
        highlights: ["Ancient Ruins", "Archaeology", "History"],
    },
    {
        id: 3,
        name: "Fairy Meadows",
        region: "Gilgit-Baltistan",
        description: "A pristine alpine meadow offering panoramic views of Nanga Parbat, one of the world's most dangerous mountains, surrounded by wildflowers.",
        image: "url('../client/public/fairy-meadows.jpg')",
        highlights: ["Alpine Meadows", "Mountain Views", "Trekking"],
    },
    {
        id: 4,
        name: "Badshahi Mosque",
        region: "Punjab",
        description: "An iconic Mughal architectural masterpiece in Lahore, one of the largest mosques in the world, showcasing intricate marble and sandstone work.",
        image: "url('../client/public/badshahi-mosque.jpg')",
        highlights: ["Mughal Architecture", "Marble Work", "Cultural Icon"],
    },
    {
        id: 5,
        name: "Chitral Kalash Valleys",
        region: "Khyber Pakhtunkhwa",
        description: "Home to the ancient Kalash people, these valleys preserve unique cultural traditions, festivals, and traditions dating back thousands of years.",
        image: "url('../client/public/chitral-kalash.jpg')",
        highlights: ["Indigenous Culture", "Festivals", "Traditions"],
    },
    {
        id: 6,
        name: "Swat Valley",
        region: "Khyber Pakhtunkhwa",
        description: "Known as the 'Switzerland of Pakistan,' Swat Valley features emerald rivers, lush forests, ancient Buddhist sites, and snow-capped peaks.",
        image: "url('../client/public/swat-valley.jpg')",
        highlights: ["Buddhist Heritage", "Rivers", "Mountain Scenery"],
    },
];

let activeWonder = 0;

// Initialize the page
function init() {
    renderWonderCards();
    updateFeaturedWonder(activeWonder);
    setupSmoothScroll();
}

// Render wonder cards
function renderWonderCards() {
    const wondersGrid = document.getElementById('wonders-grid');
    
    wonders.forEach((wonder, index) => {
        const card = document.createElement('div');
        card.className = `wonder-card ${index === activeWonder ? 'active' : ''}`;
        card.onclick = () => selectWonder(index);
        
        card.innerHTML = `
            <div class="wonder-card-image" style="background-image: ${wonder.image}">
                <h3 class="wonder-card-title">${wonder.name}</h3>
            </div>
            <div class="wonder-card-content">
                <div class="wonder-card-region">
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${wonder.region}
                </div>
                <p class="wonder-card-description">${wonder.description}</p>
            </div>
        `;
        
        wondersGrid.appendChild(card);
    });
}

// Update featured wonder
function updateFeaturedWonder(index) {
    const wonder = wonders[index];
    
    // Update featured image
    const featuredImage = document.getElementById('featured-image');
    featuredImage.style.backgroundImage = wonder.image;
    
    // Update region
    document.getElementById('featured-region').textContent = wonder.region;
    
    // Update name
    document.getElementById('featured-name').textContent = wonder.name;
    document.getElementById('featured-button-name').textContent = wonder.name;
    
    // Update description
    document.getElementById('featured-description').textContent = wonder.description;
    
    // Update highlights
    const highlightsList = document.getElementById('featured-highlights');
    highlightsList.innerHTML = '';
    wonder.highlights.forEach(highlight => {
        const tag = document.createElement('span');
        tag.className = 'highlight-tag';
        tag.textContent = highlight;
        highlightsList.appendChild(tag);
    });
}

// Select wonder
function selectWonder(index) {
    activeWonder = index;
    updateFeaturedWonder(index);
    
    // Update active state on cards
    const cards = document.querySelectorAll('.wonder-card');
    cards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Scroll to featured wonder smoothly
    document.querySelector('.featured-wonder').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Setup smooth scroll for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add animation on scroll
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.wonder-card, .stat-item, .feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        handleScrollAnimation();
    });
} else {
    init();
    handleScrollAnimation();
}
