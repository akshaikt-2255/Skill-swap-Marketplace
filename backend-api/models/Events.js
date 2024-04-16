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
    }],
    ratings: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true, min: 1, max: 5 }
    }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }});

eventSchema.virtual('averageRating').get(function() {
    if (this.ratings.length > 0) {
        const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
        return (sum / this.ratings.length).toFixed(2); // Keep two decimals
    }
    return 0;
});

module.exports = mongoose.model('Event', eventSchema);
