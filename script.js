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
