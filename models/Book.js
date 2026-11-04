const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
  },
  Cover: {
    type: String,
  },
  Type: {
    type: String
  },
  Author: {
    type: String
  },
  StatusRightnow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status'
  },
  Summary: {
    type: String
  },
  Review :{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Review'
  }
}, {timestamps: true});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;