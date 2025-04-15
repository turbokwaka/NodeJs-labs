const movieService = require('../services/movieService');

exports.showMovies = async (req, res) => {
    try {
        const movies = await movieService.getAllMovies();
        res.render('movies', { title: 'Усі фільми', movies });
    } catch (err) {
        res.status(500).send('Помилка отримання фільмів');
    }
};
