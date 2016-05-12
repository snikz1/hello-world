var auth = require('../controllers/auth');
var flash = require('connect-flash');
module.exports = function (app, passport) {
    app.get('/auth/vkontakte/callback',
        passport.authenticate('vkontakte', {failureRedirect: '/login'}),
        auth.vkontakte);
    app.get('/logout', auth.login);
    app.get('/login', auth.login);
    app.get('/signup', auth.signup);
    //app.post('/signup',auth.registration);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: 'Invalid username or password.'
    }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
    }));
};
