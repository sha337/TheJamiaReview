//Home page - show all posts
var express = require("express");
var router  = express.Router();
var Post    = require("../models/post");
const mongoosePaginate = require('mongoose-paginate');

router.get("/", (req, res) => {
    res.redirect("/index");
})

//index - Show recent posts
router.get("/index", (req, res) => {
    Post.find({}).sort({_id: -1}).exec((err, allPosts) => {
        if(err){
            console.log(err);
        }else{
            res.render("posts/index", {Post: allPosts});
        }
    });
});


// show all posts
router.get("/allPosts", (req, res) => {
    Post.paginate({},{
        sort: {_id: -1},
        page: req.query.page || 1,
        limit: 7
    }, (err, allPosts) => {
        if(err){
            console.log(err);
        }else{
            allPosts.page = Number(allPosts.page);
            res.render("posts/allposts", {Post: allPosts});
        }
    });
    
});

//Display Submission Page
router.get("/posts/new", isLoggedIn, (req, res) => {
    res.render("posts/new");
});

//CREATE - Add new post to the database and redirect index page
router.post("/index", isLoggedIn, (req, res) => {
    //create a new post and add to DB
    Post.create(req.body.newpost, (err, newPost) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/posts/index");
        }
    });
});

//Show - shows more info about a post
router.get("/posts/:id", (req, res) => {
    Post.findById(req.params.id).populate("comments").exec((err, foundPost) => { 
        if(err){
            console.log(err);
        }else{
            res.render("posts/show", {Post: foundPost});
        }
    });
});

//EDIT - Show edit page
router.get("/posts/:id/edit", (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if(err){
            console.log(err);
        }else{
            res.render("posts/edit", {Post: foundPost});
        }
    });
});

//EDIT - add changes to DB and show post
router.put("/posts/:id", (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body.newpost, (err, updatedPost) => {
        if(err){
            console.log(err);
            res.redirect("/posts/"+updatedPost._id);
        }else{
            res.redirect("/posts/"+updatedPost._id);
        }
    });
});

router.delete("/posts/:id", isLoggedIn, (req, res) => {
    Post.findOneAndRemove({_id:req.params.id}, (err) => {
        if(err){
            console.log(err);
            res.redirect("posts/index");
        }else{
            res.redirect("posts/index");
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