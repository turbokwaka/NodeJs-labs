const carousel = document.querySelector('.carousel');
const btnRight = document.querySelector('.btn--right');
const btnLeft = document.querySelector('.btn--left');

const scrollAmount = window.innerWidth; 

btnRight.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

btnLeft.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

