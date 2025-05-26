function updateTicket() {
    const form = document.getElementById('edit-session-form');
    const formData = new FormData(form);

    const ticketData = {
        guest_name: formData.get('guest_name'),
        status: formData.get('status'),
    };

    const seatData = {
        seat_number: formData.get('seat_number'),
        row: formData.get('seat_row'),
    }

    const id = formData.get('id');
    const seatId = formData.get('seat_id');

    try {
        updateAPI(id, ticketData, 'tickets').then();
        updateAPI(seatId, seatData, 'seats').then();
        alert("Все супер!")
    } catch (error) {
        alert("Все погано :((");
    }
}

async function updateAPI(id, data, endpoint) {
    try {
        const response = await fetch(`http://31.43.170.177:1337/api/${endpoint}/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error('Error:', err);
        alert("Щось пішло не так :(");
    }
}