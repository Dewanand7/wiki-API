//jshint esversion:6.1

const express = require("express"); //express k lye
const bodyParser = require("body-parser"); //body ke lye
const ejs = require("ejs");
const mongoose = require('mongoose'); //mongo database k lye
const req = require("express/lib/request");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//mongoose connect k lye
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

const articleSchema = {
  // create our schema
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema); // create our article model


// sabko chain main implement kiya route handlers with app.route: ke liya
app.route("/articles").get( function (req, res) {
  Article.find(function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
}).post( function (req, res) {
  // our post request targets the /articles route

  const newArticle = new Article({
    // creates a new article using the data submitted through the post request
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function (err) {
    if (!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
}).delete( function (req, res) {
  Article.deleteMany(function (err) {
    if (!err) {
      res.send("Successfully deleted all article.");

    } else {
      res.send(err);
    }
  });
});
 

//GET Method k lye please check also postman ki GET hai ki nai
app.get("/articles",);

//POST method k lye database main sb save ho jye ga
app.post("/articles",);


//delete karne k lye DELETE method
app.delete("/articles",);

app.listen(3000, function () {
  console.log("http://localhost:3000");
});