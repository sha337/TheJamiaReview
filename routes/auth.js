var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User    = require("../models/user");


//================
//AUTH ROUTES
//================

//Handeling SignUp Logic
router.post("/signup", function(req, res){
    var newUser = new User({username: req.body.username, fullname: req.body.fullname});
    User.register(newUser , req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("posts");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("back");
        });
    });
});

//handeling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "back",
        failureRedirect: "/login"
    }), function(req, res){
    
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("back");
});

module.exports = router;