const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
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