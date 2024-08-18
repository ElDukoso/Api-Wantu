const { model, Schema } = require('mongoose');

const CarSchema = Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    countryOfOrigin: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

CarSchema.index({ brand: 1, model: 1, year: 1 }, { unique: true });

module.exports = model('Car', CarSchema);
