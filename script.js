// DOM Elements
const menuIcon = document.getElementById('menuIcon');
const navbarMenu = document.getElementById('navbarMenu');
const scrollDownBtn = document.getElementById('scrollDown');
const menuTabs = document.getElementById('menuTabs');
const contactForm = document.getElementById('contactForm');
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

// Mobile Menu Toggle
if (menuIcon && navbarMenu) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
}

// Scroll Down Button
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Menu Category Tabs
if (menuTabs) {
    const tabs = menuTabs.querySelectorAll('.category-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all menu sections
            const menuSections = document.querySelectorAll('.menu-section');
            menuSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected menu section
            const categoryId = tab.getAttribute('data-category');
            const selectedSection = document.getElementById(categoryId);
            if (selectedSection) {
                selectedSection.classList.add('active');
            }
        });
    });
}

// Gallery Filters
if (galleryFilters.length > 0 && galleryItems.length > 0) {
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            galleryFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');

            const category = filter.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'all' || category === itemCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Testimonial Slider
const testimonialSlider = document.getElementById('testimonialSlider');
const sliderDots = document.getElementById('sliderDots');

if (testimonialSlider && sliderDots) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            goToSlide(index);
        });

        sliderDots.appendChild(dot);
    });

    const dots = sliderDots.querySelectorAll('.slider-dot');

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide and set current dot as active
        slides[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Initialize slider
    showSlide(currentSlide);

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
}


// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-grid, .values-grid, .team-grid, .menu-grid, .timeline, .gallery-grid');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('animate-in');
        }
    });
}

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
    // Add animation class to elements
    const animatedElements = document.querySelectorAll('.about-grid, .values-grid, .team-grid, .menu-grid, .timeline, .gallery-grid');

    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Initial check for animations
    animateOnScroll();

    // Check for animations on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add some CSS for animations
    const style = document.createElement('style');
    style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
    document.head.appendChild(style);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
});

// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false
});

// Menu tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuTabs = document.querySelectorAll('.category-tab');
    const menuSections = document.querySelectorAll('.menu-section');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get active tab
            const category = tab.getAttribute('data-category');

            // Remove active class from all tabs and add to clicked tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Hide all menu sections
            menuSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected menu section
            document.getElementById(category).classList.add('active');

            // Reset animations for the new active section
            AOS.refresh();

            // Add appear animation to menu items with delay
            const menuItems = document.querySelectorAll(`#${category} .menu-item-appear`);

            menuItems.forEach((item, index) => {
                // Reset animations first
                item.classList.remove('active');

                // Trigger reflow
                void item.offsetWidth;

                // Add animations with staggered delay
                setTimeout(() => {
                    item.classList.add('active');
                }, 100 * index);
            });
        });
    });

    // Initial animation for the active section's menu items
    const initialMenuItems = document.querySelectorAll('#coffee .menu-item-appear');
    initialMenuItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('active');
        }, 500 + (100 * index)); // Adding 500ms initial delay
    });

    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');

        parallaxElements.forEach(element => {
            const speed = 0.5; // Adjust for faster/slower parallax
            const yPos = -(scrollPosition * speed);
            element.style.backgroundPosition = `center ${yPos}px`;
        });
    });

    // Smooth scroll for the scroll indicator
    document.querySelector('.scroll-indicator').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});

// Page loader
setTimeout(function() {
    document.getElementById('pageLoader').classList.add('loader-hidden');
}, 1500);
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            let formValid = true;

            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            // Validate name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                document.getElementById('nameError').textContent = 'Please enter your name';
                formValid = false;
            }

            // Validate email
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                formValid = false;
            }

            // Validate subject
            const subject = document.getElementById('subject');
            if (!subject.value.trim()) {
                document.getElementById('subjectError').textContent = 'Please enter a subject';
                formValid = false;
            }

            // Validate message
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                document.getElementById('messageError').textContent = 'Please enter your message';
                formValid = false;
            }

            if (!formValid) {
                return false;
            } else {
                // Show loading state
                const submitButton = document.getElementById('submitButton');
                submitButton.innerHTML = 'Sending...';
                submitButton.disabled = true;

                // Get form data
                const formData = new FormData(contactForm);

                // Send data using fetch API
                fetch('https://formspree.io/f/mgvaedke', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(data => {
                        // Success - clear form
                        contactForm.reset();

                        // Show success message
                        const formSuccess = document.getElementById('formSuccess');
                        if (formSuccess) {
                            formSuccess.textContent = 'Message sent successfully! We will get back to you soon.';
                            formSuccess.style.display = 'block';

                            // Hide success message after 5 seconds
                            setTimeout(() => {
                                formSuccess.style.display = 'none';
                            }, 5000);
                        }

                        // Reset button
                        submitButton.innerHTML = 'Send Message';
                        submitButton.disabled = false;
                    })
                    .catch(error => {
                        console.error('Error:', error);

                        // Show error message
                        const formSuccess = document.getElementById('formSuccess');
                        if (formSuccess) {
                            formSuccess.textContent = 'Something went wrong. Please try again.';
                            formSuccess.style.display = 'block';
                            formSuccess.style.color = 'red';

                            // Hide error message after 5 seconds
                            setTimeout(() => {
                                formSuccess.style.display = 'none';
                                formSuccess.style.color = '';
                            }, 5000);
                        }

                        // Reset button
                        submitButton.innerHTML = 'Send Message';
                        submitButton.disabled = false;
                    });
            }
        });
    }
});
//newsletter
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Show loading state
            const submitButton = document.getElementById('newsletterSubmitBtn');
            const originalBtnText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Get form data
            const formData = new FormData(newsletterForm);

            // Send data using fetch API
            fetch('https://formspree.io/f/mgvaedke', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    // Clear form
                    newsletterForm.reset();

                    // Show success message
                    const messageDiv = document.getElementById('newsletterMessage');
                    messageDiv.textContent = 'subscribed!';
                    messageDiv.style.display = 'block';
                    messageDiv.style.color = ' #E0D0B7';

                    // Reset button
                    submitButton.textContent = originalBtnText;
                    submitButton.disabled = false;

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        messageDiv.style.display = 'none';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error);

                    // Show error message
                    const messageDiv = document.getElementById('newsletterMessage');
                    messageDiv.textContent = 'Something went wrong. Please try again.';
                    messageDiv.style.display = 'block';
                    messageDiv.style.color = 'red';

                    // Reset button
                    submitButton.textContent = originalBtnText;
                    submitButton.disabled = false;

                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        messageDiv.style.display = 'none';
                    }, 5000);
                });
        });
    }
});
// scroll top to bottom
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 1500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

//about section enhanced
// Map points hover effect
const mapPoints = document.querySelectorAll('.map-point');
mapPoints.forEach(point => {
    point.addEventListener('mouseenter', function() {
        this.style.zIndex = 10;
    });

    point.addEventListener('mouseleave', function() {
        this.style.zIndex = 2;
    });
});

// Process step hover effect
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach((step, index) => {
    step.addEventListener('mouseenter', function() {
        this.querySelector('.step-number').style.transform = 'scale(1.1)';
    });

    step.addEventListener('mouseleave', function() {
        this.querySelector('.step-number').style.transform = 'scale(1)';
    });
});
// Counter animation
const counterItems = document.querySelectorAll('.counter-item');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-count'));
            const countElement = target.querySelector('.counter-number');
            let count = 0;
            const duration = 2000; // 2 seconds
            const interval = Math.floor(duration / countTo);

            const counter = setInterval(() => {
                count++;
                countElement.textContent = count;

                if (count >= countTo) {
                    clearInterval(counter);
                    countElement.textContent = countTo;
                }
            }, interval);

            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

counterItems.forEach(item => {
    counterObserver.observe(item);
});








// Flavor Wheel Interaction
function initFlavorWheel() {
    const flavorSegments = document.querySelectorAll('.wheel-segment');
    const flavorDescription = document.getElementById('flavorDescription');

    if (!flavorSegments.length || !flavorDescription) return;

    const flavorDetails = {
        'Fruity': {
            title: 'Fruity Notes',
            description: 'Bright, tangy flavor profiles reminiscent of berries, citrus, or stone fruits. Our Ethiopian and Kenyan beans often feature these lively characteristics.',
            recommendedBlends: ['Morning Sunrise Blend', 'Berry Burst Single Origin']
        },
        'Nutty': {
            title: 'Nutty Notes',
            description: 'Warm flavors reminiscent of almonds, hazelnuts, or walnuts with a smooth finish. Common in our Brazilian and Colombian coffees.',
            recommendedBlends: ['Hazelnut Heaven', 'Brazilian Velvet']
        },
        'Chocolatey': {
            title: 'Chocolatey Notes',
            description: 'Rich, sweet profiles ranging from milk chocolate to dark cocoa. These deep flavors are prominent in our medium-dark roasts from Guatemala and Honduras.',
            recommendedBlends: ['Midnight Mocha', 'Cocoa Comfort']
        },
        'Floral': {
            title: 'Floral Notes',
            description: 'Delicate, aromatic notes resembling jasmine, rose, or lavender. Our Yirgacheffe and some Asian varieties exhibit these elegant characteristics.',
            recommendedBlends: ['Jasmine Dream', 'Blossom Breeze']
        },
        'Spicy': {
            title: 'Spicy Notes',
            description: 'Warming notes of cinnamon, clove, and cardamom that add complexity. Often found in our Indonesian and Indian coffees.',
            recommendedBlends: ['Sumatra Spice', 'Holiday Warmth']
        },
        'Caramel': {
            title: 'Caramel Notes',
            description: 'Sweet, buttery flavors with hints of caramelized sugar, toffee, and butterscotch. Common in our medium roasts from Central America.',
            recommendedBlends: ['Caramel Comfort', 'Sweet Silk Espresso']
        }
    };

    flavorSegments.forEach(segment => {
        segment.addEventListener('click', () => {
            const flavor = segment.getAttribute('data-flavor');

            if (flavor && flavorDetails[flavor]) {
                const detail = flavorDetails[flavor];

                let html = `
            <h3>${detail.title}</h3>
            <p>${detail.description}</p>
            <div class="recommended-blends">
              <h4>Recommended Blends:</h4>
              <ul>
          `;

                detail.recommendedBlends.forEach(blend => {
                    html += `<li>${blend}</li>`;
                });

                html += `
              </ul>
            </div>
          `;

                flavorDescription.innerHTML = html;

                // Add active class to clicked segment and remove from others
                flavorSegments.forEach(seg => seg.classList.remove('active'));
                segment.classList.add('active');
            }
        });
    });
}

// Brewing Process Interaction
function initBrewingProcess() {
    const brewingItems = document.querySelectorAll('.brewing-item');
    const progressFill = document.querySelector('.progress-fill');
    const progressSteps = document.querySelectorAll('.progress-step');
    const visualItems = document.querySelectorAll('.brewing-visual-item');

    if (!brewingItems.length) return;

    brewingItems.forEach(item => {
        item.addEventListener('click', () => {
            const step = parseInt(item.getAttribute('data-step'));

            // Update active brewing item
            brewingItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update progress bar
            if (progressFill) {
                progressFill.style.width = `${step * 25}%`;
            }

            // Update progress steps
            progressSteps.forEach(s => s.classList.remove('active'));
            progressSteps.forEach((s, i) => {
                if (i < step) s.classList.add('active');
            });

            // Update visual
            visualItems.forEach(v => v.classList.remove('active'));
            visualItems[step - 1].classList.add('active');
        });
    });

    // Auto progress through steps
    let currentStep = 1;

    function progressBrewingStep() {
        currentStep = currentStep % 4 + 1;

        // Trigger click on the next brewing item
        brewingItems.forEach(item => {
            if (parseInt(item.getAttribute('data-step')) === currentStep) {
                item.click();
            }
        });
    }

    // Progress every 5 seconds
    const autoProgressInterval = setInterval(progressBrewingStep, 5000);

    // Stop auto progress when user interacts
    brewingItems.forEach(item => {
        item.addEventListener('click', () => {
            clearInterval(autoProgressInterval);

            // Restart after 15 seconds of no interaction
            setTimeout(() => {
                autoProgressInterval = setInterval(progressBrewingStep, 5000);
            }, 15000);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFlavorWheel();
    initBrewingProcess();
});
//seasonal
document.addEventListener("DOMContentLoaded", function() {
    const sliderContainer = document.querySelector('.galaxy-slide-container');
    const sliderDots = document.querySelectorAll('.stellar-indicator-dot');
    const promoWrappers = document.querySelectorAll('.supernova-card-wrapper');

    let currentIndex = 0;
    const totalSlides = promoWrappers.length;

    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        sliderDots.forEach((dot, index) => {
            index === currentIndex ?
                dot.classList.add('active') :
                dot.classList.remove('active');
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    sliderDots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateSlider();
        });
    });

    let slideInterval = setInterval(nextSlide, 5000);

    const sliderElement = document.querySelector('.nebula-slider');
    sliderElement.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderElement.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Coffee Membership Program
function initMembershipCards() {
    const flipBtns = document.querySelectorAll('.flip-card-btn');

    if (flipBtns.length === 0) return;

    flipBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.membership-card-inner');
            card.style.transform = 'rotateY(180deg)';
        });
    });

    // Initialize tilt effect
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.membership-card'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            scale: 1.03
        });
    }
}

// Interactive Seasonal Blend Selector
function initSeasonalBlendSelector() {
    const seasonTabs = document.querySelectorAll('.season-tab');
    const seasonContents = document.querySelectorAll('.season-content');

    if (seasonTabs.length === 0) return;

    seasonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const season = tab.getAttribute('data-season');

            // Update active tab
            seasonTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update content visibility
            seasonContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${season}-content`) {
                    content.classList.add('active');

                    // Add animation
                    content.style.animation = 'none';
                    setTimeout(() => {
                        content.style.animation = 'fade-in 0.5s ease-in-out forwards';
                    }, 10);
                }
            });
        });
    });

    // Add animation to blend notes
    const allNotes = document.querySelectorAll('.note');
    allNotes.forEach((note, index) => {
        note.style.animationDelay = `${index * 0.1}s`;
        note.classList.add('fade-in');
    });

    // Auto rotate seasons every 10 seconds
    let currentSeasonIndex = 0;
    const autoRotateSeasons = setInterval(() => {
        currentSeasonIndex = (currentSeasonIndex + 1) % seasonTabs.length;
        seasonTabs[currentSeasonIndex].click();
    }, 10000);

    // Stop auto rotation on user interaction
    seasonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            clearInterval(autoRotateSeasons);

            // Restart after 30 seconds of no interaction
            setTimeout(() => {
                currentSeasonIndex = Array.from(seasonTabs).findIndex(t => t.classList.contains('active'));
                autoRotateSeasons = setInterval(() => {
                    currentSeasonIndex = (currentSeasonIndex + 1) % seasonTabs.length;
                    seasonTabs[currentSeasonIndex].click();
                }, 10000);
            }, 30000);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMembershipCards();
    initSeasonalBlendSelector();

    // Add animation for blend prices
    const prices = document.querySelectorAll('.blend-price');
    prices.forEach(price => {
        price.addEventListener('mouseenter', () => {
            price.style.transform = 'scale(1.1)';
            price.style.color = 'var(--cafe-dark)';
        });

        price.addEventListener('mouseleave', () => {
            price.style.transform = 'scale(1)';
            price.style.color = 'var(--cafe-brown)';
        });
    });
});

// Coffee Brewing Countdown Timer
function initBrewingTimer() {
    const methodButtons = document.querySelectorAll('.brewing-method');
    const timerCircle = document.querySelector('.timer-circle-progress');
    const timerMinutes = document.getElementById('timerMinutes');
    const timerSeconds = document.getElementById('timerSeconds');
    const timerMethod = document.getElementById('timerMethod');
    const startButton = document.getElementById('timerStart');
    const resetButton = document.getElementById('timerReset');

    let timerInterval;
    let timeLeft = parseInt(document.querySelector('.brewing-method.active').dataset.time);
    let totalTime = timeLeft;
    let isRunning = false;

    // Initialize progress circle
    const circumference = 2 * Math.PI * 90;
    timerCircle.style.strokeDasharray = circumference;
    timerCircle.style.strokeDashoffset = circumference;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerMinutes.textContent = minutes.toString().padStart(2, '0');
        timerSeconds.textContent = seconds.toString().padStart(2, '0');

        const offset = circumference * (1 - timeLeft / totalTime);
        timerCircle.style.strokeDashoffset = offset;
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        startButton.textContent = 'Pause';

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startButton.textContent = 'Start';
                // Audio notification instead of alert
                new Audio('https://assets.mixkit.co/active_storage/sfx/2868/2868-preview.mp3').play();
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!isRunning) return;
        clearInterval(timerInterval);
        isRunning = false;
        startButton.textContent = 'Resume';
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = totalTime;
        isRunning = false;
        startButton.textContent = 'Start';
        updateTimerDisplay();
    }

    // Method selection
    methodButtons.forEach(button => {
        button.addEventListener('click', () => {
            methodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            totalTime = parseInt(button.dataset.time);
            timeLeft = totalTime;
            timerMethod.textContent = button.dataset.method;

            resetTimer();
        });
    });

    // Control buttons
    startButton.addEventListener('click', () => isRunning ? pauseTimer() : startTimer());
    resetButton.addEventListener('click', resetTimer);

    // Initial setup
    updateTimerDisplay();
}

// Initialize the timer when the DOM is loaded
document.addEventListener('DOMContentLoaded', initBrewingTimer);


document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCoffeeCustomizer();
    initCafeStatus();
    initMap();
    initLiveChat();
});

// Coffee Customizer
function initCoffeeCustomizer() {
    const optionButtons = document.querySelectorAll('.option-btn');
    const strengthSlider = document.getElementById('strengthSlider');
    const drinkName = document.getElementById('drinkName');
    const drinkCalories = document.getElementById('drinkCalories');
    const drinkPrice = document.getElementById('drinkPrice');
    const drinkDescription = document.getElementById('drinkDescription');
    const cupLiquid = document.querySelector('.cup-liquid');
    const liquidFoam = document.querySelector('.liquid-foam');
    const orderButton = document.querySelector('.order-btn');

    if (!optionButtons.length || !strengthSlider) return;

    // Drink data
    const drinks = {
        espresso: {
            name: "Classic Espresso",
            calories: 30,
            price: "₹150",
            description: "Our signature espresso is made from freshly ground beans for a rich, full-bodied flavor with notes of chocolate and caramel.",
            color: "#3c2f27",
            foam: false
        },
        cappuccino: {
            name: "Creamy Cappuccino",
            calories: 120,
            price: "₹220",
            description: "Equal parts espresso, steamed milk, and velvety microfoam create this Italian classic. Perfectly balanced and smooth.",
            color: "#6f4e37",
            foam: true
        },
        latte: {
            name: "Silky Latte",
            calories: 180,
            price: "₹250",
            description: "Our latte combines rich espresso with steamed milk and a light layer of foam for a smooth, creamy coffee experience.",
            color: "#9f7b5c",
            foam: true
        },
        americano: {
            name: "Bold Americano",
            calories: 15,
            price: "₹180",
            description: "Espresso diluted with hot water, creating a coffee that's similar to drip coffee but with a distinctive espresso character.",
            color: "#5a3a22",
            foam: false
        }
    };

    // Milk modifiers
    const milkOptions = {
        whole: { caloriesAdd: 0, priceAdd: 0, colorAdjust: 0 },
        almond: { caloriesAdd: -40, priceAdd: 50, colorAdjust: 10 },
        oat: { caloriesAdd: -20, priceAdd: 50, colorAdjust: 15 },
        none: { caloriesAdd: -60, priceAdd: 0, colorAdjust: -10 }
    };

    // Flavor modifiers
    const flavorOptions = {
        vanilla: { caloriesAdd: 50, priceAdd: 40, name: " with Vanilla" },
        caramel: { caloriesAdd: 70, priceAdd: 40, name: " with Caramel" },
        hazelnut: { caloriesAdd: 60, priceAdd: 40, name: " with Hazelnut" },
        none: { caloriesAdd: 0, priceAdd: 0, name: "" }
    };

    // Default selections
    let currentDrink = "espresso";
    let currentMilk = "whole";
    let currentFlavor = "none";
    let currentStrength = 3;

    // Update drink based on selections
    function updateDrink() {
        // Base drink
        const base = drinks[currentDrink];

        // Apply milk modifier
        const milk = milkOptions[currentMilk];

        // Apply flavor modifier
        const flavor = flavorOptions[currentFlavor];

        // Calculate final values
        const finalCalories = Math.max(5, base.calories + milk.caloriesAdd + flavor.caloriesAdd);
        const basePrice = parseFloat(base.price.replace('₹', ''));
        const finalPrice = (basePrice + milk.priceAdd + flavor.priceAdd).toFixed(2);

        // Apply strength modifier to color
        let color = base.color;
        if (currentStrength < 3) {
            // Lighter
            color = lightenColor(color, (3 - currentStrength) * 10);
        } else if (currentStrength > 3) {
            // Darker
            color = darkenColor(color, (currentStrength - 3) * 10);
        }

        // Adjust color for milk
        if (currentMilk !== "none" && currentDrink !== "espresso") {
            color = lightenColor(color, milk.colorAdjust);
        }

        // Update UI
        drinkName.textContent = base.name + flavor.name;
        drinkCalories.textContent = finalCalories;
        drinkPrice.textContent = `₹${finalPrice}`;
        drinkDescription.textContent = base.description;

        // Update cup appearance
        cupLiquid.style.backgroundColor = color;
        cupLiquid.style.height = `${50 + currentStrength * 10}%`;

        // Show/hide foam
        if (base.foam && currentMilk !== "none") {
            liquidFoam.style.transform = "scaleY(1)";
        } else {
            liquidFoam.style.transform = "scaleY(0)";
        }
    }

    // Helper function to lighten a color
    function lightenColor(hex, percent) {
        return adjustColor(hex, percent);
    }

    // Helper function to darken a color
    function darkenColor(hex, percent) {
        return adjustColor(hex, -percent);
    }

    function adjustColor(hex, percent) {
        // Convert hex to RGB
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);

        // Adjust colors
        r = Math.min(255, Math.max(0, r + percent));
        g = Math.min(255, Math.max(0, g + percent));
        b = Math.min(255, Math.max(0, b + percent));

        // Convert back to hex
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Option buttons event listeners
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the option group
            const group = button.closest('.customizer-group');

            // Remove active class from all buttons in this group
            group.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            button.classList.add('active');

            // Update current selections
            const option = button.getAttribute('data-option');

            if (group.querySelector('h3').textContent === 'Base Drink') {
                currentDrink = option;
            } else if (group.querySelector('h3').textContent === 'Milk Options') {
                currentMilk = option;
            } else if (group.querySelector('h3').textContent === 'Flavor') {
                currentFlavor = option;
            }

            // Update the drink
            updateDrink();
        });
    });

    // Strength slider event listener
    strengthSlider.addEventListener('input', () => {
        currentStrength = parseInt(strengthSlider.value);
        updateDrink();
    });

    // Order button event listener
    orderButton.addEventListener('click', () => {
        alert(`${drinkName.textContent} added to your order!`);
    });

    // Initialize the drink display
    updateDrink();
}


// Cafe Status
function initCafeStatus() {
    // DOM Elements
    const statusTitle = document.querySelector('.status-card:first-child h3');
    const openStatusDot = document.querySelector('#openStatus .status-dot');
    const todayHours = document.getElementById('todayHours');
    const closingIn = document.getElementById('closingIn');
    const busynessBar = document.querySelector('.busyness-bar');
    const busynessLevel = document.querySelector('.busyness-level');
    const busynessDescription = document.querySelector('.busyness-description');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherTemp = document.getElementById('weatherTemp');
    const weatherDesc = document.getElementById('weatherDesc');

    // Cafe hours configuration
    const hours = {
        0: { open: 8, close: 18 }, // Sunday
        1: { open: 7, close: 20 }, // Monday
        2: { open: 7, close: 20 }, // Tuesday
        3: { open: 7, close: 20 }, // Wednesday
        4: { open: 7, close: 20 }, // Thursday
        5: { open: 7, close: 22 }, // Friday
        6: { open: 8, close: 22 } // Saturday
    };

    function formatHour(hour) {
        return hour > 12 ? hour - 12 : hour;
    }

    function getAmPm(hour) {
        return hour >= 12 ? 'PM' : 'AM';
    }

    function updateStatus() {
        const now = new Date();
        const day = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = now.getTime();

        // Update operating hours
        const today = hours[day];
        const openTime = new Date(now);
        openTime.setHours(today.open, 0, 0);
        const closeTime = new Date(now);
        closeTime.setHours(today.close, 0, 0);

        // Format display hours
        todayHours.innerHTML = `
            ${formatHour(today.open)}:00 ${getAmPm(today.open)} - 
            ${formatHour(today.close)}:00 ${getAmPm(today.close)}
        `;

        // Update open/closed status
        const isOpen = currentTime >= openTime && currentTime < closeTime;
        statusTitle.textContent = isOpen ? "We're Open" : "We're Closed";
        openStatusDot.style.backgroundColor = isOpen ? '#4CAF50' : '#F44336';

        // Update closing countdown
        if (isOpen) {
            const timeRemaining = closeTime - currentTime;
            const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

            closingIn.innerHTML = `Closing in: <span>${hoursRemaining}h ${minutesRemaining}m</span>`;
        } else {
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowDay = tomorrow.getDay();
            const tomorrowOpen = hours[tomorrowDay].open;

            closingIn.innerHTML = `Opens tomorrow at ${formatHour(tomorrowOpen)}:00 ${getAmPm(tomorrowOpen)}`;
        }

        // Update busyness (simulated)
        const busynessData = [
            { start: 7, end: 9, level: 80, text: 'Very Busy', desc: 'Morning rush hour' },
            { start: 9, end: 11, level: 40, text: 'Moderate', desc: 'Good time to visit' },
            { start: 11, end: 14, level: 90, text: 'Peak', desc: 'Lunch rush hour' },
            { start: 14, end: 17, level: 30, text: 'Calm', desc: 'Quiet afternoon' },
            { start: 17, end: 19, level: 70, text: 'Busy', desc: 'Evening rush' },
            { start: 19, end: 23, level: 20, text: 'Very Calm', desc: 'Late evening' }
        ];

        const currentBusyness = busynessData.find(b => currentHour >= b.start && currentHour < b.end) || { level: 10, text: 'Closed', desc: 'We are closed' };

        busynessBar.style.height = `${currentBusyness.level}%`;
        busynessLevel.textContent = currentBusyness.text;
        busynessDescription.textContent = currentBusyness.desc;

        // Update weather (simulated)
        const month = now.getMonth();
        const seasons = [
            { months: [11, 0, 1], icon: '❄️', temp: '42°F', desc: 'Chilly coffee weather' },
            { months: [2, 3, 4], icon: '🌦️', temp: '64°F', desc: 'Mild spring day' },
            { months: [5, 6, 7, 8], icon: '☀️', temp: '78°F', desc: 'Sunny day' },
            { months: [9, 10], icon: '🍂', temp: '58°F', desc: 'Fall breeze' }
        ];

        const currentWeather = seasons.find(s => s.months.includes(month)) || { icon: '☕', temp: '68°F', desc: 'Perfect coffee weather' };

        weatherIcon.textContent = currentWeather.icon;
        weatherTemp.textContent = currentWeather.temp;
        weatherDesc.textContent = currentWeather.desc;
    }

    // Initial update
    updateStatus();

    // Update every minute
    setInterval(updateStatus, 60000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initCafeStatus);

// Coffee Personality Quiz
function initCoffeeQuiz() {
    const quizContainer = document.getElementById('coffeeQuiz');
    const questionCounter = document.getElementById('currentQuestion');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const progressFill = document.querySelector('.progress-fill');
    const questions = document.querySelectorAll('.question');
    const quizResults = document.querySelector('.quiz-results');
    const restartQuizBtn = document.getElementById('restartQuiz');
    const resultType = document.getElementById('resultType');
    const resultImage = document.getElementById('resultImage');
    const resultDescription = document.getElementById('resultDescription');
    const resultRecommendation = document.getElementById('resultRecommendation');

    if (!quizContainer || !questions.length) return;

    let currentQuestionIndex = 0;
    const totalQuestions = questions.length; // Now correctly set to 5

    // User selections
    const userSelections = [];

    // Quiz result profiles
    const profiles = {
        'espresso': {
            title: 'The Bold Enthusiast',
            image: 'https://commandcoffee.com/cdn/shop/articles/closeup-image-of-a-hand-holding-a-cup-of-hot-choco-2022-12-16-05-27-17-utc.jpg?v=1697123903',
            description: 'You appreciate intensity and efficiency in both coffee and life. Direct and energetic, you enjoy the pure essence of coffee and prefer a straightforward experience.',
            recommendation: 'Try our Single Origin Espresso or Ristretto for a concentrated, powerful flavor that matches your bold personality.'
        },
        'latte': {
            title: 'The Comfort Seeker',
            image: 'https://optimalcrew.com/wp-content/uploads/service-aimed-03.jpg',
            description: 'You value balance and harmony, enjoying the comforting aspects of coffee. Sociable and approachable, you appreciate the creamy texture and gentle flavors.',
            recommendation: 'Our Vanilla Latte or Caramel Macchiato would be perfect for you, offering a smooth, comforting experience with just the right amount of sweetness.'
        },
        'pour-over': {
            title: 'The Thoughtful Connoisseur',
            image: 'https://cdn.shopify.com/s/files/1/0551/0981/2291/files/casual-coffee-drinkers_1024x1024.jpg?v=1694415899',
            description: 'You appreciate nuance and take time to enjoy the finer details. Patient and detail-oriented, you savor the complex flavors and aromas in each cup.',
            recommendation: 'Our Pour-Over Ethiopian Yirgacheffe or Single-Origin Chemex brew would highlight the subtle notes and complexities that you appreciate.'
        }
    };

    // Option click handlers
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            const currentQuestion = option.closest('.question');
            currentQuestion.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });

            option.classList.add('selected');
            nextButton.disabled = false;
        });
    });

    // Navigation handlers
    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            goToQuestion(currentQuestionIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedOption = currentQuestion.querySelector('.option.selected');

        if (!selectedOption) {
            nextButton.disabled = true;
            return;
        }

        userSelections[currentQuestionIndex] = selectedOption.getAttribute('data-points');

        if (currentQuestionIndex < totalQuestions - 1) {
            goToQuestion(currentQuestionIndex + 1);
        } else {
            showResults();
        }
    });

    function goToQuestion(index) {
        questions[currentQuestionIndex].classList.remove('active');
        currentQuestionIndex = index;
        questions[currentQuestionIndex].classList.add('active');

        questionCounter.textContent = currentQuestionIndex + 1;
        progressFill.style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;

        prevButton.disabled = currentQuestionIndex === 0;
        const selectedOption = questions[currentQuestionIndex].querySelector('.option.selected');
        nextButton.disabled = !selectedOption;

        if (currentQuestionIndex === totalQuestions - 1) {
            nextButton.textContent = 'See Results';
        } else {
            nextButton.textContent = 'Next';
        }
    }

    function showResults() {
        questions[currentQuestionIndex].classList.remove('active');
        document.querySelector('.quiz-navigation').style.display = 'none';

        const counts = { 'espresso': 0, 'latte': 0, 'pour-over': 0 };
        userSelections.forEach(selection => counts[selection]++);

        let maxCount = 0;
        let resultProfile = 'espresso';
        Object.keys(counts).forEach(key => {
            if (counts[key] > maxCount) {
                maxCount = counts[key];
                resultProfile = key;
            }
        });

        const profile = profiles[resultProfile];
        resultType.textContent = profile.title;
        resultImage.innerHTML = `<img src="${profile.image}" alt="${profile.title}">`;
        resultDescription.textContent = profile.description;
        resultRecommendation.textContent = profile.recommendation;

        quizResults.classList.add('active');
        progressFill.style.width = '100%';
    }

    restartQuizBtn.addEventListener('click', () => {
        userSelections.length = 0;
        document.querySelectorAll('.option').forEach(option => option.classList.remove('selected'));
        quizResults.classList.remove('active');
        document.querySelector('.quiz-navigation').style.display = 'flex';
        goToQuestion(0);
    });

    // Initialize quiz
    goToQuestion(0);
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', initCoffeeQuiz);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements

    initRecipeFinder();
});
// Interactive Recipe Finder
function initRecipeFinder() {
    const coffeeOptions = document.querySelectorAll('.coffee-option');
    const pairingPlaceholder = document.getElementById('pairingPlaceholder');
    const pairingItems = document.getElementById('pairingItems');

    if (!coffeeOptions.length || !pairingPlaceholder || !pairingItems) return;

    // Pairing data
    const pairings = {
        'espresso': [{
                name: 'Biscotti',
                image: 'https://static.toiimg.com/thumb/59425073.cms?imgsize=160106&width=800&height=800',
                description: 'Crunchy, twice-baked Italian cookie that is perfect for dipping.'
            },
            {
                name: 'Dark Chocolate',
                image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                description: 'Rich 70% cocoa chocolate complements the intensity of espresso.'
            },
            {
                name: 'Lemon Tart',
                image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                description: 'The citrus cuts through the strength of the espresso.'
            }
        ],
        'cappuccino': [{
                name: 'Croissant',
                image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                description: 'Buttery, flaky pastry that pairs perfectly with the creamy cappuccino.'
            },
            {
                name: 'Cinnamon Roll',
                image: 'https://cambreabakes.com/wp-content/uploads/2024/03/best-cinnamon-rolls-featured.jpg',
                description: 'Sweet spices complement the milk foam and espresso.'
            },
            {
                name: 'Fruit Tart',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBEP_Mw3WaV-kT6CK1k9_KRzZxsp4lq6kww&s',
                description: 'Fresh fruit flavors balance the richness of a cappuccino.'
            }
        ],
        'latte': [{
                name: 'Blueberry Muffin',
                image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                description: 'Sweet and tangy berries pair well with the smooth latte.'
            },
            {
                name: 'Butter Cookie',
                image: 'https://www.nestleprofessional.in/sites/default/files/2022-07/Butter-Cookies.jpg',
                description: 'Simple, buttery shortbread complements the milk in a latte.'
            },
            {
                name: 'Almond Cake',
                image: 'https://www.rainbownourishments.com/wp-content/uploads/2023/07/vegan-almond-cake-1.jpg',
                description: 'Nutty flavors enhance the smooth, creamy taste of a latte.'
            }
        ],
        'mocha': [{
                name: 'Raspberry Scone',
                image: 'https://realfood.tesco.com/media/images/1400x919-Raspberry-scones-41aaec18-5aa8-4d63-8781-bb95c3d3f69d-0-1400x919.jpg',
                description: 'Tart raspberries contrast nicely with the chocolate in a mocha.'
            },
            {
                name: 'Coconut Macaroon',
                image: 'https://shwetainthekitchen.com/wp-content/uploads/2021/12/Eggless-coconut-macaroons.jpg',
                description: 'Sweet coconut complements the chocolate notes in the mocha.'
            },
            {
                name: 'Salted Caramel Brownie',
                image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                description: 'Rich chocolate and caramel enhance the mocha experience.'
            }
        ],
        "macchiato": [{
                name: "Hazelnut Biscotti",
                image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                description: "The nutty crunch of hazelnut biscotti balances the boldness of a macchiato."
            },
            {
                name: 'Dark Chocolate',
                image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                description: 'Rich 70% cocoa chocolate complements the intensity of espresso.'
            },
            {
                name: "Chocolate Cookie",
                image: "https://bastecutfold.com/wp-content/uploads/2017/12/DSC_0286-5.jpg",
                description: "A crunchy espresso-flavored cookie with a chocolate coating."
            }
        ],
        "flat_white": [{
                name: 'Croissant',
                image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                description: 'Buttery, flaky pastry that pairs perfectly with the creamy cappuccino.'
            },
            {
                name: "Coconut Almond Bar",
                image: "https://www.feastingathome.com/wp-content/uploads/2013/11/almond-coconut-bar-110.jpg",
                description: "smooth texture of a flat white pairs, flavors of coconut & almond."
            },
            {
                name: "Honey Oatmeal ",
                image: "https://i0.wp.com/baketotheroots.de/wp-content/uploads/2021/02/SQ_210114_Honey-Oatmeal-Chocolate-Chip-Cookies.jpg?fit=1200%2C1200&ssl=1",
                description: "A lightly sweet honey oatmeal cookie enhances flat white."
            }
        ]
    };

    // Coffee option click event
    coffeeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            coffeeOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selected class to clicked option
            option.classList.add('selected');

            // Get coffee type
            const coffeeType = option.getAttribute('data-coffee');

            // Show pairings for selected coffee
            showPairings(coffeeType);
        });
    });

    // Show pairings for selected coffee
    function showPairings(coffeeType) {
        // Hide placeholder
        pairingPlaceholder.style.display = 'none';

        // Clear previous pairings
        pairingItems.innerHTML = '';

        // Get pairings for selected coffee
        const coffeePairings = pairings[coffeeType];

        // Create pairing items
        coffeePairings.forEach(pairing => {
            const pairingItem = document.createElement('div');
            pairingItem.className = 'pairing-item';

            pairingItem.innerHTML = `
          <div class="pairing-image">
            <img src="${pairing.image}" alt="${pairing.name}">
          </div>
          <div class="pairing-details">
            <div class="pairing-name">${pairing.name}</div>
            <div class="pairing-description">${pairing.description}</div>
          </div>
        `;

            pairingItems.appendChild(pairingItem);
        });

        // Show pairing items with fade-in animation
        pairingItems.style.display = 'grid';

        // Add entrance animation to each item
        const items = pairingItems.querySelectorAll('.pairing-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
}




document.addEventListener('DOMContentLoaded', function() {

    initMemoryGame();
});


// Memory Match Game
function initMemoryGame() {
    const memoryGameBoard = document.getElementById('memoryGameBoard');
    const startButton = document.getElementById('startMemoryGame');
    const moveDisplay = document.getElementById('moveCount');
    const matchDisplay = document.getElementById('matchCount');
    const timeDisplay = document.getElementById('timeCount');
    const difficultySelect = document.getElementById('difficultySelect');

    if (!memoryGameBoard || !startButton) return;

    // Game variables
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matches = 0;
    let totalMatches = 8;
    let gameTimer;
    let seconds = 0;
    let minutes = 0;

    // Coffee flavor card data
    const cardData = [
        { name: 'espresso', image: 'https://aeropress.com/cdn/shop/articles/Espresso-cup-with-coffee-beans_600x.jpg?v=1681501296' },
        { name: 'cappuccino', image: 'https://lorcoffee.com/cdn/shop/articles/Cappuccino-exc.jpg?v=1684870907' },
        { name: 'latte', image: 'https://www.cuisinart.com/dw/image/v2/ABAF_PRD/on/demandware.static/-/Sites-us-cuisinart-sfra-Library/default/dw2ca0aa66/images/recipe-Images/cafe-latte1-recipe.jpg?sw=1200&sh=630' },
        { name: 'mocha', image: 'https://images.immediate.co.uk/production/volatile/sites/2/2021/11/Mocha-1fc71f7.png?resize=1200%2C630' },
        { name: 'americano', image: 'https://cdn.shopify.com/s/files/1/0879/5370/3213/files/image3_63f62a8a-c679-4bc2-9d65-8025ed2d7982_480x480.jpg?v=1721477983' },
        { name: 'macchiato', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKEIzSiBk3QBG5uFCITq9XjMbIxHvp_MTTgA&s' },
        { name: 'flat-white', image: 'https://athome.starbucks.com/sites/default/files/styles/recipe_banner_xlarge/public/2024-05/Flatwhite_RecipeHeader_848x539_%402x.jpg.webp?itok=pY1IvezE' },
        { name: 'cold-brew', image: 'https://lifesimplified.gorenje.com/wp-content/uploads/2024/06/gorenje-blog-refreshing_cold_brew_coffee.jpg' },
        { name: 'affogato', image: 'https://www.thespruceeats.com/thmb/5PcCBEaUd1U1eFxfcKKPLVnZzfA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/affogato-4776668-hero-08-40d7a68d12ba46f48eaea3c43aba715c.jpg' },
        { name: 'irish', image: 'https://espressocoffeeguide.com/wp-content/uploads/2022/08/baileys-irish-coffee-500x500.jpg' }
    ];

    // Start game when button is clicked
    startButton.addEventListener('click', startGame);

    // Difficulty selection
    difficultySelect.addEventListener('change', () => {
        const difficulty = difficultySelect.value;

        if (difficulty === 'hard') {
            totalMatches = 10;
            memoryGameBoard.style.gridTemplateColumns = 'repeat(5, 1fr)';
            memoryGameBoard.style.gridTemplateRows = 'repeat(4, 1fr)';
        } else {
            totalMatches = 8;
            memoryGameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
            memoryGameBoard.style.gridTemplateRows = 'repeat(4, 1fr)';
        }

        matchDisplay.textContent = `0/${totalMatches}`;
    });

    function startGame() {
        resetGame();

        // Get difficulty settings
        const difficulty = difficultySelect.value;
        let timeLimit;

        switch (difficulty) {
            case 'easy':
                timeLimit = Infinity; // No time limit
                break;
            case 'medium':
                timeLimit = 120; // 2 minutes
                break;
            case 'hard':
                timeLimit = 90; // 1.5 minutes
                break;
            default:
                timeLimit = 120;
        }

        // Create cards based on difficulty
        let selectedCards;

        if (difficulty === 'hard') {
            // Use all 10 pairs for hard mode
            selectedCards = [...cardData];
        } else {
            // Use 8 random pairs for easy/medium
            selectedCards = [...cardData].sort(() => 0.5 - Math.random()).slice(0, 8);
        }

        // Create pairs
        cards = [...selectedCards, ...selectedCards].map((card, index) => ({
            ...card,
            id: index
        }));

        // Shuffle cards
        cards.sort(() => 0.5 - Math.random());

        // Create card elements
        cards.forEach(card => {
            createCardElement(card);
        });

        // Start timer
        startTimer(timeLimit);
    }

    function createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = card.name;
        cardElement.dataset.id = card.id;

        const cardFront = document.createElement('div');
        cardFront.classList.add('memory-card-front');

        const cardImage = document.createElement('img');
        cardImage.src = card.image;
        cardImage.alt = card.name;

        const cardBack = document.createElement('div');
        cardBack.classList.add('memory-card-back');

        cardFront.appendChild(cardImage);
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);

        cardElement.addEventListener('click', flipCard);

        memoryGameBoard.appendChild(cardElement);
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            // First card flipped
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Second card flipped
        secondCard = this;
        moves++;
        moveDisplay.textContent = moves;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;

        if (isMatch) {
            disableCards();
            matches++;
            matchDisplay.textContent = `${matches}/${totalMatches}`;

            // Check if game is complete
            if (matches === totalMatches) {
                clearInterval(gameTimer);

                // Show victory message after short delay
                setTimeout(() => {
                    alert(`Congratulations! You completed the game in ${moves} moves and ${formatTime(seconds)}.`);
                }, 500);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoardState();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoardState();
        }, 1000);
    }

    function resetBoardState() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function startTimer(timeLimit) {
        clearInterval(gameTimer);
        seconds = 0;
        minutes = 0;
        timeDisplay.textContent = '0:00';

        gameTimer = setInterval(() => {
            seconds++;

            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }

            timeDisplay.textContent = formatTime(seconds);

            // Check time limit
            if (minutes * 60 + seconds >= timeLimit && timeLimit !== Infinity) {
                clearInterval(gameTimer);
                alert('Times up! Game over.');

                // Flip all cards to show positions
                document.querySelectorAll('.memory-card:not(.matched)').forEach(card => {
                    card.classList.add('flipped');
                });

                // Disable further clicks
                lockBoard = true;
            }
        }, 1000);
    }

    function formatTime(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    function resetGame() {
        clearInterval(gameTimer);
        memoryGameBoard.innerHTML = '';
        moves = 0;
        matches = 0;
        seconds = 0;
        minutes = 0;

        moveDisplay.textContent = moves;
        matchDisplay.textContent = `0/${totalMatches}`;
        timeDisplay.textContent = '0:00';

        resetBoardState();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initInstagramSection();
});

function initInstagramSection() {
    const instagramPosts = document.querySelectorAll('.instagram-post');
    const heartIcons = document.querySelectorAll('.post-icon.heart');

    if (!instagramPosts.length) return;

    // Add animation delay to posts for staggered appearance
    instagramPosts.forEach((post, index) => {
        post.style.animationDelay = `${index * 0.1}s`;
        post.classList.add('animate-on-scroll');
    });

    // Make heart icons clickable
    heartIcons.forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.stopPropagation();

            // Toggle liked state
            const isLiked = this.classList.contains('liked');

            if (isLiked) {
                this.classList.remove('liked');
                this.style.color = 'white';
            } else {
                this.classList.add('liked');
                this.style.color = '#e74c3c';

                // Add heart animation
                const heartAnimation = document.createElement('div');
                heartAnimation.className = 'heart-animation';
                this.appendChild(heartAnimation);

                setTimeout(() => {
                    heartAnimation.remove();
                }, 1000);
            }

            // Update like count
            const postInfo = this.closest('.instagram-post').querySelector('.post-info');
            const likeCount = postInfo.querySelector('.post-likes');
            let likes = parseInt(likeCount.textContent);

            if (isLiked) {
                likes -= 1;
            } else {
                likes += 1;
            }

            likeCount.textContent = `${likes} likes`;
        });
    });

    // Expand post caption on click
    instagramPosts.forEach(post => {
        const caption = post.querySelector('.post-caption');

        caption.addEventListener('click', function() {
            if (this.style.webkitLineClamp === 'none' || !this.style.webkitLineClamp) {
                this.style.webkitLineClamp = 'none';
                this.style.cursor = 'zoom-out';
            } else {
                this.style.webkitLineClamp = '2';
                this.style.cursor = 'zoom-in';
            }
        });
    });

    // Add scroll animation observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-on-scroll').forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.animate-on-scroll').forEach(item => {
            item.classList.add('visible');
        });
    }

    // Add heart animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .heart-animation {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background-color: #e74c3c;
        border-radius: 50%;
        opacity: 0;
        animation: heart-pulse 1s forwards;
      }
      
      @keyframes heart-pulse {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
}