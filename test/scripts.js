var gradient = new Gradient();
gradient.initGradient('#gradient-canvas');

document.querySelector('#overlay p').addEventListener('click', function() {
    this.classList.add('fade-to-gray');
    document.getElementById('overlay').classList.add('hidden');

    setTimeout(function() {
        var container = document.querySelector('.container');
        container.classList.add('visible');
        console.log('Container should be visible now.');
    }, 2000);
});

document.getElementById('overlay').addEventListener('transitionend', function(e) {
    if (e.propertyName === 'opacity' && this.classList.contains('hidden')) {
        this.style.display = 'none';
        console.log('Overlay is now hidden.');
    }
});

let firstMove = true;
let particleInterval;
let mouseX, mouseY;

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (firstMove) {
            firstMove = false;
            createParticles(mouseX, mouseY, true, "particle", 15, 15);
            particleInterval = setInterval(() => {
                createParticles(mouseX, mouseY, false, "particle", 15, 15);
            }, 100);
        }
    });

    function createParticles(x, y, initial, className, spreadX, spreadY) {
        for (let i = 0; i < 1; i++) {
            createParticle(x, y, initial, className, spreadX, spreadY);
        }
    }

    function createParticle(x, y, initial, className, spreadX, spreadY) {
        const particle = document.createElement("div");
        particle.classList.add(className);
        if (initial) particle.classList.add("first-move");
        document.body.appendChild(particle);
        particle.style.backgroundColor = ["#656a95", "#0c0d0d"][Math.floor(Math.random() * 2)];
        particle.style.left = `${x + (Math.random() - 0.5) * spreadX}px`;
        particle.style.top = `${y + (Math.random() - 0.5) * spreadY}px`;
        particle.style.animationDuration = `${0.5 * Math.random() + 0.5}s`;
        particle.style.transform = `translateX(${(Math.random() - 0.5) * spreadX}px) translateY(${(Math.random() - 0.5) * spreadY}px)`;
        setTimeout(() => {
            particle.remove();
        }, 500);
    }
});