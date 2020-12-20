const mongoose = require('mongoose');
const Course = require('../models/course');

// functions to help find courses to duplicate
const findCoursesByNum = async (number) => {
    return await Course.find({
        num: { $regex: number, $options: "i" }
    });
}

const findCoursesByTitleSubStr = async (title) => {
    return await Course.find({
        title: { $regex: title, $options: "i"}
    })
}

// duplicate course documents with new ObjectId 
const duplicateCourses = async (courses, numDup) => {
    for (let course of courses) {
        console.log(`duplicating ${course.dept} ${course.num}: ${course.title}...`);
        for (let i = 0; i < numDup; i++) {
            course._id = mongoose.Types.ObjectId();
            course.isNew = true;
            await course.save()
        }
    }
}


module.exports = {
    findCoursesByNum,
    findCoursesByTitleSubStr,
    duplicateCourses,
}