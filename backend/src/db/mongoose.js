const mongoose = require('mongoose');


const {
    // ONLY RUN THIS WHEN COURSES COLLECTION IS INITIALIZED
    duplicateNecessaryCourses,
    // ONLY RUN AFTER UPDATING "prevQuarters", TO REMOVE "prevQuarter" FROM RESEARCH CREDIT COURSES
    removeFieldFromCourses,
    duplicateSpecificCourse } = require('../scripts/db-scripts');


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

