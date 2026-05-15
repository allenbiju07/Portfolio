const canvas = document.getElementById("bgCanvas");

const ctx = canvas.getContext("2d");

let width;
let height;

let particles = [];

function resizeCanvas() {

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

class Particle {

  constructor() {
    this.reset();
  }

  reset() {

    this.x = Math.random() * width;
    this.y = Math.random() * height;

    this.radius = Math.random() * 2 + 0.5;

    this.velocityX = (Math.random() - 0.5) * 0.3;
    this.velocityY = (Math.random() - 0.5) * 0.3;
  }

  update() {

    this.x += this.velocityX;
    this.y += this.velocityY;

    if (
      this.x < 0 ||
      this.x > width ||
      this.y < 0 ||
      this.y > height
    ) {
      this.reset();
    }
  }

  draw() {

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(0,245,196,0.5)";

    ctx.fill();
  }
}

for (let i = 0; i < 45; i++) {
  particles.push(new Particle());
}

function connectParticles() {

  for (let i = 0; i < particles.length; i++) {

    for (let j = i + 1; j < particles.length; j++) {

      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 110) {

        ctx.beginPath();

        ctx.moveTo(particles[i].x, particles[i].y);

        ctx.lineTo(particles[j].x, particles[j].y);

        ctx.strokeStyle =
          `rgba(0,245,196,${0.08 - distance / 1600})`;

        ctx.lineWidth = 1;

        ctx.stroke();
      }
    }
  }
}

function animate() {

  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle) => {

    particle.update();

    particle.draw();
  });

  connectParticles();

  requestAnimationFrame(animate);
}

animate();