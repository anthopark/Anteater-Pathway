const nodemailer = require('nodemailer');


const sendMail = async (issueOption, message) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            type: 'login',
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        }
    })

    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
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