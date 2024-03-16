import Sequelize from 'sequelize';
import memberBuilder from "./member.model.js";

const { DB_DIALECT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

const db = {};

db.sequelize = sequelize;

db.Member = memberBuilder(sequelize);

export default db;
