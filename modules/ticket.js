var mongoose = require("mongoose");
var moment = require("moment");

// Ticket

var noteSchema = mongoose.Schema({
  notetext: {
    type: String,
    required: true
  },
  notedate: {
    type: Date,
    default: Date.now
  },
  noteauthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

noteSchema.virtual("notedateformated").get(function() {
  return moment(this.notedate).format("DD.MM.YY hh:mm");
});

var ticketSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // has to have the same name as the imported model in route.js
  },
  description: {
    type: String,
    required: true
  },
  createddate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ["new", "open", "postponed", "closed", "analyzed"],
    default: "new"
  },

  notes: [noteSchema],

  assignedto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

ticketSchema.pre("findOne", function() {
  this.populate("assignedto", "name")
    .populate("author", "name")
    .populate("notes.noteauthor", "name");
});

ticketSchema.pre("find", function() {
  this.populate("assignedto", "name").populate("author", "name");
});

ticketSchema.post("findOneAndUpdate", function() {
  console.log("postfindOneAndUpdate executed");
  this.populate("assignedto", "name").populate("author", "name");
});

var Ticket = (module.exports = mongoose.model("Ticket", ticketSchema));
