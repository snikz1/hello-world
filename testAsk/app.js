var express = require('express');
var cons = require('consolidate');
var app = express();
var mongoose = require('mongoose');


app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');





app.get('/login',function (req,res) {
    res.render('logIn');
});
app.get('/',function (req,res) {
    res.render('homePage');
});
app.get('/signin',function (req,res) {
    res.render('SignIn');
});
app.get('/inside',function (req,res) {
    res.render('inside');
});
app.post('/singin',function (req,res) {
    console.log(req.body);
    res.redirect('inside')
});

app.post('/login',function (req,res) {
    console.log(req.body);
    res.redirect('inside');
});
app.listen(8080);