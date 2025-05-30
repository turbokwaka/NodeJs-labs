module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        id         : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        session_id : { type: DataTypes.INTEGER, allowNull: false },
        seat_id    : { type: DataTypes.INTEGER, allowNull: false },
        reserved_at: { type: DataTypes.DATE,    allowNull: false, defaultValue: sequelize.literal('GETDATE()') },
        status     : { type: DataTypes.STRING,  allowNull: false },
        expires_at : { type: DataTypes.DATE,    allowNull: true },
        guest_name : { type: DataTypes.STRING,  allowNull: true },
        guest_email: { type: DataTypes.STRING,  allowNull: true }
    }, {
        tableName: 'tickets',
        timestamps: false
    });

    Ticket.associate = db => {
        Ticket.belongsTo(db.Session, { foreignKey: 'session_id' });
        Ticket.belongsTo(db.Seat,    { foreignKey: 'seat_id' });
        Ticket.hasMany(db.Payment,   { foreignKey: 'ticket_id' });
    };

    return Ticket;
};
