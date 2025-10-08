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
