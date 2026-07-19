document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Corporate Fade-Up Animation Logic (Intersection Observer)
     * Adds the .visible class to elements when they scroll into view.
     */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    
    if (!('IntersectionObserver' in window)) {
        animatedElements.forEach(el => el.classList.add('visible'));
    } else {
        animatedElements.forEach(el => observer.observe(el));
    }

    /**
     * Smooth Scrolling for Nav Links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for the fixed corporate header
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /**
     * Mobile Navigation Toggle
     */
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    function toggleMobileNav() {
        mainNav.classList.toggle('active');
        
        if(mainNav.classList.contains('active')){
            mobileNavToggle.classList.remove('fa-bars');
            mobileNavToggle.classList.add('fa-times');
        } else {
            mobileNavToggle.classList.remove('fa-times');
            mobileNavToggle.classList.add('fa-bars');
        }
    }

    if(mobileNavToggle) {
        mobileNavToggle.addEventListener('click', toggleMobileNav);
    }

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                if(mainNav.classList.contains('active')){
                    toggleMobileNav();
                }
            }
        });
    });

});
