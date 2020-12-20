const mongoose = require('mongoose');
const Course = require('../models/course');
const Plan = require('../models/plan');

const fetchCompletePlan = async (degreePlan) => {

    // extract all _ids to make one request to DB
    let courseIds = [];

    for (const yearData of degreePlan) {
        for (const courses of Object.values(yearData)) {
            for (const course of courses) {
                courseIds.push(course);
            }
        }
    }

    // fetch all courses from DB
    const fetchedCourses = {}
    const courses = await Course.find({ '_id': { $in: courseIds } })
    courses.forEach(course => fetchedCourses[course._id] = course);

    // map the planner (only with courseId) with full course information
    for (const yearData of degreePlan) {
        for (const [term, courses] of Object.entries(yearData)) {
            yearData[term] = courses.map((courseId) => fetchedCourses[courseId]);
        }
    }

    return degreePlan;
};

module.exports = {
    fetchCompletePlan
}