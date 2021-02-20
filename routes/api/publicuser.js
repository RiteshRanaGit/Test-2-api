const express = require('express');
const bcrypt = require('bcryptjs'); 
const router = express.Router();
const keys = require('../../config/keys');
const roles = require('../../config/role');

const jwt = require('jsonwebtoken');
const passport = require('passport');

// lodad moddles
const PublicUser = require('../../models/PublicUser');


//Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const { default: validator } = require('validator');  


//Load user model


// @route   GET api/user/test
// @decs    Test user route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: " user is working"}));

// @route   post api/user/register
// @decs    Register  user 
// @access  Public

router.post('/register', (req, res) => {
    
    // check validation
    const {errors, isValid } = validateRegisterInput(req.body);
    
    if(isValid === false){
        
        return res.status(400).json(errors);
    }
    

    PublicUser.findOne({email: req.body.email})
    .then(publicuser => {
        if(publicuser){
            errors.email = "email already exist";
            return res.status(400).json(errors);
        } else {
            console.log("befor new publicuser")
            const newPublicUser = new PublicUser({
                name: req.body.name,
                email: req.body.email,
                
                password: req.body.password,
                
                role: roles.public
            });
            console.log("after new user")
            bcrypt.genSalt(10,(err, salt) =>{
                bcrypt.hash(newPublicUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newPublicUser.password = hash;
                    newPublicUser.save()
                    .then(publicuser => res.json(publicuser))
                    .catch(err => console.log(err));
                })
            })
        }
    })
})

// @route   post api/publicuser/login
// @decs    publicuser login / Return jwt token 
// @access  Public

router.post('/login', (req, res) => {

    // check validation
    const {errors, isValid } = validateLoginInput(req.body);
    
    if(isValid === false){
        
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    const role = roles.public;
    
    console.log(email);
    console.log(password);

    //find user by email
    PublicUser.findOne({email})
    .then(publicuser => {
       
        if(!publicuser){
            errors.email = "User not Found!"
            return res.status(400).json(errors);
        }

        // check password
        bcrypt.compare(password, publicuser.password)
        .then( ismatch => {
            if(ismatch){
                //user match
                const payload = {
                    id: publicuser.id,
                    name: publicuser.name,
                    
                    email: publicuser.email,
                    
                    role: publicuser.role
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