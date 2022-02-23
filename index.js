const sequelize = require('./util/database');
const {authUser} = require('./basicAuth');


//importing user content
//const User = require('./models/user');

//const Expenditure = require('./models/expenditure');

const express = require('express');


const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());



app.use(cors())
const postsDataRoute = require('./routes/analysisController');
const registerRoute = require('./routes/usersController');
const { verifyToken } = require('./basicAuth');

app.use('/api', registerRoute);
app.use('/api', postsDataRoute );
app.get('/', (req, res)=> {
res.send('Home Page');

});
app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page');
});


// sync all models that are not
// already in the database
sequelize.sync();


// user 
//var listOfUsers= User.findAll(); check for all users
//if(listOfUsers.length===0)
// {insert}

// Force sync all models
// It will drop the table first
// and re-create it afterwards
//sequelize.sync({ force: true })

// .then(() => {
//   console.log('Connection has been established successfully');
// })
// .catch(err => {
//   console.error(err, 'Unable to connect to the database')
// });


// Register
// app.post('/register', (req, res) => {

// });


// login
// app.post('/login', (req, res) => {

// });

app.listen(4000);
 

