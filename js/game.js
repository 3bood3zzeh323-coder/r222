/**
 * Interactive Game Logic for game.html
 */

document.addEventListener('DOMContentLoaded', () => {
    const escapeBtn = document.getElementById('escape-btn');
    const ponyContainer = document.getElementById('pony-container');
    const successModal = document.getElementById('success-modal');

    if (!escapeBtn || !ponyContainer) return;

    let clickCount = 0;

    // Button Escape Logic
    const moveButton = () => {
        const maxX = window.innerWidth - escapeBtn.offsetWidth;
        const maxY = window.innerHeight - escapeBtn.offsetHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        escapeBtn.style.left = `${randomX}px`;
        escapeBtn.style.top = `${randomY}px`;
        escapeBtn.style.transform = `translate(0, 0)`; // reset translate since we use absolute coordinates
    };

    // Register a click/tap, then (if not done yet) make the button dodge
    // to a new spot so the next attempt has to chase it again.
    escapeBtn.addEventListener('click', () => {
        clickCount++;
        checkClicks();
        if (clickCount < 3) moveButton();
    });

    function checkClicks() {
        if (clickCount === 1) {
            escapeBtn.innerText = "Too slow! 😜";
            escapeBtn.style.transitionDuration = "0.2s"; // faster
        } else if (clickCount === 2) {
            escapeBtn.innerText = "Almost! 🏃‍♀️";
            escapeBtn.style.transitionDuration = "0.1s"; // much faster
        } else if (clickCount >= 3) {
            triggerExplosion();
        }
    }

    // --- Explosion & Pony Spawn ---
    function triggerExplosion() {
        // Hide button
        escapeBtn.style.display = 'none';

        // Massive Explosion
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        createExplosion(centerX, centerY, ['🌹', '🌸', '💖', '🍬', '🍑', '✨', '🎉']);
        createExplosion(centerX - 50, centerY + 50, ['🎇', '✨']);
        createExplosion(centerX + 50, centerY - 50, ['🎇', '💖']);

        // Screen Shake
        document.body.classList.add('screen-shake');

        // Vibration API support
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }

        setTimeout(() => {
            document.body.classList.remove('screen-shake');
            spawnPony();
        }, 800);
    }

    // --- Pony Interaction ---
    let ponyInteractions = 0;
    const maxInteractions = 12;

    function spawnPony() {
        ponyContainer.classList.remove('hidden');
        ponyContainer.classList.add('anim-scale');
    }

    ponyContainer.addEventListener('click', () => {
        ponyInteractions++;

        // Array of random CSS animation classes
        const animations = ['anim-dance', 'anim-jump', 'anim-fly', 'anim-wave', 'anim-scale'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];

        // Reset animation state
        ponyContainer.className = '';

        // Force reflow
        void ponyContainer.offsetWidth;

        // Apply new animation
        ponyContainer.classList.add(randomAnim);

        // Spawn items around pony
        const rect = ponyContainer.getBoundingClientRect();
        createExplosion(rect.left + rect.width/2, rect.top + rect.height/2, ['💖', '🌸', '🍬', '🦋']);

        // Check for win state
        if (ponyInteractions >= maxInteractions) {
            setTimeout(showModal, 1000);
        }
    });

    function showModal() {
        successModal.classList.remove('hidden');
        successModal.classList.add('page-fade-in');
        createExplosion(window.innerWidth / 2, window.innerHeight / 2, ['🎉', '💖', '🦄']);
    }
});