const canvas = document.getElementById('graffitiCanvas');
const ctx = canvas.getContext('2d');

// Fit canvas perfectly to the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Array of bright, neon graffiti colors
const graffitiColors = ['#ff0055', '#00ffcc', '#ffcc00', '#ff00ff', '#00ffff'];
const particles = [];

// Blueprint for a single graffiti sprinkle particle
class SprinkleParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        // Start below the screen so they appear to float upwards
        this.y = canvas.height + Math.random() * 100; 
        
        // Randomize sizes to mimic fine mist vs larger drops
        this.size = Math.random() * 4 + 1; 
        
        // Floating upward speeds
        this.speedY = -(Math.random() * 2 + 0.5); 
        // Slight sideways drift
        this.speedX = Math.random() * 1 - 0.5; 
        
        // Pick a random spray color
        this.color = graffitiColors[Math.floor(Math.random() * graffitiColors.length)];
        // Random opacity for depth
        this.alpha = Math.random() * 0.5 + 0.5; 
    }

    // Move the particle
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // If particle drifts off the top, reset it to the bottom
        if (this.y < -10) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }

    // Paint the particle onto the screen
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        // Gives the sprinkles a slight neon glowing spray effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        ctx.fill();
        ctx.restore();
    }
}

// Generate an initial pool of 120 spray particles
for (let i = 0; i < 120; i++) {
    particles.push(new SprinkleParticle());
}

// Seamless rendering engine loop
function animate() {
    // Clear canvas entirely each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Process and draw every sprinkle
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Ignite the animation
animate();
