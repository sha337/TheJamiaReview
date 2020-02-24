//Home page - show all posts
var express = require("express");
var router  = express.Router();
var Post    = require("../models/post");

router.get("/", function(req, res){
    res.redirect("/posts");
})

//index - Show all posts
router.get("/posts", function(req, res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        }else{
            res.render("posts/index", {Post: allPosts});
        }
    });
    
});

//Display Submission Page
router.get("/posts/new", isLoggedIn, function(req, res){
    res.render("posts/new");
});

//CREATE - Add new post to the database and redirect index page
router.post("/posts", isLoggedIn, function(req, res){
    //create a new post and add to DB
    Post.create(req.body.newpost, function(err, newPost){
        if(err){
            console.log(err);
        }else{
            res.redirect("/posts");
        }
    });
});

//Show - shows more info about a post
router.get("/posts/:id", function(req, res){
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){ 
        if(err){
            console.log(err);
        }else{
            res.render("posts/show", {Post: foundPost});
        }
    });
});

//EDIT - Show edit page
router.get("/posts/:id/edit", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
        }else{
            res.render("posts/edit", {Post: foundPost});
        }
    });
});

//EDIT - add changes to DB and show post
router.put("/posts/:id", function(req, res){
    Post.findByIdAndUpdate(req.params.id, req.body.newpost, function(err, updatedPost){
        if(err){
            console.log(err);
            res.redirect("/posts/"+updatedPost._id);
        }else{
            res.redirect("/posts/"+updatedPost._id);
        }
    });
});

router.delete("/posts/:id", isLoggedIn, function(req, res){
    Post.findOneAndRemove({_id:req.params.id}, function(err){
        if(err){
            console.log(err);
            res.redirect("/posts");
        }else{
            res.redirect("/posts");
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;