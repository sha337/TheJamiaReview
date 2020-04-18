var express        = require("express"),
    app            = express(),
    bodyparser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    flash          = require('connect-flash'),
    Comment        = require("./models/comment"),
    Post           = require("./models/post"),
    User           = require("./models/user"),
    seedDB         = require("./seed");

//requiring routes
var commentRoutes = require("./routes/comments");
var postRoutes    = require("./routes/posts");
var authRoutes    = require("./routes/auth");

mongoose.connect("mongodb+srv://Ali:12345@shabz-1fu7s.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect("mongodb://localhost:27017/TJR", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();
// Post.create(
//     {
//     title: "Blog post",  
//     image: "https://image.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
//     author: "Abhay",
//     type: "featured"
// });

//passport configuration
app.use(require("express-session")({
    secret: "Faisal lodu",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res ,next){
    res.locals.currentUser = req.user;
    res.locals.message = req.flash("error");
    next();
});

//Remaining routes
app.get("/featured", function(req, res){
    Post.find({type: "featured"}, function(err, allPosts){
        if(err){
            console.log(err);
        }else{
            res.render("featured", {Post: allPosts});
        }
    });
    
});

app.get("/gallery", function(req, res){
    res.render("gallery");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.use(commentRoutes);
app.use(postRoutes);
app.use(authRoutes);

app.listen(process.env.PORT||'3000', process.env.IP, function(){
    console.log("TJR server is running on port 3000");
});
