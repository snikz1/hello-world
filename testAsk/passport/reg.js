// var passport =require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var mongoose = require('mongoose');
// var User = require('./models').User;
//
// passport.use('signup', new LocalStrategy({
//         passReqToCallback : true
//     },
//     function(req, username, password, done) {
//         findOrCreateUser = function(){
//             // find a user in Mongo with provided username
//             User.findOne({'username':username},function(err, user) {
//                 // In case of any error return
//                 if (err){
//                     console.log('Error in SignUp: '+err);
//                     return done(err);
//                 }
//                 // already exists
//                 if (user) {
//                     console.log('User already exists');
//                     return done(null, false,
//                         req.flash('message','User Already Exists'));
//                 } else {
//                     // if there is no user with that email
//                     // create the user
//                     var user = new User({
//
//                     });
//                     // set the user's local credentials
//
//
//                     // save the user
//                     newUser.save(function(err) {
//                         if (err){
//                             console.log('Error in Saving user: '+err);
//                             throw err;
//                         }
//                         console.log('User Registration succesful');
//                         return done(null, newUser);
//                     });
//                 }
//             });
//         };
//
//         // Delay the execution of findOrCreateUser and execute
//         // the method in the next tick of the event loop
//         process.nextTick(findOrCreateUser);
//     });
// );