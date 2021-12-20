const mongoose = require('mongoose');

const companyschema = new mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        name : String,
        productid: [String],
        
})

module.exports = mongoose.model('Company',companyschema);