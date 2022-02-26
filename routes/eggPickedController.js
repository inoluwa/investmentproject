// Importing  into eggpickedController
const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const EggModel = require('../models/eggpicked');
const res = require('express/lib/response');


router.post('/postEggRecord', async(req,res)=>{
    const egg = new EggModel ({
        good: req.body.good,
        cracked:req.body.cracked,
        bad:req.body.condemed,
        comment:req.body.moreInformation,
        isDeleted:false,
    })
    
// after creating our post request
//save object created into database
    try{
        const savedEggModelRecord = await egg.save();
        res.json(savedEggModelRecord);
    }catch(err) {
        res.json({message:err})
    }
});

router.get('/getRecord/:id', async(req,res)=>{
    try{
       const getSingleRecord = await EggModel.findOne(
           {where:{id:req.params.id,
            isDeleted:false}});
            if(!getSingleRecord){
                return res.status(404).json({message:'Record is not found'});
            }
       res.json(getSingleRecord);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/allEggRecords', async(req,res)=>{
try{
    const allRecord = await EggModel.findAll({where:{isDeleted:false}});
    
    const dataResult={data:allRecord,
        message:'Record fetched',
    totalCount:allRecord.length}
    res.json(dataResult);
}catch(err){
    res.json({message:err});
}
});

router.put('/updateEggRecord/:id',async(req,res)=>{
    
try{
    // algorithm
    // check whether the record is on our database
    const record = await EggModel.findOne({where:{id:req.params.id,isDeleted:false}});
    if(!record){
        // if there is no record don't update the record
     return   res.status(404).json({message:'Record is not found'});
    }
    // if  everything okay the code below will update  our record
    const updateModel = await EggModel.update({
        good: req.body.good,
        cracked:req.body.cracked,
        bad:req.body.condemed,
        comment:req.body.moreInformation,
}, {where:{id:req.params.id}});
// the value of updaterModel must be greater than 0 if the record  
res.json(updateModel >0?'Successfully updated':'Failed to update');
}
catch(err){
    res.json({message:err});
}
})

router.delete('/deleteEggRecord/:id', async(req,res)=>{
    //check if record is existing in database
    try{
        const record = await EggModel.findOne({where:{id:req.params.id, isDeleted:false}})
       // if record doesnot exist
        if(!record){
            // reply with record cannot be found
         return   res.status(404).send('record not found');

    // if record exist, continue by doing a sub delete by setting isdelete to true
    // using update
    }
    else {
    const deletedRecord = await EggModel.update({isDeleted:true}, {where:{id:req.params.id}})
    // since we are using boolean, true or false, the value of delete is 1 which is true
    // 1>0 it mmeans record is successfully deleted
    res.json(deletedRecord >0?'Successfully deleted':'Failed to deleted');
    }
    
}
catch(err){
    res.json({message:err})
}
});
module.exports = router;