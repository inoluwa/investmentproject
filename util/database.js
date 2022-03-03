const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_5fd89197d72e0e8', 'b85ec73434fb59', 'ebc094d6', {
          dialect: 'mysql',
          host: 'us-cdbr-east-05.cleardb.net',
});
module.exports = sequelize;