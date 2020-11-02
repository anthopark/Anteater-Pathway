const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/mongoose');

const courseRouter = require('./routers/course');
const planRouter = require('./routers/plan');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(courseRouter);
app.use(planRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

// const Course = require('./models/course');

// const testCourse = async () => {
//     const course = await Course.find({
//         dept: 'IN4MATX',
//     });
//     console.log(course);
// }

// testCourse()
