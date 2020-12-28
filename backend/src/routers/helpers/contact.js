const nodemailer = require('nodemailer');


const sendMail = async (issueOption, message) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 465,
        service: 'yahoo',
        secure: false,
        auth: {
            user: process.env.YAHOO_USERNAME,
            pass: process.env.YAHOO_PASSWORD,
        },
        debug: false,
        logger: true
    })

    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.YAHOO_USERNAME,
            to: process.env.GMAIL_USERNAME,
            subject: `[Anteater-Pathway][${issueOption}]`,
            text: message
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(false);
            } else {
                console.log(`Email Sent: [${issueOption}] ${info.response}`);
                resolve(true);
            }
        })
    })
}

module.exports = {
    sendMail
}