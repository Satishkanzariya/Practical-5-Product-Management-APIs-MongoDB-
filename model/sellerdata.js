const mongoose = require('mongoose');

const sellerschema = new mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        name : String,
        productid: [String]
        
})

module.exports = mongoose.model('Seller',sellerschema);