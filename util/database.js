const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql3474934', 'sql3474934', 'D6syKeSsB1', {
          dialect: 'mysql',
          host: 'sql3.freemysqlhosting.net',
});
module.exports = sequelize;