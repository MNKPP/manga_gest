import { Sequelize, DataTypes } from 'sequelize';

export default  (sequelize) => {
    const Episode = sequelize.define('Episode',{
        animeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        watchedEpisode: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        totalEpisodes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Episode',
        timestamps: true
    });

    return Episode;
}