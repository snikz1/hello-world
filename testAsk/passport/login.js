var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

module.exports = passport.use(new LocalStrategy(
    function(name, password, done) {
        User.findOne({ username: name }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));