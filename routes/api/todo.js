const express = require('express'); 
const router = express.Router();

const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');
//const passport = require('passport');



const ToDo = require('../../models/ToDo');


// @route   GET api/profile/test
// @decs    Test profile route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: " form is working"}));

// @route   GET api/calsroom
// @decs    Get a class
// @access  public

router.get('/all', (req, res) => {
    const errors = {};
  
            ToDo
            .find({
            })           
            .then(todo =>{
            if(!todo){
                
                errors.form = "todo is not exist";
                
                return res.status(400).json(errors);
            } 
            
            return res.status(200).json(todo);
                
            
        }).catch(err => console.log(err));
   
});



// @route   post api/calsroom
// @decs    create a class
// @access  public

router.post('/', (req, res) => {
        const errors = {};
        
                const todoTitle = req.body.todoTitle;        

                ToDo
                .findOne({
                    todoTitle
                    
                })           
                .then(todo =>{
                    if(todo){
                        
                        errors.todo = "detail is already exist";
                        
                        return res.status(400).json(errors);
                    } 
                    console.log("befor new todo");
                    const newtodo = new ToDo({
                            todoTitle
                    });
                    newtodo.save()
                    .then(todo => res.json(todo))
                    .catch(err => console.log(err));
                    
                    console.log("after new todo");

            }).catch(err => console.log(err));

});








module.exports = router;