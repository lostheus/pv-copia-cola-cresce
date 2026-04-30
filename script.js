document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                accItem.querySelector('.accordion-content').style.maxHeight = null;
                // Change icon back to plus
                accItem.querySelector('.icon').innerHTML = '<i class="ph-bold ph-plus"></i>';
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
                // Change icon to minus
                item.querySelector('.icon').innerHTML = '<i class="ph-bold ph-minus"></i>';
            }
        });
    });

    // 2. Facebook Pixel tracking for InitiateCheckout
    const buyButtons = document.querySelectorAll('.btn-compra:not(#hero-scroll-btn):not(#sneak-peek-scroll-btn)');
    
    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Trigger FB pixel
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout', {
                    value: 37.00,
                    currency: 'BRL',
                    content_name: 'Kit Autoridade Clínica',
                    content_type: 'product'
                });
            }
            
            // Redirect to checkout (placeholder link)
            // Replace '#' with the actual checkout link when ready
            window.location.href = 'https://pay.kiwify.com.br/eZlVxSd'; 
        });
    });

    // Hero scroll button logic
    const heroScrollBtn = document.getElementById('hero-scroll-btn');
    if (heroScrollBtn) {
        heroScrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('apresentacao');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Sneak Peek scroll button logic
    const sneakPeekScrollBtn = document.getElementById('sneak-peek-scroll-btn');
    if (sneakPeekScrollBtn) {
        sneakPeekScrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('oferta');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 3. Scroll Reveal Animations (AOS equivalent)
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    animateElements.forEach(el => {
        fadeObserver.observe(el);
    });



    // 5. Hero Carousel Initialization (Swiper.js)
    if (document.querySelector('.hero-carousel')) {
        const heroSwiper = new Swiper('.hero-carousel', {
            loop: true,
            effect: 'slide', // changed from fade to prevent all images from downloading at once
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    if (document.querySelector('.sneak-peek-carousel')) {
        const sneakPeekSwiper = new Swiper('.sneak-peek-carousel', {
            loop: true,
            effect: 'slide',
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    // 6. Countdown Timer Logic
    function startCountdown() {
        const timerElements = document.querySelectorAll('.urgency-box');
        if (timerElements.length === 0) return;

        // Set countdown time to 2 hours from first load
        let endTime = localStorage.getItem('kitAutoridadeCountdown');
        
        if (!endTime) {
            // 2 hours in milliseconds
            endTime = new Date().getTime() + (2 * 60 * 60 * 1000);
            localStorage.setItem('kitAutoridadeCountdown', endTime);
        }

        function updateTimers() {
            const now = new Date().getTime();
            let distance = endTime - now;

            // If time is up, reset to 15 minutes to maintain urgency
            if (distance < 0) {
                endTime = now + (15 * 60 * 1000);
                localStorage.setItem('kitAutoridadeCountdown', endTime);
                distance = endTime - now;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Format with leading zeros
            const hDisplay = hours < 10 ? "0" + hours : hours;
            const mDisplay = minutes < 10 ? "0" + minutes : minutes;
            const sDisplay = seconds < 10 ? "0" + seconds : seconds;

            document.querySelectorAll('.time-hours').forEach(el => el.innerText = hDisplay);
            document.querySelectorAll('.time-minutes').forEach(el => el.innerText = mDisplay);
            document.querySelectorAll('.time-seconds').forEach(el => el.innerText = sDisplay);
        }

        setInterval(updateTimers, 1000);
        updateTimers();
    }
    
    startCountdown();


});
