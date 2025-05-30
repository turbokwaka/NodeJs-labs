document.addEventListener('DOMContentLoaded', async () => {
    const sessionId = window.location.pathname.split('/').pop();
    try {
        await Promise.all([
            fetch('http://31.43.170.177:1337/api/sessions').then(res => res.json()),
            fetch('http://31.43.170.177:1337/api/movies').then(res => res.json())
        ]).then(([sessionData, movieData]) => {
            const sessions = sessionData.data;
            const movies = movieData.data;

            const session = sessions.find(s => s.id == sessionId);
            if (!session) return alert('sessions is no found');

            const movie = movies.find(m => m.id == session.movie_id);
            if (!movie) return alert('movie is not found');

            document.getElementById('poster').src = movie.poster_url;
            document.getElementById('poster').alt = movie.title;
            document.querySelectorAll('.title').forEach(el => {
                el.textContent = movie.title;
            });
            document.getElementById('time').textContent = new Date(session.start_time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
            document.getElementById('hall').textContent = session.hall_name;
            document.getElementById('age_rating').textContent = movie.age_rating;
            document.getElementById('genre').textContent = movie.genre;
            document.getElementById('duration').textContent = movie.duration_minutes + " min";
            document.getElementById('price').textContent = '250 hr'

            /*seat render*/
            const seatsContainer = document.getElementById('seats-container');
            const totalSeats = session.total_seats;
            const seatsPerRow = 10;
            const rowsTotal = Math.ceil(totalSeats / seatsPerRow)

            for (let i = 0; i < rowsTotal; i++) {
                const rowDiv = document.createElement('div')
                rowDiv.className = `row row--${i+1}`;

                const rowNumber = document.createElement('span');
                rowNumber.className = 'row-number'
                rowNumber.textContent = `Row ${i + 1}`;
                rowDiv.appendChild(rowNumber);

                const ul = document.createElement('ul');
                for (let j = 0; j < seatsPerRow; j++) {
                    const seatNumber = i * seatsPerRow + j + 1; //total seat numb

                    const li = document.createElement('li');
                    li.className = 'seat';
                    li.dataset.seat = seatNumber;
                    li.textContent = seatNumber;
                    ul.appendChild(li);
                }
                rowDiv.appendChild(ul);
                seatsContainer.appendChild(rowDiv);
            }

            /*data render*/
            const uniqueDates = [...new Set(
                sessions
                    .filter(s => s.movie_id === session.movie_id)
                    .map(s => new Date(s.start_time).toLocaleDateString('en-US'))
            )];
            const dateCarousel = document.getElementById('dateCarousel');
            uniqueDates.forEach(date => {
                const div = document.createElement('div');
                div.className = 'date';
                div.textContent = date;
                dateCarousel.appendChild(div);
            });

            /*date carousel*/
            const scrollBtn = document.querySelector(".scroll-btn");
            const dateCarouselcl = document.querySelector(".date-carousel");
            const dates = document.querySelectorAll('.date');

            dates[0].classList.add('active');

            const scrollAmount = window.innerWidth;

            scrollBtn.addEventListener('click', function (){
                dateCarouselcl.scrollBy({left: scrollAmount / 5, behavior: "smooth"})
            });

            dates.forEach(date => {
                date.addEventListener('click', function (){
                    dates.forEach(d => d.classList.remove('active'));
                    date.classList.add('active')
                })
            })

            const modal = document.getElementById('ticketModal');
            const overlay = document.getElementById('overlay');
            /*click seat*/
          let selectedSeatID
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('seat')) {
                    selectedSeatID = e.target.dataset.seat;
                    console.log(selectedSeatID)
                    document.getElementById('seat').textContent = selectedSeatID;
                    document.getElementById('ticketModal').classList.add('show');
                    document.getElementById('overlay').classList.add('show');
                }
            })
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    modal.classList.remove('show');
                    overlay.classList.remove('show');
                }
            });

            document.querySelector('.ticket-confirm').addEventListener('click',  () => {
                const nameInput = document.querySelector('input.name');

                if (!nameInput.value) {
                    alert("Please enter your name");
                    return;
                }


            })


            /*confirm button*/
            /*НЕ ПРАЦЮЄ*/
            /*document.querySelector('.ticket-confirm').addEventListener('click', async () => {
                const nameInput = document.querySelector('input.name');
                const paymentMethod = document.getElementById('payment-method');
                const guestEmail = "maximnavrotskyi@hmail.com"; //переробити потім!!

                try {
                    const ticketRes = await fetch('http://31.43.170.177:1337/api/tickets', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            session_id: sessionId,
                            seat_id: selectedSeatID,
                            guest_name: nameInput.value,
                            guest_email: guestEmail,
                            status: 'sold'
                        })
                    });

                    if (!ticketRes.ok) {
                        throw new Error('Не вдалося створити квиток');
                    }

                    const ticketData = await ticketRes.json();
                    const ticketId = ticketData.id || ticketData.data?.id;

                    // Створення платежу
                    const paymentRes = await fetch('http://31.43.170.177:1337/api/payments', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ticket_id: ticketId,
                            method: paymentMethod.value,
                            status: 'paid',
                            amount: 250 // або змінна price
                        })
                    });

                    if (!paymentRes.ok) {
                        throw new Error('Не вдалося створити платіж');
                    }

                    alert("Квиток успішно оформлено!");
                    location.reload();
                } catch (err) {
                    console.error("Помилка при бронюванні квитка:", err);
                    alert("Виникла помилка при оформленні квитка.");
                }
            });
*/

        })
    } catch (err) {
        console.error('Помилка при завантаженні даних:', err);
        alert('Не вдалося завантажити дані');
    }
});


