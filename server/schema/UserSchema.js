const { Schema} = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    hashed_password: String,
    todos: [{ type: Schema.Types.ObjectId, ref: "ToDo" }]
 })
UserSchema.index({email: 1}, {unique: true})

 
module.exports =  UserSchema