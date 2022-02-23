const express = require('express');
const router = express.Router();
//const sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
const User = require('../models/user');
//const Role= require('../');
require("dotenv").config();
const Role = require('../models/role');
const jwt = require("jsonwebtoken");
//const {authUser} = require('..auth/');



router.post('/register', async(req, res) => {
try{
    // user input
    const { role_id, username, password, name }= req.body;
    //validate user input
    if (!( role_id && username && password && name )) {
       return res.status(400).send('All input is required');
    }
    // check if user is existing
    const oldUser = await User.findOne({where:{ username:username} });
    if (oldUser) {
        return res.status(409).send('User Already Exist. Please Login');
    }

    // encryt user password
    encryptedPassword = await bcrypt.hash(password, 8);

    // create user in database
    const user = await User.create({
        role_id, 
        username, 
        password: encryptedPassword,
        name,
        isDeleted:false
        
    });
    res.status(201).json(user);
}catch(err) {
    res.json({message:err});
}
});

router.post('/role', async(req, res) => {
    try{
        // user input
        const {  name }= req.body;
    
        // check if user is existing
        const oldUser = await Role.findOne({where:{ role_name:name }});
        if (oldUser) {
            return res.status(409).send('Role Already Exist');
        }
    
        // encryt user password
       
    
        // create user in database
        const roleCreate = await Role.create({
            
            role_name:name,
            
        });
        
        res.status(201).json(roleCreate);
    }catch(err) {
        res.json({message:err});
    }
    });

    
// login in 
router.post('/login', async(req, res) => {
try{
    // user input
//   return res.status(20).json();
   const {username, password} = req.body;
   // username=req.body.username;
   // password =req.body.password
   // validate user input
   if(!(username && password)) {
       res.status(400).send('All input is required');
   }
   //validate if user exist in database
   var user = await User.findOne({where:{username:username}});
   

   if (user && (await bcrypt.compare(password, user.password))) {
       // create token
       // res.send("tesing");
       const token = jwt.sign(
           {userId: user.id, username:user.username, role:user.role_id},
           process.env.TOKEN_KEY, 
           {
               expiresIn: "2h",
           }
           );
           // save user token
           if(token){
            return res.status(200).json({token, username:user.username, message:'Successfully logged in'});
           }

        }
        res.status(400).send("Invalid Credentials");
}catch(err) {
    res.json({message:err});
}
});
module.exports = router;