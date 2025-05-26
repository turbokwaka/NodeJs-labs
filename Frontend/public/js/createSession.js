function createSession() {
    const form = document.getElementById('edit-session-form');

    const formData = new FormData(form);

    const data = {
        movie_id: parseInt(formData.get('movie_id')),
        start_time: formData.get('start_time'),
        hall_name: formData.get('hall_name'),
        total_seats: parseInt(formData.get('total_seats')),
        background_image_url: formData.get('background_image_url')
    };

    console.log(data);

    const id = formData.get('id');

    createSessionAPI(data).then();
}

async function createSessionAPI(data) {
    try {
        const response = await fetch(`http://localhost:1337/api/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            alert("Щось пішло не так :(");
        } else {
            alert("Сеанс успішно додано!");
        }
    } catch (err) {
        console.error('Error:', err);
        alert("Щось пішло не так :(");
    }
}