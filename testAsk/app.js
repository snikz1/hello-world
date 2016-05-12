var express = require('express');
var cons = require('consolidate');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var flash=require("connect-flash");
var swig = require('swig');
app.use(flash());

mongoose.connect('mongodb://localhost/test1');
var passport = require('./app/passport/passport');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session());



require('./app/routes/auth')(app, passport);
require('./app/routes/main')(app);

app.listen(8080);