module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        id       : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ticket_id: { type: DataTypes.INTEGER, allowNull: false },
        method   : { type: DataTypes.STRING,  allowNull: false },
        status   : { type: DataTypes.STRING,  allowNull: false },
        amount   : { type: DataTypes.DECIMAL(10,2), allowNull: false },
        paid_at  : { type: DataTypes.DATE,    allowNull: true }
    }, {
        tableName: 'payments',
        timestamps: false
    });

    Payment.associate = db => {
        Payment.belongsTo(db.Ticket, { foreignKey: 'ticket_id' });
    };

    return Payment;
};
