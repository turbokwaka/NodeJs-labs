module.exports = (sequelize, DataTypes) => {
    const MovieTagLink = sequelize.define('MovieTagLink', {
        id      : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        movie_id: { type: DataTypes.INTEGER, allowNull: false },
        tag_id  : { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'movie_tag_links',
        timestamps: false
    });

    MovieTagLink.associate = db => {
        MovieTagLink.belongsTo(db.Movie,    { foreignKey: 'movie_id' });
        MovieTagLink.belongsTo(db.MovieTag, { foreignKey: 'tag_id' });
    };

    return MovieTagLink;
};
