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
            },
            autoHeight: true
        });
    }
});
