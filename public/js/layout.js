const navbar = document.querySelector('header');
const nav = document.querySelector('header nav');
const navButton = document.querySelector('header button');
let navClosed = true;

navButton.addEventListener('click', () => {
    navClosed = !navClosed;
    handleNav();
});

function handleNav() {
    if (!navClosed) {
        navButton.children[0].classList.toggle('bi-x');
        nav.style.transform = 'translateY(100%)';
    } else {
        navButton.children[0].classList.toggle('bi-x');
        nav.style.transform = 'translateY(-200%)';
    }
}