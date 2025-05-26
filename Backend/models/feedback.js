module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        id        : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id   : { type: DataTypes.INTEGER, allowNull: false },
        message   : { type: DataTypes.TEXT,    allowNull: false },
        created_at: { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW },
        rating    : { type: DataTypes.INTEGER, allowNull: true }
    }, {
        tableName: 'feedbacks',
        timestamps: false
    });

    Feedback.associate = db => {
        Feedback.belongsTo(db.User, { foreignKey: 'user_id' });
    };

    return Feedback;
};
