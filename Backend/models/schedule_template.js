module.exports = (sequelize, DataTypes) => {
    const ScheduleTemplate = sequelize.define('ScheduleTemplate', {
        id              : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name            : { type: DataTypes.STRING,  allowNull: false },
        start_time      : { type: DataTypes.TIME,    allowNull: false },
        duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
        weekday         : { type: DataTypes.TINYINT, allowNull: false }
    }, {
        tableName: 'schedule_templates',
        timestamps: false
    });

    return ScheduleTemplate;
};
