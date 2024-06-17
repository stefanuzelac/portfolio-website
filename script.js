let skillBars = {};
let skillPercentages = {};

function loadSkillBars() {
    console.log('loadSkillBars called');
    Object.keys(skillBars).forEach(skill => {
        skillBars[skill].style.height = '0%'; // Reset the skill bar
        let percentageElement = document.getElementById(`percentage-${skill}`);
        percentageElement.textContent = '0%'; // Reset the percentage text
        percentageElement.style.opacity = "0"; // Initially the percentage is hidden
        let height = 0;
        const interval = setInterval(() => {
            if (height >= parseInt(skillPercentages[skill])) {
                clearInterval(interval);
            } else {
                height++;
                skillBars[skill].style.height = `${height}%`;
                percentageElement.textContent = `${height}%`; // Update the percentage text
                percentageElement.style.opacity = "1"; // Make the percentage visible
            }
        }, 20);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');
    const header = document.getElementById("site-header");

    hamburger.addEventListener('click', function () {
        navLinksContainer.classList.toggle('show');
    });

    const updateNavLinksPosition = () => {
        const headerHeight = window.scrollY > 0 ? '3rem' : getComputedStyle(document.documentElement).getPropertyValue('--header-height');
        navLinksContainer.style.top = headerHeight;
    };

    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            header.classList.add("small-header");
        } else {
            header.classList.remove("small-header");
        }
        updateNavLinksPosition();
        navLinksContainer.classList.remove('show'); // Close the nav menu on scroll
    });

    const form = document.getElementById('contact-form');
    const responseMessage = document.createElement('p');
    responseMessage.id = 'response-message';
    form.appendChild(responseMessage);

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        fetch('/submit-form', {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => response.text())
            .then(data => {
                responseMessage.textContent = data;
                responseMessage.style.display = 'block';
            })
            .catch(error => {
                responseMessage.textContent = 'Error submitting form: ' + error;
                responseMessage.style.display = 'block';
            });
    });

    const elem = document.querySelector('.profile-image-container');
    elem.addEventListener("animationend", function () {
        this.style.animation = "none";
    });

    const navLinks = document.querySelectorAll('#site-header nav a');

    // Scroll to section on click
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default action
            const target = document.querySelector(link.getAttribute('href')); // Get the target element
            target.scrollIntoView({
                behavior: 'smooth'
            }); // Scroll to target element
            navLinksContainer.classList.remove('show'); // Hide the nav menu after click
        });
    });

    skillBars = {
        html: document.querySelector("#bar-html"),
        css: document.querySelector("#bar-css"),
        javascript: document.querySelector("#bar-javascript")
    };

    skillPercentages = {
        html: '100',
        css: '90',
        javascript: '85'
    };

    document.querySelector('#skills').addEventListener('transitionend', (event) => {
        if (event.target.classList.contains('visible')) {
            loadSkillBars();
        }
    });

    const sections = document.querySelectorAll('.hidden');

    sections.forEach((section) => {
        section.style.height = 'auto'; // Ensure sections are auto height
    });

    const sectionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                clearTimeout(entry.target.timeoutID);
                entry.target.classList.remove('hidden', 'fadeOut');
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') {
                    loadSkillBars();
                }
            } else {
                clearTimeout(entry.target.timeoutID);
                entry.target.timeoutID = setTimeout(() => {
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('fadeOut');
                }, 500);
            }
        });
    }, {
        threshold: [0.1, 0.25, 0.5]
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();

    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": accentColor
            },
            "shape": {
                "type": "triangle",
            },
            "opacity": {
                "value": 0.2,
                "random": false,
            },
            "size": {
                "value": 6,
                "random": true,
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#555555",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "hover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Adding event listeners to each skill image
    const skillImages = document.querySelectorAll('.skill img');
    skillImages.forEach((img) => {
        img.addEventListener('click', function () {
            if (this.classList.contains('rotated')) {
                this.classList.remove('rotated');
                this.style.transform = 'none';
            } else {
                skillImages.forEach((image) => {
                    image.classList.remove('rotated');
                    image.style.transform = 'none';
                });
                this.classList.add('rotated');
                this.style.transform = 'rotate(360deg)';
            }
        });
    });
});