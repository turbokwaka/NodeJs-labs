module.exports = (sequelize, DataTypes) => {
    const AnalyticsLog = sequelize.define('AnalyticsLog', {
        id        : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id   : { type: DataTypes.INTEGER, allowNull: true },
        action    : { type: DataTypes.STRING,  allowNull: false },
        target    : { type: DataTypes.STRING,  allowNull: true },
        timestamp : { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW },
        user_agent: { type: DataTypes.STRING,  allowNull: true },
        ip_address: { type: DataTypes.STRING,  allowNull: true }
    }, {
        tableName: 'analytics_logs',
        timestamps: false
    });

    AnalyticsLog.associate = db => {
        AnalyticsLog.belongsTo(db.User, { foreignKey: 'user_id' });
    };

    return AnalyticsLog;
};
