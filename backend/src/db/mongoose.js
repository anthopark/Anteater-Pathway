const mongoose = require('mongoose');

// ONLY CALL THIS WHEN COURSES COLLECTION IS INITIALIZED
const { duplicateNecessaryCourses } = require('../scripts/duplicate-courses');


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

