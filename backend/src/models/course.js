const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    school: String,
    dept: String,
    num: String,
    title: String,
    unit: String,
    level: String,
    desc: String,
    prerequisite: String,
    restriction: String,
    sameAs: String,
    overlapsWith: String,
    concurrentWith: String,
    gradingOption: String,
    repeatability: String,
    corequisite: String,
    preOrCorequisite: String
}, {
    collection: 'course'
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;