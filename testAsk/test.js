var express = require('express');
var app = express();
app.get('/',function (req,res) {
    req.send('Hellow world');
});
app.listen(3000,function () {
    console.log('Example app listening on port 3000!')
});