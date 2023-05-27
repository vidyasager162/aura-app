const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/AuraDB");

const genreSchema = new mongoose.Schema({
  genre_name: String,
});

const authorSchema = new mongoose.Schema({
  author_name: String,
});

const publisherSchema = new mongoose.Schema({
  publisher_name: String,
});

const bookSchema = new mongoose.Schema({
  acc_id: String,
  book_name: String,
  author: String,
  publisher: String,
  genre: [String],
});

const Genres = mongoose.model("genre", genreSchema);
const Authors = mongoose.model("author", authorSchema);
const Publishers = mongoose.model("publisher", publisherSchema);
const Books = mongoose.model("book", bookSchema);

app.post("/add-book", (req, res) => {
  console.log(req.body);
  Books.countDocuments({}).then((count) => {
    console.log(count);
    var number = count + 1;
    Books.create({
      acc_id: "AR-" + number,
      book_name: req.body.book_name,
      author: req.body.author,
      publisher: req.body.publisher,
      genre: req.body.genre,
    }).then((success) => {
      if (success) {
        res.send({
          message: "success",
        });
        console.log("Successfully added the book");
      }
    });
  });
  Authors.findOne({ author_name: req.body.author }).then((authorFound) => {
    if (!authorFound) {
      Authors.create({ author_name: req.body.author });
    }
  });
  Publishers.findOne({ publisher_name: req.body.publisher }).then(
    (publisherFound) => {
      if (!publisherFound) {
        Publishers.create({ publisher_name: req.body.publisher });
      }
    }
  );
});

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
