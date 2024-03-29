import { Sequelize, DataTypes } from 'sequelize';

export default  (sequelize) => {
    const Anime = sequelize.define('Anime',{
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        studio: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        genre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER(2),
            allowNull: true
        },
        synopsis: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        trailer: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        animeListId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'AnimeList',
                key: 'id'
            }
        }
    }, {
        tableName: 'Anime',
        timestamps: false
    })

    return Anime;
}