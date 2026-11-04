const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
   Rating: {
    type: Number
  },
  reviewText: {
    type: String,
  },
  owner :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;