/**
 * Particle Effects: Falling objects, explosions, confetti
 */

// Generate a burst of particles at a specific X, Y
function createExplosion(x, y, emojis = ['✨', '💖', '🎉']) {
    const container = document.body;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random trajectory
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.fontSize = `${Math.random() * 20 + 10}px`;
        p.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
        
        container.appendChild(p);

        // Animate
        requestAnimationFrame(() => {
            p.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg) scale(0)`;
            p.style.opacity = '0';
        });

        // Cleanup
        setTimeout(() => p.remove(), 1000);
    }
}

// Continuous falling items
let fallingInterval;
function startFallingItems(emojis = ['🌹', '🌸', '🍬', '💖'], speed = 1000) {
    const container = document.getElementById('falling-container') || document.body;
    
    fallingInterval = setInterval(() => {
        const el = document.createElement('div');
        el.className = 'falling-item';
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Randomize starting position and size
        el.style.left = `${Math.random() * 100}vw`;
        el.style.fontSize = `${Math.random() * 20 + 15}px`;
        el.style.animation = `fall ${Math.random() * 3 + 4}s linear forwards`;
        
        container.appendChild(el);
        
        // Remove after animation finishes
        setTimeout(() => el.remove(), 7000);
    }, speed);
}

function stopFallingItems() {
    clearInterval(fallingInterval);
}

// Ending screen fireworks
function startFireworks() {
    const container = document.getElementById('fireworks-container') || document.body;
    
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight / 2); // Keep fireworks in upper half
        createExplosion(x, y, ['🎆', '🎇', '✨', '💖']);
    }, 1500);
}