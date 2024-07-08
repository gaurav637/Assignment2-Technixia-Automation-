import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
