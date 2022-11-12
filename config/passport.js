const passport = require('passport');

const User = require('../models/user');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(
    new GoogleStrategy(

//Configuration Object    

        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },

//Function to verify the callback

        function(accessToken, refreshToken, profile,cb) {

//A user has logged in with Oauth 

            User.findOne({ googleId: profile.id }).then(async function(user){
                if(user) return cb(null, user);
                try{
                    user = await User.create({
                        name: profile.displayName,
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                    });
                    return cb(null, user);
                } catch (err) {
                    return cb(err);
                }
            });
        }
    )
);



passport.serializeUser(function (user, cb){
    cb(null, user.id);
});

passport.deserializeUser(function (userId, cb) {
    User.findById(userId).then( function (user) {
        cb(null, user);
    });
});




