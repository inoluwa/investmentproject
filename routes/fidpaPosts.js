const express = require('express');
const router = express.Router();
const Post = require('../models/expenditure');
router.post('/postData', async(req, res) => {
  
    const post = new Post({
       // date: req.body.date,
        mortality: req.body.mortality,
        expenses_description: req.body.expenses_description,
        quantity: req.body.quantity,
        amount: req.body.amount,
        comment: req.body.comment,
       analysisType:1
    });
   
    try{
        const savedPostData = await post.save();
        res.json(savedPostData);
    }
    catch (err) {
        res.json({message: err});
    }
});

module.exports = router;
 