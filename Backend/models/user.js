module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id            : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username      : { type: DataTypes.STRING,  allowNull: false, unique: true },
        password_hash : { type: DataTypes.STRING,  allowNull: false },
        email         : { type: DataTypes.STRING,  allowNull: false, unique: true },
        role          : { type: DataTypes.STRING,  allowNull: false },
        created_at    : { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW },
        last_login    : { type: DataTypes.DATE,    allowNull: true }
    }, {
        tableName: 'users',
        timestamps: false
    });

    User.associate = db => {
        User.hasMany(db.PromoCode,    { foreignKey: 'created_by' });
        User.hasMany(db.AdminLog,     { foreignKey: 'admin_id' });
        User.hasMany(db.AnalyticsLog, { foreignKey: 'user_id' });
        User.hasMany(db.Feedback,     { foreignKey: 'user_id' });
    };

    return User;
};
