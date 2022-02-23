const Sequelize = require('sequelize');


// imported sequelize from database
const sequelize = require('../util/database');



const Role = sequelize.define('roleTb',
 {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        role_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
       
      
      });
      module.exports = Role;