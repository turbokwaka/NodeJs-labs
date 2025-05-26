const scrollBtn = document.querySelector(".scroll-btn");
const dateCarousel = document.querySelector(".date-carousel");
const dates = document.querySelectorAll('.date');

dates[0].classList.add('active');

const scrollAmount = window.innerWidth;

scrollBtn.addEventListener('click', function (){
    dateCarousel.scrollBy({left: scrollAmount / 5, behavior: "smooth"})
});

dates.forEach(date => {
    date.addEventListener('click', function (){
        dates.forEach(d => d.classList.remove('active'));
        date.classList.add('active')
    })
})
