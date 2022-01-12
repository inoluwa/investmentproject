const Sequelize = require('sequelize');


// imported sequelize from database
const sequelize = require('./util/database');

const Expenditure = sequelize.define('Expenditure', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW
    },
    mortality: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    expenses_description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    type:{
        type:Sequelize.BOOLEAN,
        allowNull:true,

    }
})

module.exports = Expenditure;