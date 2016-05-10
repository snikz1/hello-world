
var mongoose = require('mongoose');
var User = require('./models/user').User;

var user = new User({
    username:"Tester4",
    password: "Secret"
});

user.save(function (err,user,affected) {
    if(err) return console.log(err);
    User.findOne({username:'Tester4'} ,function (err,tester) {
      console.log(tester);
    });
});