const express = require('express');
const bcrypt = require('bcryptjs'); 
const router = express.Router();
const keys = require('../../config/keys');
const roles = require('../../config/role');

const jwt = require('jsonwebtoken');
const passport = require('passport');

// lodad moddles
const Adimn = require('../../models/Admin');
// const ClassRoom = require('../../models/ClassRoom');
// const Subject = require('../../models/Subject');
// const ClassNotice = require('../../models/ClassNotice');

//Load Input validation
const validateRegisterInputAdmin = require('../../validation/admin/admin');
const validateLoginInput = require('../../validation/login');
const { default: validator } = require('validator');  
const { admin } = require('../../config/role');


//Load user model


// @route   GET api/department/test
// @decs    Test user route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: " admin is working"}));

// @route   post api/admin/register
// @decs    Register  admin 
// @access  private

router.post('/register', (req, res) => {
    
    // check validation
    const {errors, isValid } = validateRegisterInputAdmin(req.body);
    console.log(isValid, "isvalid");
    console.log(errors, "errors");
    
    if(isValid === false){
        
        return res.status(400).json(errors);
    }
    

    Admin.findOne({email: req.body.email})
    .then(admin => {
        if(admin){
            errors.email = "email already exist";
            return res.status(400).json(errors);
        } else {
            console.log("befor new user")
            const newAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: roles.admin
            });
            console.log("after new user")
            bcrypt.genSalt(10,(err, salt) =>{
                bcrypt.hash(newAdmin.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newAdmin.password = hash;
                    newAdmin.save()
                    .then(admin => res.json(admin))
                    .catch(err => console.log(err));
                })
            })
        }
    })
})

// @route   post api/admin/login
// @decs    admin login / Return jwt token 
// @access  Public

router.post('/login', (req, res) => {

    // check validation
    const {errors, isValid } = validateLoginInput(req.body);
    
    if(isValid === false){
        
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    const role = roles.admin;
    


    //find user by email
    Admin.findOne({email})
    .then(admin => {
        // console.log(user);
        if(!admin){
            errors.email = "admin Id not Found!"
            return res.status(400).json(errors);
        }

        // check password
        bcrypt.compare(password, admin.password)
        .then( ismatch => {
            if(ismatch){
                //user match
                const payload = {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,       
                    role : admin.role
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