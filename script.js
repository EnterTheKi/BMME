// Image modal functionality
let modal = document.createElement('div');
modal.id = 'image-modal';
modal.innerHTML = `
    <span id="modal-close">&times;</span>
    <img id="modal-image" src="" alt="">
`;
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.zIndex = '10000';
modal.style.left = '0';
modal.style.top = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.overflow = 'auto';
modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
document.body.appendChild(modal);

let modalImg = document.getElementById('modal-image');
let modalClose = document.getElementById('modal-close');

function openModal(imgSrc) {
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking on close button or outside the image
modalClose.onclick = closeModal;
modal.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// ESC key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Add click event to all gallery images
document.querySelectorAll('.gallery-img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        openModal(this.src);
    });
});

// Language Switcher
document.getElementById('hu-btn').addEventListener('click', function() {
    document.getElementById('hu-content').style.display = 'block';
    document.getElementById('de-content').style.display = 'none';
    this.classList.add('active');
    document.getElementById('de-btn').classList.remove('active');

    // Re-initialize slideshows for Hungarian content
    setTimeout(() => {
        const huSlideshows = document.querySelectorAll('#hu-content .slideshow');
        huSlideshows.forEach(initSlideshow);
    }, 10);
});

document.getElementById('de-btn').addEventListener('click', function() {
    document.getElementById('hu-content').style.display = 'none';
    document.getElementById('de-content').style.display = 'block';
    this.classList.add('active');
    document.getElementById('hu-btn').classList.remove('active');

    // Re-initialize slideshows for German content
    setTimeout(() => {
        const deSlideshows = document.querySelectorAll('#de-content .slideshow');
        deSlideshows.forEach(initSlideshow);
    }, 10);
});

// Slideshow Manual Control
function initSlideshow(slideshowElement) {
    const slidesContainer = slideshowElement.querySelector('.slides-container');
    let currentSlide = parseInt(slideshowElement.dataset.currentSlide) || 0;
    const totalSlides = 8;
    let isManual = false;

    function updateSlide() {
        if (!isManual) return;
        slidesContainer.style.animation = 'none';
        slidesContainer.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
        slideshowElement.dataset.currentSlide = currentSlide;
    }

    // Look for both regular and German-specific buttons
    const leftBtn = slideshowElement.querySelector('.left-btn');
    const rightBtn = slideshowElement.querySelector('.right-btn');

    // Also check for German-specific buttons
    const leftBtnDe = slideshowElement.querySelector('.left-btn-de');
    const rightBtnDe = slideshowElement.querySelector('.right-btn-de');

    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isManual = true;
            currentSlide--;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            updateSlide();
        });

        rightBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isManual = true;
            currentSlide++;
            if (currentSlide >= totalSlides) currentSlide = 0;
            updateSlide();
        });
    }

    // Handle German-specific buttons if they exist
    if (leftBtnDe && rightBtnDe) {
        leftBtnDe.addEventListener('click', (e) => {
            e.stopPropagation();
            isManual = true;
            currentSlide--;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            updateSlide();
        });

        rightBtnDe.addEventListener('click', (e) => {
            e.stopPropagation();
            isManual = true;
            currentSlide++;
            if (currentSlide >= totalSlides) currentSlide = 0;
            updateSlide();
        });
    }
}

// Initialize slideshows
const slideshows = document.querySelectorAll('.slideshow');
slideshows.forEach(initSlideshow);

// Navigation Highlight
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Scroll to the section smoothly
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            e.preventDefault();

            // For German content, we need to scroll to the German section
            let scrollToSection = targetSection;

            // If we're currently showing German content, try to find the German equivalent
            const deContent = document.getElementById('de-content');
            if (deContent && deContent.style.display !== 'none') {
                const deTargetId = targetId + '-de';
                const deTargetSection = document.getElementById(deTargetId);
                if (deTargetSection) {
                    scrollToSection = deTargetSection;
                }
            }

            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Scroll to the appropriate section
            scrollToSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update navigation highlight based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.content-section');
    const scrollPos = window.pageYOffset + 200; // offset to detect section earlier

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // Check if we're in a specific section
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));

            // Find the corresponding nav link
            const correspondingLink = document.querySelector(`nav a[href="#${sectionId.replace('-de', '')}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// Gallery Toggle
const huToggle = document.getElementById('hu-gallery-toggle');
const huExpanded = document.getElementById('hu-gallery-expanded');
huToggle.addEventListener('click', function() {
    if (huExpanded.style.display === 'none') {
        huExpanded.style.display = 'block';
        huToggle.textContent = 'Kevesebb megjelenítése';
    } else {
        huExpanded.style.display = 'none';
        huToggle.textContent = 'Több megjelenítése';
    }
});

const deToggle = document.getElementById('de-gallery-toggle');
const deExpanded = document.getElementById('de-gallery-expanded');
deToggle.addEventListener('click', function() {
    if (deExpanded.style.display === 'none') {
        deExpanded.style.display = 'block';
        deToggle.textContent = 'Weniger anzeigen';
    } else {
        deExpanded.style.display = 'none';
        deToggle.textContent = 'Mehr anzeigen';
    }
});
