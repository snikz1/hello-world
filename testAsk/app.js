var express = require('express');
var cons = require('consolidate');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/user').User;
var bodyParser = require('body-parser');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // if (!user.checkPassword(password)) {
            //     return done(null, false, { message: 'Incorrect password.' });
            // }
            return done(null, user);
        });
    }
));

app.get('/login', function (req, res) {
    res.render('logIn');
});
app.get('/', function (req, res) {
    res.render('homePage');
});
app.get('/signin', function (req, res) {
    res.render('SignIn');
});
app.get('/inside', function (req, res) {
    res.render('inside');
});


app.post('/signin', function (req, res) {
    console.log(req.body);

    var user = new User({
        username: req.body.name,
        password: req.body.password
    });
    user.save(function (err, user, affected) {
        if (err) return console.log(err);
    });
    console.log(req.body);
    res.redirect('inside');

});

//
//
// app.post('/login', function (req, res) {
//     // var name = req.body.id.name;
//     // var password = req.body.password;
//     console.log(req.body);
//
//     var user = new User({
//         username: req.body.name,
//         password: req.body.password
//     });
//     User.findOne({username: user.username}, function (err, tester) {
//         console.log(tester);
//         // if (err) console.log(err);
//         if (tester === null) {
//             res.redirect('/');
//             console.log("Error");
//         }
//
//         else if (user.checkPassword(user.password) === tester.hashPassword) {
//             res.redirect('/inside');
//         }
//         else {
//             res.redirect('/');
//         }
//
//     });
//     console.log(req.body);
//     // res.redirect('inside');
// });
app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false })
);


app.listen(8080);