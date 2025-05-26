module.exports = (sequelize, DataTypes) => {
    const MediaLink = sequelize.define('MediaLink', {
        id      : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        movie_id: { type: DataTypes.INTEGER, allowNull: false },
        type    : { type: DataTypes.STRING,  allowNull: false },
        url     : { type: DataTypes.STRING,  allowNull: false }
    }, {
        tableName: 'media_links',
        timestamps: false
    });

    MediaLink.associate = db => {
        MediaLink.belongsTo(db.Movie, { foreignKey: 'movie_id' });
    };

    return MediaLink;
};
