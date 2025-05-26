module.exports = (sequelize, DataTypes) => {
    const Hall = sequelize.define('Hall', {
        id      : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name    : { type: DataTypes.STRING,  allowNull: false },
        capacity: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'halls',
        timestamps: false
    });

    Hall.associate = db => {
        Hall.hasMany(db.Session, { foreignKey: 'hall_id' });
    };

    return Hall;
};
