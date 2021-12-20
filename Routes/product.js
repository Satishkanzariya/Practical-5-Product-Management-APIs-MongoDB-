const express = require("express");
const router = express.Router();
router.use(express.json());
const productDetails = require("../productDetails");
const Product = require('../model/productdata.js');
const mongoose = require('mongoose');

//GET REQUEST
router.get('/api/productDetails',(req,res) => {
    Product.find()
    .then(result=>{
        res.status(200).json({
            productData:result
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
router.get('/api/productDetails/:id',(req,res,next)=>{
    console.log(req.params.id);
    Product.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            product:result
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
router.post('/api/productDetails',(req,res) => {
    const product = new Product({
        _id:new mongoose.Types.ObjectId,
        ptitle : req.body.ptitle,
        price : req.body.price,
        categoryid: req.body.categoryid,
        companyid : req.body.companyid,
        sellerid : req.body.sellerid
    })
    product.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            NewProduct:result
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
router.put('/api/productDetails/:id', (req ,res) => {
    Product.findOneAndUpdate({_id:req.params.id},{
        $set:{      
            ptitle : req.body.ptitle,
            price : req.body.price,
            categoryid: req.body.categoryid,
            companyid : req.body.companyid,
            sellerid : req.body.sellerid
        }
    })
    .then(result=>{
        res.status(200).json({
            Message:'Product Update....',
            //Update_Product:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//DELETE REQUEST
router.delete("/api/productDetails/:id" , (req ,res) => {
    Product.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            Message:'Product Deleted....',
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