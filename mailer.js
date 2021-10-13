const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendMail = async (subject, body) => {
    try {
        const res = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject,
            text: body
        });
        console.log(res.messageId);
        return true;
    } catch (error) {
        console.log(`Error in sending the email:\n${error}`);
        return false;
    }
}

module.exports = sendMail;