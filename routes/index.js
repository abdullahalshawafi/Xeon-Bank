const router = require('express').Router();
const Message = require('../models/Message');

router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Xeon Bank',
        files: 'home'
    });
});

router.post('/contact-us', async (req, res) => {
    try {
        const message = await new Message(req.body);
        await message.save();

        res.status(200).send("Your message has been sent successfully!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Your message hasn't been sent successfully!");
    }
});

module.exports = router;