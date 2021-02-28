const express = require('express');
const bcrypt = require('bcryptjs'); 
const router = express.Router();
const keys = require('../../config/keys');
const roles = require('../../config/role');

const jwt = require('jsonwebtoken');
const passport = require('passport');

// lodad moddles
const MalikUser = require('../../models/MalikUser');


//Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const { default: validator } = require('validator');  


//Load user model


// @route   GET api/user/test
// @decs    Test user route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: "malik user is working"}));

// @route   post api/user/register
// @decs    Register  user 
// @access  Public

router.post('/malikregister', (req, res) => {
    
    // check validation
    const {errors, isValid } = validateRegisterInput(req.body);
    
    if(isValid === false){
        
        return res.status(400).json(errors);
    }
    

    MalikUser.findOne({email: req.body.email})
    .then(malikuser => {
        if(malikuser){
            errors.email = "email already exist";
            return res.status(400).json(errors);
        } else {
            console.log("befor new malikuser")
            const newMalikUser = new MalikUser({
                name: req.body.name,
                email: req.body.email,
                
                password: req.body.password,
                
                
            });
            console.log("after new user")
            bcrypt.genSalt(10,(err, salt) =>{
                bcrypt.hash(newMalikUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newMalikUser.password = hash;
                    newMalikUser.save()
                    .then(malikuser => res.json(malikuser))
                    .catch(err => console.log(err));
                })
            })
        }
    })
})

// @route   post api/publicuser/login
// @decs    publicuser login / Return jwt token 
// @access  Public

router.post('/maliklogin', (req, res) => {

    // check validation
    const {errors, isValid } = validateLoginInput(req.body);
    
    if(isValid === false){
        
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
   
    
    console.log(email);
    console.log(password);

    //find user by email
    MalikUser.findOne({email})
    .then(malikuser => {
       
        if(!malikuser){
            errors.email = "User not Found!"
            return res.status(400).json(errors);
        }

        // check password
        bcrypt.compare(password, malikuser.password)
        .then( ismatch => {
            if(ismatch){
                //user match
                const payload = {
                    id: malikuser.id,
                    name: malikuser.name,
                    
                    email: malikuser.email,
                    
                   
                } 
                // sign token 
                jwt.sign(
                    payload,
                    keys.secretOrKey, 
                    { expiresIn: 3600},
                    (err, token) =>{
                        res.json({
                            sucess: true,
                            token: 'bearer ' + token
                        });
                    });

            } else {
                errors.password = "Password is incorrect"
                return res.status(400).json(errors);
            }
            
        })
        
    })
});





module.exports = router;