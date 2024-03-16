const mongoose  = require('mongoose');
const Userschema = new mongoose.Schema({
    name:{ type : String},
    gmail : { type : String },
    phone : { type : String } 
})

module.exports = mongoose.model('Users' , Userschema); 