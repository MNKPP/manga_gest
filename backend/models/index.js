import sequelize from 'sequelize';
const { DB_DIALECT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const db = new sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

export default db;