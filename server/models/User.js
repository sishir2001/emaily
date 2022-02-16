// collection in mongoDB
// ? model classes for mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose;

// creating a schema for the records in a mongoDB collection
//? passing in an object that defines what all can be stored inside a record of a collection
const userSchema = new Schema({
    googleId: String,
});

mongoose.model("users", userSchema); // users is the name of the collection
