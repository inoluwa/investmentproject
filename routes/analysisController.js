const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const Post = require('../models/expenditure');
const User = require('../models/user');
const Role = require('../models/role');
const res = require('express/lib/response');
const {authUser, verifyToken} = require('../basicAuth');
const {canViewRecords, permit} = require('../permissions/records');

//verifyToken,permit(1,2), 
router.post('/postData',async(req, res) => {
   
    const post = new Post({
       // date: req.body.date,
        mortality: req.body.mortality,
        expenses_description: req.body.expenses_description,
        quantity: req.body.quantity,
        amount: req.body.amount,
        comment: req.body.comment,
       analysisType:req.body.analysisType,
       isDeleted:false,
    });

   
    try{
        const savedPostData = await post.save();
        res.json(savedPostData);
    }catch (err) { 
        res.json({message: err});
    }
});

router.get('/getAllPosts', async(req,res) => {
    try{
          const allPosts = await Post.findAll({where:{isDeleted:false}});



          const dataResult={data:allPosts,
        message:'Record fetched',
    totalCount:allPosts.length}
          res.json(dataResult);

      }catch(err) {
          res.json({message:err});
        }
});

router.get('/getbyid/:id',verifyToken, async(req, res) => {
    try{
        ///const getById = await Post.sequelize.findById(req.params.Id);
       
        const getById = await Post.findOne( {where:{id:req.params.id, isDeleted:false}});

        //res.send(req.params.id);
        res.json(getById);
    }catch(err) {
        res.json({message:err});
    }
});


router.get('/allrecord',  verifyToken, permit(1),  async(req, res) => {
    try{
        // Select * from Table where   expenses_description= 'feedmill' AND 'quantity'= 12
      // const allRecords = await Post.findAll( {where: {expenses_description:'feedmill',quantity: 12}})
      
      const allRecords = await Post.findAll( {where: {
        [sequelize.Op.and]: [{expenses_description:'feedmill'},{quantity: 12}]}})
      res.json(allRecords)
    }catch(err) {
        res.json({message:err});
    }
});
router.get('/specifiedRecord', async(req, res) => {
    try{
        const allSpecifiedRecord = await Post.findAll({where: {
            [sequelize.Op.or]: [{expenses_description:'feedmill'},{quantity:12}]}})
            res.json(allSpecifiedRecord);
    }catch(err) {
        res.json({message:err});
    }
});
router.put('/updateRecord/:id', async(req, res) => {
    
    try{
  //Be calming down now
  const getById = await Post.findOne( {where:{id:req.params.id}});

        if(!getById){
 res.status(404).json({message:'Record is not found'});
        }
       const updatedRecord = await Post.update( {mortality: req.body.mortality,
        expenses_description: req.body.expenses_description,
        quantity: req.body.quantity,
        amount: req.body.amount,
        analysisType: req.body.analysisType,
        comment: req.body.comment}, {where:{id:req.params.id}})
        
       res.json(updatedRecord >0?'Successfully updated':'Failed to update');

    }catch(err){
        res.json({message:err});
    }

});

router.put('/getRecord/:id', async( req, res) => {
    try{
 const records = await Post.findOne({where: {id : parseInt(req.params.id), isDeleted:false}});
 //res.json(records);
 if(!records) {
 res.status(404).send('Record not found');
 }


 const updatedRecord = await Post.update( {mortality: req.body.mortality,
    expenses_description: req.body.expenses_description,
    quantity: req.body.quantity,
    amount: req.body.amount,
    comment: req.body.comment}, {where:{id:req.params.id}})
    
   res.json(updatedRecord >0?'Successfully updated':'Failed to update');
 //const 
 
}
catch(err){
    res.json({message:err});
}
}

);
router.delete('/deletebyid/:id', async( req, res) => {

    try{
    const records = await Post.findOne({where: {id : parseInt(req.params.id), isDeleted:false}});
    //res.json(records);
    if(!records) {
    res.status(404).send('Record not found');
   
    } 
    else{

        const deleteRecord = await Post.update( {isDeleted:true}, {where:{id:req.params.id}})
        res.json(deleteRecord >0?'Successfully deleted':'Failed to deleted');
    }




    }
    catch(err){
        res.json({message:err});
    }
})


module.exports = router;
 