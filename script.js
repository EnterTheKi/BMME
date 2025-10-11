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
});

document.getElementById('de-btn').addEventListener('click', function() {
    document.getElementById('hu-content').style.display = 'none';
    document.getElementById('de-content').style.display = 'block';
    this.classList.add('active');
    document.getElementById('hu-btn').classList.remove('active');
});

// Navigation Highlight
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
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
