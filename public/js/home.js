const services = document.querySelectorAll('section.services .service');
const contactForm = document.querySelector('.contact-us form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { name, email, message } = e.target.children;
    const body = {
        name: name.value,
        email: email.value,
        message: message.value
    };
    try {
        let res = await fetch(`${e.target.action}contact-us`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        res = await res.text();
        alert(res);
    } catch (err) {
        console.log(err);
    }
});

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