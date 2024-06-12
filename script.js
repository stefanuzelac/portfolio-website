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
        // Check if the target has 'visible' class
        if (event.target.classList.contains('visible')) {
            loadSkillBars();
        }
    });

    // New code for animating sections
    const sections = document.querySelectorAll('.hidden');
    let maxHeight = 0;

    sections.forEach((section) => {
        const contentHeight = section.scrollHeight; // this gives the actual content height
        if (contentHeight > maxHeight) {
            maxHeight = contentHeight;
        }
    });

    sections.forEach((section) => {
        if (window.innerWidth <= 768) {
            // Check if the content of the section exceeds the viewport height
            if (section.scrollHeight > window.innerHeight) {
                section.style.height = 'auto'; // let it be its natural height
            } else {
                section.style.height = '100vh'; // occupy full viewport height
            }
        } else {
            section.style.height = `100vh`; // set to max content height
        }
    });

    const sectionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                // Clear any existing timeout
                clearTimeout(entry.target.timeoutID);
                // Immediately start fading in
                entry.target.classList.remove('hidden', 'fadeOut');
                entry.target.classList.add('visible');

                // If the visible section is the #skills section, load the skill bars
                if (entry.target.id === 'skills') {
                    loadSkillBars();
                }

            } else if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
                // Clear any existing timeout
                clearTimeout(entry.target.timeoutID);
                // Start fading out after a delay
                entry.target.timeoutID = setTimeout(() => {
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('fadeOut');
                }, 500); // Delay before fade out begins, adjust as needed
            }
        });
    }, {
        threshold: [0, 0.5, 1] // You may need to adjust these threshold values
    });

    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Retrieve the CSS variable value for accent color
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();

    // Set up the particles effect
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
});