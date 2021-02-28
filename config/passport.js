const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const passport = require('passport');
// const MalikUser = mongoose.model('malikuser');
const MalikUser = require('../models/MalikUser');
//const Admin = mongoose.model('admin');

const keys = require('../config/keys');
//const roles = require('./role');

const opts ={};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (Jwt_payload, done) => {
        
            MalikUser.findById(Jwt_payload.id)
            .then(malikUser => {
                if(malikUser){
                    return done(null, malikUser);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
       

        
    }))
}

