const { Sequelize } = require ('sequelize');
const config = require ('scr/config');

const sequelize = new Sequelize (config.db.url, {
    dialect: config.db.dialect,
    logging:false,
});

module.exports = sequelize;