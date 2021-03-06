const mongoose = require('mongoose');
const Course = require('../models/course');


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

const removePrevQuartersField = async (courses) => {
    for (let course of courses) {
        console.log(`removing prevQuarters in ${course.dept} ${course.num}: ${course.title}`);
        course.prevQuarters = undefined;
        await course.save();
    }
}



// RUN WHEN COURSES COLLECTION IS INITIALIZED
const duplicateNecessaryCourses = async () => {
    let specialTopicCourses = await Course.find({
        title: { $regex: 'special topic', $options: 'i' }
    })

    let undergradResearchCreditCourses = await Course.find({
        $or: [{ title: { $regex: 'independent', $options: 'i' } }, { title: { $regex: 'individual', $options: 'i' } }, { title: { $regex: 'research', $options: 'i' } }],
        num: { $regex: '180', $options: 'i' },
    })

    let gradResearchCreditCourses299 = await Course.find({
        $or: [{ title: { $regex: 'independent', $options: 'i' } }, { title: { $regex: 'individual', $options: 'i' } }, { title: { $regex: 'research', $options: 'i' } }],
        num: { $regex: '299', $options: 'i' }
    })

    let gradResearchCreditCourses298 = await Course.find({
        $or: [{ title: { $regex: 'independent', $options: 'i' } }, { title: { $regex: 'individual', $options: 'i' } }, { title: { $regex: 'research', $options: 'i' } }],
        num: { $regex: '298', $options: 'i' }
    })

    let gradResearchCreditCourses290 = await Course.find({
        $or: [{ title: { $regex: 'independent', $options: 'i' } }, { title: { $regex: 'individual', $options: 'i' } }, { title: { $regex: 'research', $options: 'i' } }],
        num: { $regex: '290', $options: 'i' }
    })

    // await duplicateCourses(specialTopicCourses, 4); // make 4 more documents for each course
    // await duplicateCourses(undergradResearchCreditCourses, 9);
    // await duplicateCourses(gradResearchCreditCourses299, 19);
    // await duplicateCourses(gradResearchCreditCourses298, 19);
    // await duplicateCourses(gradResearchCreditCourses290, 19);
    console.log(undergradResearchCreditCourses);
    console.log(undergradResearchCreditCourses.length);
    console.log('duplicate completed!');
}

// Remove "prevQuarters" field from research credit courses
const removeFieldFromCourses = async () => {

    const specialTopicCourses = await Course.find({
        title: { $regex: 'special topic', $options: 'i' },
        prevQuarters : {$exists : true}
    })


    const undergradResearchCreditCourses = await Course.find({
        $or: [{ title: { $regex: 'independent', $options: 'i' } }, { title: { $regex: 'individual', $options: 'i' } }, { title: { $regex: 'research', $options: 'i' } }],
        num: { $regex: '199', $options: 'i' },
        prevQuarters : {$exists : true}
    })


    const gradResearchCreditCourses299 = await Course.find({
        $or: [{ title: { $regex: 'independent', $options: 'i' } }, { title: { $regex: 'individual', $options: 'i' } }, { title: { $regex: 'research', $options: 'i' } }],
        num: { $regex: '299', $options: 'i' },
        prevQuarters : {$exists : true}
    })

    const gradResearchCreditCourses298 = await Course.find({
        $or: [{ title: { $regex: 'independent', $options: 'i' } }, { title: { $regex: 'individual', $options: 'i' } }, { title: { $regex: 'research', $options: 'i' } }],
        num: { $regex: '298', $options: 'i' },
        prevQuarters : {$exists : true}
    })

    const gradResearchCreditCourses290 = await Course.find({
        $or: [{ title: { $regex: 'independent', $options: 'i' } }, { title: { $regex: 'individual', $options: 'i' } }, { title: { $regex: 'research', $options: 'i' } }],
        num: { $regex: '290', $options: 'i' }
    })

    await removePrevQuartersField(specialTopicCourses);
    await removePrevQuartersField(undergradResearchCreditCourses);
    await removePrevQuartersField(gradResearchCreditCourses299);
    await removePrevQuartersField(gradResearchCreditCourses298);
    await removePrevQuartersField(gradResearchCreditCourses290);
}

const duplicateSpecificCourse = async (dept, num, numCopy) => {
    const course = await Course.find({
        dept, num
    });
    duplicateCourses(course, numCopy);
    console.log('completed!');
}


const deleteAllDuplicatedExceptOriginal = async (dept, num, originalID) => {
    await Course.deleteMany({
        dept, num,
        _id : { $ne: originalID }
    });


    console.log('complete!');
}


module.exports = {
    duplicateNecessaryCourses,
    removeFieldFromCourses,
    duplicateSpecificCourse,
    deleteAllDuplicatedExceptOriginal,
}