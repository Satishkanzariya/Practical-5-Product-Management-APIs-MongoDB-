const express = require("express");
const router = express.Router();
router.use(express.json());
const companyDetails = require("../companyDetails");
const Company = require('../model/companydata.js');
const mongoose = require('mongoose');

//GET REQUEST
router.get('/api/companyDetails',(req,res) => {
    Company.find()
    .then(result=>{
        res.status(200).json({
            companyData:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//GET REQUEST BY ID
router.get('/api/companyDetails/:id',(req,res,next)=>{
    console.log(req.params.id);
    Company.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            company:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//POST REQUEST
router.post('/api/companyDetails',(req,res) => {
    const company = new Company({
        _id:new mongoose.Types.ObjectId,
        name : req.body.name,
        productid: req.body.productid
    })
    company.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            NewCompany:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//PUT REQUEST
router.put('/api/companyDetails/:id', (req ,res) => {
    Company.findOneAndUpdate({_id:req.params.id},{
        $set:{      
            name : req.body.name,
            productid: req.body.productid
        }
    })
    .then(result=>{
        res.status(200).json({
            Message:'Data Update....',
            //Update_Company:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//DELETE REQUEST
router.delete("/api/companyDetails/:id" , (req ,res) => {
    Company.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            Message:'Data Deleted....',
            //result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;