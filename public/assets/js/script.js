(() => {
    'use strict';

    function initializeHeader() {
        const header = document.querySelector('header');
        if (!header) return;

        const updateHeight = () => {
            document.documentElement.style.setProperty('--header-height', header.getBoundingClientRect().height + 'px');
        };
        const updateHeader = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 50);
        };

        updateHeight();
        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive: true });
        window.addEventListener('pageshow', () => {
            updateHeight();
            updateHeader();
        });

        if ('ResizeObserver' in window) {
            new ResizeObserver(updateHeight).observe(header);
        } else {
            window.addEventListener('resize', updateHeight, { passive: true });
        }
    }

    initializeHeader();
})();
