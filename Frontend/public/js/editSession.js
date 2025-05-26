function updateSession() {
    const form = document.getElementById('edit-session-form');

    const formData = new FormData(form);

    const data = {
        start_time: formData.get('start_time'),
        hall_name: formData.get('hall_name'),
        total_seats: parseInt(formData.get('total_seats')),
        background_image_url: formData.get('background_image_url')
    };

    const id = formData.get('id');

    updateSessionAPI(id, data).then();
}

async function updateSessionAPI(id, data) {
    try {
        const response = await fetch(`http://localhost:1337/api/sessions/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            alert("Щось пішло не так :(");
        } else {
            alert("Зміни збережено!");
        }
    } catch (err) {
        console.error('Error:', err);
        alert("Щось пішло не так :(");
    }
}