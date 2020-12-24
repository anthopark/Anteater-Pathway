const mongoose = require('mongoose');

// ONLY RUN THIS WHEN COURSES COLLECTION IS INITIALIZED
const { duplicateNecessaryCourses } = require('../scripts/db-scripts');
// RUN AFTER UPDATING PREVQUARTERS ARE UPDATED, TO REMOVE "prevQuarter" FROM RESEARCH CREDIT COURSES
const { removeFieldFromCourses } = require('../scripts/db-scripts');


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

