
const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: String,
    email: String,
    country: String
}, {
    timestamp: true
});
const User =  model('User', UserSchema)

module.exports = { User }
