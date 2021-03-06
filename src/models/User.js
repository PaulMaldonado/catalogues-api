const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },

    password: {
        type: String,
        required: true,
        min: 6,
        minLength: 6
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);