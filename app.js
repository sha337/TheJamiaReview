const express        = require("express"),
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
      seedDB         = require("./seed"),
      csv            = require('csvtojson');

//requiring routes
const commentRoutes = require("./routes/comments");
const postRoutes    = require("./routes/posts");
const authRoutes    = require("./routes/auth");

//connect datbase
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

const convert = csv()

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
app.get("/gallery", (req, res) => {
    res.render("gallery");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.use(commentRoutes);
app.use(postRoutes);
app.use(authRoutes);

app.listen(process.env.PORT||'3000', process.env.IP, ()=>{
    console.log("TJR server is running on port 3000");
});
