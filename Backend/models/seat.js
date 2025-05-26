module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define('Seat', {
        id         : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        session_id : { type: DataTypes.INTEGER, allowNull: false },
        row        : { type: DataTypes.STRING,  allowNull: true },
        seat_number: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'seats',
        timestamps: false
    });

    Seat.associate = db => {
        Seat.belongsTo(db.Session, { foreignKey: 'session_id' });
        Seat.hasMany(db.Ticket,    { foreignKey: 'seat_id' });
    };

    return Seat;
};
