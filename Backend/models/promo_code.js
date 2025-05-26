module.exports = (sequelize, DataTypes) => {
    const PromoCode = sequelize.define('PromoCode', {
        id              : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        code            : { type: DataTypes.STRING,  allowNull: false, unique: true },
        discount_percent: { type: DataTypes.DECIMAL(5,2), allowNull: false },
        expires_at      : { type: DataTypes.DATE,    allowNull: false },
        created_by      : { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'promo_codes',
        timestamps: false
    });

    PromoCode.associate = db => {
        PromoCode.belongsTo(db.User, { foreignKey: 'created_by' });
    };

    return PromoCode;
};
