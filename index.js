const sequelize = require('./util/database');

//const Expenditure = require('./models/expenditure');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
const postsDataRoute = require('./routes/fidpaPosts');
app.use('/api',postsDataRoute );
app.get('/', (req, res)=> {
res.send('ready to save data');
});
//const mysql = require('mysql');

// sync all models that are not
// already in the database
//sequelize.sync()

// Force sync all models
// It will drop the table first
// and re-create it afterwards
sequelize.sync({ force: true })

// .then(() => {
//   console.log('Connection has been established successfully');
// })
// .catch(err => {
//   console.error(err, 'Unable to connect to the database')
// });
app.listen(4000);
 

