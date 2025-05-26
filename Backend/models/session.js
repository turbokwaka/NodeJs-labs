module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
        id                   : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        movie_id             : { type: DataTypes.INTEGER, allowNull: false },
        start_time           : { type: DataTypes.DATE,    allowNull: false },
        hall_name            : { type: DataTypes.STRING,  allowNull: true },
        total_seats          : { type: DataTypes.INTEGER, allowNull: false },
        background_image_url : { type: DataTypes.STRING,  allowNull: true },
        hall_id              : { type: DataTypes.INTEGER, allowNull: true }
    }, {
        tableName: 'sessions',
        timestamps: false,
    });

    Session.associate = db => {
        Session.belongsTo(db.Movie, { foreignKey: 'movie_id' });
        Session.belongsTo(db.Hall,  { foreignKey: 'hall_id' });
        Session.hasMany(db.Seat,    { foreignKey: 'session_id' });
        Session.hasMany(db.Ticket,  { foreignKey: 'session_id' });
    };

    return Session;
};
