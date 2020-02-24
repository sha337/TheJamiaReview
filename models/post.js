var mongoose = require("mongoose");

//schema setup
var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    author: String,
    type: String,
    created: {type: Date, default: Date.now},
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Post", postSchema);