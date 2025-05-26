module.exports = (sequelize, DataTypes) => {
    const MovieTag = sequelize.define('MovieTag', {
        id  : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING,  allowNull: false, unique: true }
    }, {
        tableName: 'movie_tags',
        timestamps: false
    });

    MovieTag.associate = db => {
        MovieTag.belongsToMany(db.Movie, { through: db.MovieTagLink, foreignKey: 'tag_id' });
    };

    return MovieTag;
};

