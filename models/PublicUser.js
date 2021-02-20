const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const PublicUserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
   
    
    role:{
        type: String,
        required: true
    }
     
});

module.exports = PublicUser = mongoose.model('publicusers', PublicUserSchema);

