const mongoose = require('mongoose');

// ONLY CALL THIS WHEN COURSES COLLECTION IS INITIALIZED
const { duplicateNecessaryCourses } = require('../scripts/duplicate-courses');


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', async () => {
    console.log('MongoDB database connection established successfully');
});

