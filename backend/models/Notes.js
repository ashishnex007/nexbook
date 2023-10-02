const mongoose = require('mongoose');

// Define the User schema
const notesSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default:Date.now,
  },
});

// Create a User model from the schema
const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;