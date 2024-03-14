const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    eventImage: {
        type: String,
        default: ''
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    online: {
        type: Boolean,
        required: true,
    },
    link: {
        type: String,
        required: function() { return this.online; } 
    },
    location: {
        type: String,
        required: function() { return !this.online; }
    },
    datetime: {
        type: Date,
        required: true,
    },
    availableSlots: {
        type: Number,
        required: true,
        min: 1
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
