module.exports = (sequelize, DataTypes) => {
    const AdminLog = sequelize.define('AdminLog', {
        id         : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        admin_id   : { type: DataTypes.INTEGER, allowNull: false },
        action_type: { type: DataTypes.STRING,  allowNull: false },
        target_type: { type: DataTypes.STRING,  allowNull: false },
        target_id  : { type: DataTypes.INTEGER, allowNull: true },
        timestamp  : { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW },
        details    : { type: DataTypes.TEXT,    allowNull: true }
    }, {
        tableName: 'admin_logs',
        timestamps: false
    });

    AdminLog.associate = db => {
        AdminLog.belongsTo(db.User, { foreignKey: 'admin_id' });
    };

    return AdminLog;
};
