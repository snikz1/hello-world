var crypto = require('crypto');

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }, password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address']
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
//schema.path('email').validate(function (email) {
//    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//    return emailRegex.test(email.text); // Assuming email has a text attribute
//}, 'The e-mail field cannot be empty.');
schema.plugin(passportLocalMongoose);

//schema.methods.encryptPassword = function (password) {
//    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
//};

//schema.virtual('password')
//    .set(function (password) {
//        this._plainPassword = password;
//        this.salt = Math.random() + '';
//        this.hashPassword = this.encryptPassword(password);
//    })
//    .get(function () {
//        return this._plainPassword;
//    });
schema.methods.checkPassword = function (password) {
    // return this.encryptPassword(password) === this.hashPassword;
    return this.password == password;
};

exports.User = mongoose.model('User', schema);
