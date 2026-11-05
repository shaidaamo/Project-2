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
     type: String
  },
  Summary: {
    type: String
  },
  Reviews :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;