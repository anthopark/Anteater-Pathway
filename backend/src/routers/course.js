const express = require('express');
const Course = require('../models/course');
const router = new express.Router();
const logRequest = require('../middleware/log');

const allowedCourseDept = {
    "AC ENG": true,
    "AFAM": true,
    "ANATOMY": true,
    "ANTHRO": true,
    "ARABIC": true,
    "ARMN": true,
    "ART": true,
    "ART HIS": true,
    "ARTS": true,
    "ASIANAM": true,
    "BANA": true,
    "BATS": true,
    "BIO SCI": true,
    "BIOCHEM": true,
    "BME": true,
    "CBE": true,
    "CHC/LAT": true,
    "CHEM": true,
    "CHINESE": true,
    "CLASSIC": true,
    "CLT&THY": true,
    "COGS": true,
    "COM LIT": true,
    "COMPSCI": true,
    "CRITISM": true,
    "CRM/LAW": true,
    "CSE": true,
    "DANCE": true,
    "DEV BIO": true,
    "DRAMA": true,
    "EARTHSS": true,
    "EAS": true,
    "ECO EVO": true,
    "ECON": true,
    "ECPS": true,
    "EDUC": true,
    "EECS": true,
    "ENGLISH": true,
    "ENGR": true,
    "ENGRCEE": true,
    "ENGRMAE": true,
    "EPIDEM": true,
    "EURO ST": true,
    "FIN": true,
    "FLM&MDA": true,
    "FRENCH": true,
    "GEN&SEX": true,
    "GERMAN": true,
    "GLBL ME": true,
    "GLBLCLT": true,
    "GREEK": true,
    "HEBREW": true,
    "HISTORY": true,
    "HUMAN": true,
    "I&C SCI": true,
    "IN4MATX": true,
    "INTL ST": true,
    "IRAN": true,
    "ITALIAN": true,
    "JAPANSE": true,
    "KOREAN": true,
    "LATIN": true,
    "LINGUIS": true,
    "LIT JRN": true,
    "LPS": true,
    "LSCI": true,
    "M&MG": true,
    "MATH": true,
    "MGMT": true,
    "MGMT EP": true,
    "MGMT FE": true,
    "MGMT HC": true,
    "MGMTMBA": true,
    "MGMTPHD": true,
    "MOL BIO": true,
    "MPAC": true,
    "MSE": true,
    "MUSIC": true,
    "NET SYS": true,
    "NEURBIO": true,
    "NUR SCI": true,
    "PATH": true,
    "PED GEN": true,
    "PERSIAN": true,
    "PHARM": true,
    "PHILOS": true,
    "PHRMSCI": true,
    "PHY SCI": true,
    "PHYSICS": true,
    "PHYSIO": true,
    "POL SCI": true,
    "PORTUG": true,
    "PP&D": true,
    "PSCI": true,
    "PSYCH": true,
    "PUB POL": true,
    "PUBHLTH": true,
    "REL STD": true,
    "ROTC": true,
    "RUSSIAN": true,
    "SOC SCI": true,
    "SOCECOL": true,
    "SOCIOL": true,
    "SPANISH": true,
    "SPPS": true,
    "STATS": true,
    "SWE": true,
    "UCDC": true,
    "UNI AFF": true,
    "UNI STU": true,
    "UPPP": true,
    "VIETMSE": true,
    "VIS STD": true,
    "WRITING": true,
};

const allowedCourseLevel = {
    'Lower Division': true,
    'Upper Division': true,
    'Undergraduate': true,
    'Graduate': true,
    'Other': true,
};


// endpoint for fetching course data by dept, level, and course number
router.get('/api/course/search', logRequest, async (req, res) => {
    const dept = req.query.dept;
    const level = req.query.level;
    const num = req.query.num;

    console.log(dept, level, num);

    if (!allowedCourseDept[dept]) {
        return res.status(404).send({ error: 'Not allowed course department query' });
    }

    if (level && !allowedCourseLevel[level]) {
        return res.status(404).send({ error: 'Not allowed course level query' });
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
        res.status(500).send(e.toString());
    }
})


// endpoint for getting all the distinct department values
router.get('/api/course/dept/all', logRequest, async (req, res) => {
    try {
        let allDepts = []
        allDepts = await Course.find().distinct('dept');
        res.send(allDepts);
    } catch (e) {
        res.status(500).send(e.toString());
    }
})

router.get('/', (req, res) => { res.send('Running!') })

module.exports = router;