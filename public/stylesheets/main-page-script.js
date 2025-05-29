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
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('filmCarousel');

    Promise.all([
        fetch('http://31.43.170.177:1337/api/movies').then(res => res.json()),
        fetch('http://31.43.170.177:1337/api/sessions').then(res => res.json())
    ])
        .then(([movieData, sessionData]) => {
            const movies = movieData.data;
            const sessions = sessionData.data;

            movies.forEach(movie => {
                const session = sessions.find(s => s.movie_id === movie.id);

                if (session) {
                    const film = document.createElement('a');
                    film.className = 'film';
                    film.href = `/sessions/${session.id}`;

                    const img = document.createElement('img');
                    img.className = 'img';
                    img.src = movie.poster_url;
                    img.alt = movie.title;

                    const overlay = document.createElement('div');
                    overlay.className = 'overlay';

                    const title = document.createElement('h2');
                    title.className = 'film-name';
                    title.textContent = movie.title;

                    overlay.appendChild(title);
                    film.appendChild(img);
                    film.appendChild(overlay);
                    carousel.appendChild(film);
                }
            });
        })
        .catch(err => {
            console.error('error', err);
        });
});



