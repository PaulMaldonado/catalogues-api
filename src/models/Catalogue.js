const mongoose = require('mongoose');
const { Schema } = mongoose;

const catalogueSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    mark: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Catalogue', catalogueSchema);