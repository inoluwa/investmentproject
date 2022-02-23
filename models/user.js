const Sequelize = require('sequelize');


// imported sequelize from database
const sequelize = require('../util/database');
const model= require("./role")

const User = sequelize.define('userTb', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role_id: {
         type: Sequelize.INTEGER,
    },
    // // email: {
    // //     type: Sequelize.STRING,
    // //     allowNull: false,
    // },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
   
    isDeleted:{
        type:Sequelize.BOOLEAN,
        allowNull:true,

    }
});
model.hasOne(User, {as: 'roleTb', foreignKey: 'role_id'});

module.exports = User;