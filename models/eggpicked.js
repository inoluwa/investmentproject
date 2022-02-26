const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const eggPicked = sequelize.define('eggPicked_tb', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
   },
   date: {
       type: Sequelize.DATE,
       allowNull: false,
       defaultValue: Sequelize.DataTypes.NOW
   },
   good: {
       type: Sequelize.INTEGER,
       allowNull: true,
   },
   cracked: {
       type: Sequelize.STRING,
       allowNull: false,
   },
   bad: {
       type: Sequelize.INTEGER,
       allowNull: true,
   },
   comment: {
    type: Sequelize.STRING,
    allowNull: false,
},

   isDeleted:{
    type:Sequelize.BOOLEAN,
    allowNull:true,

}
});
module.exports = eggPicked;