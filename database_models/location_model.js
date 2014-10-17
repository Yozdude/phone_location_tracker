var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

// Represents a location on Earth at a given time
var LocationSchema = new Schema({
    timestamp: { type: Date, default: Date.now, required: true, index: { unique: true } },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    accuracy: { type: Number, required: false }
});

module.exports = Mongoose.model('Location', LocationSchema);