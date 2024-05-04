import Sequelize from 'sequelize';
import memberBuilder from "./member.model.js";
import animeBuilder from "./anime.model.js";
import animeListBuilder from "./animeList.model.js";
import episodeBuilder from "./episode.model.js";

const { DB_DIALECT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

const db = {};

db.sequelize = sequelize;

db.Member = memberBuilder(sequelize);
db.Anime = animeBuilder(sequelize);
db.AnimeList = animeListBuilder(sequelize);
db.Episode = episodeBuilder(sequelize);

db.Member.hasMany(db.AnimeList, {
    foreignKey: {
        name: 'memberId',
        allowNull: false
    },
});
db.AnimeList.belongsTo(db.Member, {
    foreignKey: {
        name: 'memberId',
        allowNull: false
    }
});

db.AnimeList.hasMany(db.Anime, {
    foreignKey: {
        name: 'animeListId',
        allowNull: false
    }
});
db.Anime.belongsTo(db.AnimeList, {
    foreignKey: {
        name: 'animeListId',
        allowNull: false
    }
});

db.MemberEpisode = sequelize.define('memberEpisode', {}, { timestamps: false });
db.Member.belongsToMany(db.Episode, {
    through: db.MemberEpisode,
    foreignKey: {
        name: 'memberId',
        allowNull: false
    }
});

db.Episode.belongsToMany(db.Member, {
    through: db.MemberEpisode,
    foreignKey: {
        name: 'episodeId',
        allowNull: false
    }
});


db.Anime.hasMany(db.Episode, {
    foreignKey: {
        name: 'animeId',
        allowNull: false
    }
});
db.Episode.belongsTo(db.Anime, {
    foreignKey: {
        name: 'animeId',
        allowNull: false
    }
});

export default db;
