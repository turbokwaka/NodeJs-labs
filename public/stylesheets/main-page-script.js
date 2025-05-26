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

const loginBtn = document.querySelector('.login-btn');
const loginForm = document.querySelector('.login-form');
const submitBtn = document.querySelector('.login_submit');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.toggle('show');})

document.addEventListener('click', (e) => {
    const clickedInsideForm = loginForm.contains(e.target);
    const clickedLoginBtn = loginBtn.contains(e.target);

    if (!clickedInsideForm && !clickedLoginBtn) {
        loginForm.classList.remove('show');
    }
})

submitBtn.addEventListener('click', () => {
    showNotification('You successfully LogIn');
});

const notification = document.getElementById('notification');

function showNotification(message) {
    notification.textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}



