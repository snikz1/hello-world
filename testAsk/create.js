
var mongoose = require('mongoose');
var User = require('./models/user').User;

// var user = new User({
//     username:"Tester5",
//     password: "Secret"
// });

// user.save(function (err,user,affected) {
//     if(err) return console.log(err);
//     User.findOne({username:'Tester5'} ,function (err,tester) {
//       console.log(tester);
//     });
// });

User.findOne({username:'Semen'} ,function (err,tester) {
    console.log(tester);
    if(tester===null){

        console.log("Такого нету");
    }
});


///home/well/work/nikita_test/testAsk/node_modules/mongoose/node_modules/mongodb/lib/server.js:242