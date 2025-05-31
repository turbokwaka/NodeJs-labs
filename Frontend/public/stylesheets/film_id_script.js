async function isSeatTaken(seatId) {
    try {
        const response = await fetch(`http://31.43.170.177:1337/api/tickets?seat_id=${seatId}`);
        const tickets = await response.json();
        return tickets["total"] !== 0;
    } catch (error) {
        return false;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

function renderMovieInfo(movie, session) {
    document.getElementById('poster').src = movie.poster_url;
    document.getElementById('poster').alt = movie.title;
    document.querySelectorAll('.title').forEach(el => el.textContent = movie.title);
    document.getElementById('time').textContent = new Date(session.start_time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('hall').textContent = session.hall_name;
    document.getElementById('age_rating').textContent = movie.age_rating;
    document.getElementById('genre').textContent = movie.genre;
    document.getElementById('duration').textContent = movie.duration_minutes + " min";
}

async function renderSeats(seatsData) {
    const seatsContainer = document.getElementById('seats-container');
    const rowsMap = new Map();

    seatsData.forEach(seat => {
        if (!rowsMap.has(seat.row)) rowsMap.set(seat.row, []);
        rowsMap.get(seat.row).push(seat);
    });

    const sortedRows = Array.from(rowsMap.keys()).sort((a, b) => a - b);

    for (const rowNumber of sortedRows) {
        const rowSeats = rowsMap.get(rowNumber).sort((a, b) => a.seat_number - b.seat_number);
        const rowDiv = document.createElement('div');
        rowDiv.className = `row row--${rowNumber}`;

        const rowLabel = document.createElement('span');
        rowLabel.className = 'row-number';
        rowLabel.textContent = `Row ${rowNumber}`;
        rowDiv.appendChild(rowLabel);

        const ul = document.createElement('ul');

        for (const seat of rowSeats) {
            const li = document.createElement('li');
            li.className = 'seat';
            li.dataset.seat = seat.seat_number;
            li.dataset.id = seat.id;
            li.textContent = seat.seat_number;

            const taken = await isSeatTaken(seat.id);
            if (taken) {
                li.classList.add('seat--taken');
                li.style.pointerEvents = 'none';
                li.style.opacity = '0.6';
            }

            ul.appendChild(li);
        }

        rowDiv.appendChild(ul);
        seatsContainer.appendChild(rowDiv);
    }
}

function renderDateCarousel(sessions, currentMovieId) {
    const uniqueDates = [...new Set(
        sessions
            .filter(s => s.movie_id === currentMovieId)
            .map(s => new Date(s.start_time).toLocaleDateString('en-US'))
    )];

    const dateCarousel = document.getElementById('dateCarousel');
    uniqueDates.forEach(date => {
        const div = document.createElement('div');
        div.className = 'date';
        div.textContent = date;
        dateCarousel.appendChild(div);
    });

    const scrollBtn = document.querySelector(".scroll-btn");
    const dateCarouselcl = document.querySelector(".date-carousel");
    const dates = document.querySelectorAll('.date');

    if (dates[0]) dates[0].classList.add('active');

    const scrollAmount = window.innerWidth;
    scrollBtn.addEventListener('click', () => {
        dateCarouselcl.scrollBy({ left: scrollAmount / 5, behavior: "smooth" });
    });

    dates.forEach(date => {
        date.addEventListener('click', function () {
            dates.forEach(d => d.classList.remove('active'));
            date.classList.add('active');
        });
    });
}

function setupSeatClickModal(sessionId) {
    const modal = document.getElementById('ticketModal');
    const overlay = document.getElementById('overlay');
    let selectedSeatID;

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('seat')) {
            selectedSeatID = e.target.dataset.id;
            document.getElementById('seat').textContent = selectedSeatID;
            modal.classList.add('show');
            overlay.classList.add('show');
        }
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.classList.remove('show');
            overlay.classList.remove('show');
        }
    });

    document.querySelector('.ticket-confirm').addEventListener('click', async () => {
        const nameInput = document.querySelector('input.name');
        const emailInput = document.querySelector('input.email');
        const paymentMethodSelect = document.getElementById('payment-method');
        const paymentAmount = document.getElementById('payment-amount');

        if (!nameInput.value) return alert("Please enter your name");
        if (!emailInput.value) return alert("Please enter email");

        const data = {
            session_id: sessionId,
            seat_id: [parseInt(selectedSeatID)],
            user: {
                name: nameInput.value,
                email: emailInput.value
            },
            payment: {
                method: paymentMethodSelect.value,
                amount: parseFloat(paymentAmount.value),
            }
        };

        const response = await fetch(`http://31.43.170.177:1337/api/order`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (response.ok) alert("Ticket purchased successfully.");
        window.location.reload();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const sessionId = window.location.pathname.split('/').pop();
    try {
        const [sessionData, movieData] = await Promise.all([
            fetchData('http://31.43.170.177:1337/api/sessions'),
            fetchData('http://31.43.170.177:1337/api/movies')
        ]);

        const sessions = sessionData.data;
        const movies = movieData.data;

        const session = sessions.find(s => s.id == sessionId);
        if (!session) return alert('Session not found');

        const movie = movies.find(m => m.id == session.movie_id);
        if (!movie) return alert('Movie not found');

        renderMovieInfo(movie, session);

        const seatsData = (await fetchData('http://31.43.170.177:1337/api/seats?session_id=' + session.id)).data;
        await renderSeats(seatsData);

        renderDateCarousel(sessions, session.movie_id);
        setupSeatClickModal(session.id);
    } catch (err) {
        console.error(err);
        alert('Something went wrong while loading the page.');
    }
});
