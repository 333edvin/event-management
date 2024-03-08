const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
    brideName: {
        type: String,
        required: true
    },
    groomName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    weddingDate: {
        type: Date,
        required: true,
    },
    weddingVenue: {
        type: String
    },
    numberOfGuests: {
        type: Number
    },
    weddingStyle: {
        type: String
    },
    servicesRequired: {
        type: [String],
        required: true
    },
    additionalPreferences: {
        type: String
    },
    termsAgreed: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Wedding = mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;
