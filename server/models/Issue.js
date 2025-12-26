const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },

    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },

    image: {
      type: String, // user uploaded image
    },

    resolvedImage: {
      type: String, // admin uploaded proof
    },

    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
