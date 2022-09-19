const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    }
})

const songSchema = new mongoose.Schema({
    notes: [noteSchema]
})

module.export = mongoose.model('Songs', songSchema)