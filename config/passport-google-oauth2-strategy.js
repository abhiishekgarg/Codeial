const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy(
    {
        clientID: "390712674525-ag0mvt50ocfgsq3acc02a2cvkagamepj.apps.googleusercontent.com",
        clientSecret: "1a9D-l4x5Qrnmg9qhqwxKH8Q",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done)
    {
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user)
        {
            if(err)
            {
                console.log('Error in google strategy-passport', err);
                return;
            }  

            console.log(profile);
            if(user)
            {
                // if found, set this user as req.user 
                return done(null, user);
            }
            else
            {
                // if not found, create the user and set it as req.user
                User.create
                ({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes[20].toString('hex')
                }, function(err, user)
                {
                    if(err)
                    {
                        console.log('Error in creating user google strategy-passport', err);
                        return;
                    }  
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport
 