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
    degreePlan: [
        {
            schoolYear: String,
            terms: [
                [ 
                    {
                        id: String,
                        dept: String,
                        num: String,
                        unit: String,
                        title: String,
                    }
                ]
            ]
        }
    ]
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;