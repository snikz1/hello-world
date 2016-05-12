var mongoose = require('mongoose');
var User = require('../models/user').User;

exports.vkontakte = function(req,res){

    res.redirect('/');
};
exports.login = function(req,res){
    console.log(req.session);
    res.render('logIn',{ message: req.flash('message') });
};

exports.signup = function(req,res){
    res.render('signup',{ message: req.flash('message') });
};

exports.registration = function (req, res) {

    console.log(req.body);

    var user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    User.findOne({username: req.body.username}, function (err, user) {
        // if there are any errors, return the error
        if (err)
            return err;

        if (user) {
            res.redirect('signup');
            return req.flash('message','Invalid username or password');
        } else {

            user.save(function (err) {
                if (err) return console.log(err);
            });

            // set the user's local credentials

            // save the user
        }
        });


    user.save(function (err) {
        if (err) return console.log(err);
    });
    console.log(req.body);
    res.redirect('inside');

};
