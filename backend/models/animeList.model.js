import { Sequelize, DataTypes } from 'sequelize';

export default  (sequelize) => {
    const AnimeList = sequelize.define('AnimeList',{
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'AnimeList',
        timestamps: true
    })

    return AnimeList;
}