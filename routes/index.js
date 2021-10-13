const router = require('express').Router();
const sendMail = require('../mailer');

router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Xeon Bank',
        files: 'home'
    });
});

router.post('/contact-us', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (await sendMail(`New message from ${name}`, `Email:\n${email}:\n\nMessage:\n${message}`)) {
            res.status(200).send("Message was sent successfuly!");
        } else {
            res.status(500).send("Message wasn't sent. Please try again.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;