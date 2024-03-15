const { Schema} = require("mongoose");

const ToDoSchema = new Schema({
    user_email: String,
    title: String,
    progress: Number,
    date: String,
    users: [{ type: Schema.Types.ObjectId, ref: "User" }]
 })

module.exports =  ToDoSchema