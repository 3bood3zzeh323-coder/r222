/**
 * Global App Logic: Audio, Transitions, State Management
 */

document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    createStars();
});

// --- Audio Management ---
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

function initAudio() {
    if (!bgMusic) return;
    
    // Check local storage for music preference
    const isPlaying = localStorage.getItem('remaMusicPlaying') === 'true';
    bgMusic.volume = 0.4;
    
    if (isPlaying) {
        bgMusic.play().catch(() => {
            // Browser autoplay policy blocked it, wait for interaction
            localStorage.setItem('remaMusicPlaying', 'false');
            updateMusicBtn(false);
        });
        updateMusicBtn(true);
    } else {
        updateMusicBtn(false);
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                localStorage.setItem('remaMusicPlaying', 'true');
                updateMusicBtn(true);
            } else {
                bgMusic.pause();
                localStorage.setItem('remaMusicPlaying', 'false');
                updateMusicBtn(false);
            }
        });
    }
}

function updateMusicBtn(isPlaying) {
    if (musicToggle) {
        musicToggle.innerHTML = isPlaying ? '🔊 Music On' : '🔇 Music Off';
    }
}

// --- Page Transitions ---
function transitionTo(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 800);
}

// --- Background Stars ---
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.fontSize = `${Math.random() * 10 + 5}px`;
        star.style.opacity = Math.random();
        star.style.animation = `pulse ${Math.random() * 3 + 2}s infinite alternate`;
        star.style.zIndex = '0';
        starsContainer.appendChild(star);
    }
}

// --- Utility: Play SFX ---
function playSound(src) {
    const audio = new Audio(src);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play blocked:', e));
}