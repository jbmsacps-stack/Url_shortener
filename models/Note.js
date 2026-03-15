const mongoose = require('mongoose');

// A "schema" describes the fields and their types
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,   // Cannot be empty
      trim: true,       // Removes extra spaces
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,   // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model so routes can use it
module.exports = mongoose.model('Note', noteSchema);