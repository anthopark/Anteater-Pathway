const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 20,
    },
    degreePlan: [],
    customUnits: {}
}, {
    collection: 'plans'
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;