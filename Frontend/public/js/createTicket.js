async function createTicket() {
    const form = document.getElementById('edit-session-form');

    const formData = new FormData(form);

    const data = {
        "session_id": parseInt(formData.get('session_id')),
        "seat_id": [parseInt(formData.get('seat_id'))],
        "user": {
            "name": formData.get('user_name'),
            "email": formData.get('user_email'),
        },
        "payment": {
            "method": 'adminka',
            "amount": 1337.0
        }
    };

    try {
        console.log(data)
        const response = await fetch(`http://31.43.170.177:1337/api/order`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        console.log(response)
        if (response.ok)
            alert("Все супер!")
        else
            alert("Шось пішло не так ((");
    } catch (error) {
        alert("Шось піщло не так :(");
    }
}