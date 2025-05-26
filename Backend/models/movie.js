module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        id              : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title           : { type: DataTypes.STRING,  allowNull: false },
        genre           : { type: DataTypes.STRING,  allowNull: true },
        description     : { type: DataTypes.TEXT,    allowNull: true },
        duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
        poster_url      : { type: DataTypes.STRING,  allowNull: true },
        age_rating      : { type: DataTypes.STRING,  allowNull: true },
        synopsis        : { type: DataTypes.TEXT,    allowNull: true }
    }, {
        tableName: 'movies',
        timestamps: false
    });

    Movie.associate = db => {
        Movie.hasMany(db.Session,       { foreignKey: 'movie_id' });
        Movie.hasMany(db.Review,        { foreignKey: 'movie_id' });
        Movie.hasMany(db.MediaLink,     { foreignKey: 'movie_id' });
        Movie.belongsToMany(db.MovieTag, { through: db.MovieTagLink, foreignKey: 'movie_id' });
    };

    return Movie;
};
