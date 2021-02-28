const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//cereat schema 
const FormSchema = new Schema ({
    
    name : {
        type: String,
        required: true
    },
    date: { 
        type: Date,
        required: true,
        
     },
    organization: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: true
    }     
});



module.exports = Form = mongoose.model('form', FormSchema);