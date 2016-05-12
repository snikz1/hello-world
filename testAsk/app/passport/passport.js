var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    VKontakteStrategy = require('passport-vkontakte').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user').User;
// passport.use(new VKontakteStrategy({
//         clientID: VKONTAKTE_APP_ID, // VK.com docs call it 'API ID'
//         clientSecret: VKONTAKTE_APP_SECRET,
//         callbackURL: "http://localhost:3000/auth/vkontakte/callback"
//     },
//     function (accessToken, refreshToken, profile, done) {
//         User.findOrCreate({vkontakteId: profile.id}, function (err, user) {
//             return done(err, user);
//         });
//     }
// ));
var flash = require('connect-flash');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        console.log(err,user)
        done(err, user);
    });
});
passport.use('local-login',new LocalStrategy(
    {
        passReqToCallback : true
    },

    function (req,username, password, done) {
    console.log(username);

        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user||!user.checkPassword(password)) {
                return done(null, false ,req.flash('message','Invalid username or password'));
            }
            //if (!user.checkPassword(password)) {
            //     return done(null, false, { message: 'Incorrect password.' });
            //}
            return done(null, user);
        });
    }
));
passport.use('local-signup',new LocalStrategy({
        passReqToCallback : true
},
    function (req, username, password, done) {
        console.log(req.body);
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa');
        console.log(username,password,req.body.email);
        User.findOne({username: username}, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            if (user) {
                return done(null, false ,req.flash('message','Invalid username or password'));
            } else {
                
                var newUser = new User({
                        username: username,
                        password: password,
                        email: req.body.email
                    }
                );

                // set the user's local credentials

                // save the user
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));

module.exports = passport;
