const mongoose = require("mongoose");


const statusSchema = new mongoose.Schema({
   statusType: {
    type: String
  },
  owner :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;