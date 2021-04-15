const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//cereat schema 
const ToDoSchema = new Schema ({
    
    todoTitle : {
        type: String,
        required: true
    },
    
         
});



module.exports = ToDo = mongoose.model('todos', ToDoSchema);