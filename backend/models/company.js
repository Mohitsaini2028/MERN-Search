const mongoose = require('mongoose');

// Company Schema
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
   
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
    
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company; 

