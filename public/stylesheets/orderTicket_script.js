
const seats = document.querySelectorAll('.seat'); // елементи сидінь
const modal = document.getElementById('ticketModal');
const overlay = document.getElementById('overlay');

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        modal.classList.add('show');
        overlay.classList.add('show');
    });
});

overlay.addEventListener('click', () => {
    modal.classList.remove('show');
    overlay.classList.remove('show');
});