var mongoose = require("mongoose"),
    Post    = require("./models/post"),
    Comment = require("./models/comment"),
    User    = require("./models/user");

var data = [
    {
        title: "Recent shooting events in Delhi – A report", 
        image: "https://tjrexpress.files.wordpress.com/2020/02/use-this-wp-template.png?w=560&h=312&crop=1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author: "Abhay",
        type: "featured"
    },
    {
        title: "Dr. Zakir Hussain Mausoleum and Museum, Jamia Nagar.", 
        image: "https://tjrexpress.files.wordpress.com/2020/02/use-this-wp-template-2.png?w=560&h=312&crop=1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author: "Abhay",
        type: "featured"
    },
    {
        title: "Union Budget 2020: A Case of Three Themes", 
        image: "https://tjrexpress.files.wordpress.com/2020/02/20200209_133523_0000.png?w=880&h=312&crop=1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author: "Abhay",
        type: "normal"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Post.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed posts!");
         Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            // User.remove({}, function(err){
            //     if(err){
            //         console.log(err);
            //     }else{
            //         console.log("users deleted");
            //     }

            // })
            // add a few campgrounds
            data.forEach(function(seed){
                Post.create(seed, function(err, post){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a Post");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    post.comments.push(comment);
                                    post.save();
                                    console.log("Created new comment");
                                }
                            });
                        
                    }
                });
            });
            
        });
 }); 
    //add a few comments
}
 
module.exports = seedDB;