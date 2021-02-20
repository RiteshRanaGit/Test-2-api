const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const passport = require('passport');
const PublicUser = mongoose.model('publicusers');
const Admin = mongoose.model('admin');

const keys = require('../config/keys');
const roles = require('./role');

const opts ={};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (Jwt_payload, done) => {
        if(Jwt_payload.role === roles.public){
            PublicUser.findById(Jwt_payload.id)
            .then(publicuser => {
                if(publicuser){
                    return done(null, publicuser);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
        } 

        else if(Jwt_payload.role === roles.admin){
            Admin.findById(Jwt_payload.id)
            .then(admin => {
                if(admin){
                    return done(null, admin);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
        }
    }))
}

