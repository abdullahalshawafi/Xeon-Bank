const services = document.querySelectorAll('section.services .service');

const handleServicesIntersect = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.children[0].style.animation = 'fadeRight 1s ease-in-out forwards';
            entry.target.children[1].style.animation = 'fadeLeft 1s ease-in-out forwards';
        }
    });
}

const servicesOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}

const servicesObserver = new IntersectionObserver(handleServicesIntersect, servicesOptions);

services.forEach(service => {
    servicesObserver.observe(service);
});