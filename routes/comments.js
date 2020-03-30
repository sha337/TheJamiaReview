var express  = require("express");
var router   = express.Router();
var Post     = require("../models/post");
var Comment  = require("../models/comment");

//SHOW ADD COMMENT PAGE - Add comment to post
// router.get("/posts/:id/comments/new", isLoggedIn, function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         if(err){
//             console.log(err);
//         }else{
//             res.render("comments/new", {post: post});
//         }
//     });
// });


//Post comment and redirects back to show page
router.post("/posts/:id/comments", isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.fullname = req.user.fullname;
                    //save comment
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/posts/" + post._id);
                }
            });
        }
    });
});

//delete comment
router.delete("/posts/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndRemove({_id:req.params.comment_id}, function(err){
        if(err){
            console.log(err);
            res.redirect("/posts/"+req.params.id);
        }else{
            res.redirect("/posts/"+req.params.id);
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("back");
}

module.exports = router;