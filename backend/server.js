const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./src/db/mongoose');

const courseRouter = require('./src/routers/course');
const planRouter = require('./src/routers/plan');
const contactRouter = require('./src/routers/contact');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(courseRouter);
app.use(planRouter);
app.use(contactRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

