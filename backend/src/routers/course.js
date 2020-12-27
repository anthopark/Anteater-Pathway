const express = require('express');
const Course = require('../models/course');
const logRequest = require('../middleware/log');
const { StatusCodes } = require('http-status-codes');
const courseMetaData = require('../../data/course-metadata.json');

const router = new express.Router();


// endpoint for fetching course data by dept, level, and course number
router.get('/api/course/search', logRequest, async (req, res) => {
    const { dept, level, num } = req.query;

    console.log(dept, level, num);

    if (!dept in courseMetaData.allowedCourseDept) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: 'Not allowed course department query' });
    }

    if (level && (!dept in courseMetaData.allowedCourseDept)) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: 'Not allowed course level query' });
    }

    let courses = [];

    try {
        if (!level) {
            courses = await Course.find({
                dept, num: { $regex: num, $options: "i" }
            });
        } else if (level === 'Undergraduate') {
            courses = await Course.find({
                dept,
                $or: [{ level: 'Lower Division' }, { level: 'Upper Division' }],
                num: { $regex: num, $options: "i" }
            })
        } else if (level === 'Other') {
            courses = await Course.find({
                dept,
                level: {
                    $nin: ['Lower Division', 'Upper Division', 'Undergraduate', 'Graduate']
                },
                num: { $regex: num, $options: "i" }
            });
        } else {
            courses = await Course.find({ 
                dept, level, num: { $regex: num, $options: "i" }
            });
        }

        res.send(courses);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.toString());
    }
})


// endpoint for getting all the distinct department values
router.get('/api/course/dept/all', logRequest, async (req, res) => {
    try {
        const allDepts = await Course.find().distinct('dept');
        console.log(allDepts);
        res.send(allDepts);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.toString());
    }
})

router.get('/', (req, res) => { res.send('Running!') })

module.exports = router;