const express = require('express');
const logRequest = require('../middleware/log');
const fetch = require('node-fetch');
const { StatusCodes } = require('http-status-codes');
const { sendMail } = require('./helpers/contact');

const router = new express.Router();

const validateHuman = async (token) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        {
            method: "POST",
        }
    );
    const data = await response.json();
    return data.success;
}

router.post('/api/contact/feedback', logRequest, async (req, res) => {
    const {issueOption, message, reToken} = req.body;
    console.log(`Issue Category: ${issueOption}`);
    console.log(`Message\n`, message);
    try {
        const isHuman = await validateHuman(reToken);
        
        if (!isHuman) {
            return res.status(StatusCodes.BAD_REQUEST);
        }

        await sendMail(issueOption, message);
        res.status(StatusCodes.OK).send();
    } catch(e) {
        console.error(e.toString());
        res.status(StatusCodes.BAD_REQUEST).send(e.toString());
    }
})



module.exports = router;
