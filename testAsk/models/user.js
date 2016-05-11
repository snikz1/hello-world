var crypto = require('crypto');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }, hashPassword: {
        type: String,
        required: true
    }, salt: {
        type: String
        // required: true
    }, created: {
        type: Date,
        default: Date.now()
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });
schema.methods.checkPassword = function (password) {
    // return this.encryptPassword(password) === this.hashPassword;
    return this.encryptPassword(password);
};
mongoose.connect('mongodb://localhost/test1');

exports.User = mongoose.model('User', schema);
