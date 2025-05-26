module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        id         : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        movie_id   : { type: DataTypes.INTEGER, allowNull: false },
        author_name: { type: DataTypes.STRING,  allowNull: false },
        rating     : { type: DataTypes.INTEGER, allowNull: false },
        comment    : { type: DataTypes.TEXT,    allowNull: true },
        created_at : { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'reviews',
        timestamps: false
    });

    Review.associate = db => {
        Review.belongsTo(db.Movie, { foreignKey: 'movie_id' });
    };

    return Review;
};
