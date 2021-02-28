const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const MalikUserSchema = new Schema ({
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
   
    
    
     
});

module.exports = MalikUser = mongoose.model('malikusers', MalikUserSchema);

