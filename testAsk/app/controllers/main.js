
exports.index = function(req,res){
    console.log(req.user);
    if(req.user){
    res.render('homePage');
    }
    else res.redirect('logIn');
};

exports.inside = function(req,res){
    res.render('inside');
};
