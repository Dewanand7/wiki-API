//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const req = require("express/lib/request");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

const articleSchema = {
  // create our schema
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema); // create our article model

// implement chainable route handlers with app.route:


app.get("/articles", function(req, res){
  Article.find(function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

app.post("/articles", function (req, res) {
  // our post request targets the /articles route

  const newArticle = new Article({
    // creates a new article using the data submitted through the post request
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
});

app.delete("/articles", function(req,res){
Article.deleteMany(function(err){
  if(!err){
    res.send("Successfully deleted all article.");

  }else{
    res.send(err);
  }
});
});

app.listen(3000, function () {
  console.log("http://localhost:3000");
});