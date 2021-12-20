const express = require("express");
const router = express.Router();
router.use(express.json());
const sellerDetails = require("../sellerDetails");
const Seller = require('../model/sellerdata.js');
const mongoose = require('mongoose');

//GET REQUEST
router.get('/api/sellerDetails',(req,res) => {
    Seller.find()
    .then(result=>{
        res.status(200).json({
            sellerdata:result
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
router.get('/api/sellerDetails/:id',(req,res,next)=>{
    console.log(req.params.id);
    Seller.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            seller:result
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
router.post('/api/sellerDetails',(req,res) => {
    const seller = new Seller({
        _id:new mongoose.Types.ObjectId,
        name : req.body.name,
        productid: req.body.productid
    })
    seller.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            NewSeller:result
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
router.put('/api/sellerDetails/:id', (req ,res) => {
    Seller.findOneAndUpdate({_id:req.params.id},{
        $set:{      
            name : req.body.name,
            productid: req.body.productid
        }
    })
    .then(result=>{
        res.status(200).json({
            Message:'Data Update....',
            //Update_Seller:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//DELETE REQUEST
router.delete("/api/sellerDetails/:id" , (req ,res) => {
    Seller.remove({_id:req.params.id})
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