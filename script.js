// =========================================================
// disz2 swipe slider
// =========================================================
const DISZ2_SLIDES = 60; // dt1.jpg .. dt60.jpg

function buildSlider(sliderEl) {
    const track = sliderEl.querySelector('.slider-track');
    const counter = sliderEl.querySelector('.slider-counter');

    for (let i = 1; i <= DISZ2_SLIDES; i++) {
        const img = document.createElement('img');
        img.src = `assets/images/disz2/dt${i}.jpg`;
        img.alt = `Kolbásztöltő verseny ${i}`;
        img.loading = 'lazy';
        img.className = 'slider-img';
        // Lazy loading means src isn't fetched until visible; don't open modal
        // before the load, and only open when the click was a genuine tap
        // (not part of a swipe gesture).
        img.addEventListener('click', function (e) {
            if (sliderEl.dataset.hadSwipe === '1') return;
            openModal(this.src);
        });
        track.appendChild(img);
    }

    let index = 0;

    function goTo(i) {
        index = Math.max(0, Math.min(DISZ2_SLIDES - 1, i));
        track.style.transform = `translateX(-${index * 100}%)`;
        counter.textContent = `${index + 1} / ${DISZ2_SLIDES}`;
    }

    sliderEl.querySelector('.slider-prev').addEventListener('click', () => {
        sliderEl.dataset.hadSwipe = '1';
        goTo(index - 1);
        clearTimeoutSwipe(sliderEl);
    });
    sliderEl.querySelector('.slider-next').addEventListener('click', () => {
        sliderEl.dataset.hadSwipe = '1';
        goTo(index + 1);
        clearTimeoutSwipe(sliderEl);
    });

    // Touch / swipe support
    let startX = null;
    let moved = false;
    const viewport = sliderEl.querySelector('.slider-viewport');

    viewport.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        moved = false;
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
        if (startX !== null && Math.abs(e.touches[0].clientX - startX) > 30) {
            moved = true;
        }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        startX = null;
        if (Math.abs(dx) > 40) {
            moved = true;
            sliderEl.dataset.hadSwipe = '1';
            if (dx < 0) goTo(index + 1);
            else goTo(index - 1);
            clearTimeoutSwipe(sliderEl);
            return;
        }
        // A tap (no drag) opens the modal
        if (!moved) {
            const img = e.target.closest('.slider-img');
            if (img) openModal(img.src);
        }
    });

    goTo(0);
}

function clearTimeoutSwipe(sliderEl) {
    // Re-enable direct image clicks shortly after an arrow button press
    setTimeout(() => { sliderEl.dataset.hadSwipe = '0'; }, 100);
}

document.querySelectorAll('.disz2-slider').forEach(buildSlider);

// =========================================================
// Image modal
// =========================================================
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
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    modalImg.src = '';
    document.body.style.overflow = 'auto';
}

modalClose.onclick = closeModal;
modal.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// =========================================================
// Language switcher
// =========================================================
document.getElementById('hu-btn').addEventListener('click', function () {
    document.getElementById('hu-content').style.display = 'block';
    document.getElementById('de-content').style.display = 'none';
    this.classList.add('active');
    document.getElementById('de-btn').classList.remove('active');
});

document.getElementById('de-btn').addEventListener('click', function () {
    document.getElementById('hu-content').style.display = 'none';
    document.getElementById('de-content').style.display = 'block';
    this.classList.add('active');
    document.getElementById('hu-btn').classList.remove('active');
});

// =========================================================
// Navigation highlight + smooth scroll
// =========================================================
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            e.preventDefault();

            let scrollToSection = targetSection;
            const deContent = document.getElementById('de-content');
            if (deContent && deContent.style.display !== 'none') {
                const deTargetSection = document.getElementById(targetId + '-de');
                if (deTargetSection) scrollToSection = deTargetSection;
            }

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            scrollToSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.content-section');
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const correspondingLink = document.querySelector(`nav a[href="#${sectionId.replace('-de', '')}"]`);
            if (correspondingLink) correspondingLink.classList.add('active');
        }
    });
});
