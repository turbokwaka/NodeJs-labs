const {poolPromise} = require('../databases/db');

async function getAllTickets() {
    try {
        const ticketsResponse = await fetch('http://31.43.170.177:1337/api/tickets');

        if (!ticketsResponse.ok) {
            throw new Error(`HTTP помилка! Статус: ${ticketsResponse.status}`);
        }

        const ticketsData = await ticketsResponse.json();

        const enrichedTickets = [];

        for (ticket of ticketsData.data) {
            let seatResponse = await fetch('http://31.43.170.177:1337/api/seats/' + ticket["seat_id"]);
            let seatData = await seatResponse.json();

            let sessionResponse = await fetch('http://31.43.170.177:1337/api/sessions/' + ticket["session_id"]);
            let sessionData = await sessionResponse.json();

            let moviesResponse = await fetch('http://31.43.170.177:1337/api/movies/' + sessionData["movie_id"]);
            let moviesData = await moviesResponse.json();

            let enrichedSession = {
                ...ticket,
                "movie_title": moviesData["title"],
                "seat_row": seatData["row"],
                "seat_number": seatData["seat_number"],
            }
            console.log(enrichedSession);

            enrichedTickets.push(enrichedSession);
        }

        return enrichedTickets;
    } catch (err) {
        throw err;
    }
}

async function getTicketById(id) {
    try {
        const ticketResponse = await fetch('http://31.43.170.177:1337/api/tickets/' + id);
        const ticketData = await ticketResponse.json();

        const seatResponse = await fetch('http://31.43.170.177:1337/api/seats/' + ticketData["seat_id"]);
        const seatData = await seatResponse.json();

        const enrichedTicket = {
            ...ticketData,
            seat_row: seatData["row"],
            seat_number: seatData["seat_number"],
        }

        return await enrichedTicket;
    } catch (err){
        throw err;
    }
}


module.exports = {
    getAllTickets,
    getTicketById,
};
