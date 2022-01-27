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
app.route("/articles")

//(.)ka matlab hota hai chain method express ka docs dk lo. better understanding
//GET method ke liye 

.get( function (req, res) {
  Article.find(function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

//POST METHOD KE LIYE
.post( function (req, res) {
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
})

//DELETE method k liye 
.delete( function (req, res) {
  Article.deleteMany(function (err) {
    if (!err) {
      res.send("Successfully deleted all article.");

    } else {
      res.send(err);
    }
  });
})

app.listen(3000, function () {
  console.log("http://localhost:3000");
});