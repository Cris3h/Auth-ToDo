require('dotenv').config();
const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.MONGO_URI);


module.exports = {
    User: conn.model('User', require('./UserSchema')),
    ToDo: conn.model('ToDo', require('./ToDoSchema'))
}

