const router = require('express').Router();
const Message = require('../models/Message');

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ isRead: 1, createdAt: -1 });

        res.render('pages/messages', {
            title: 'Xeon Bank | Messages',
            files: 'messages',
            messages
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.params.id, { isRead: req.body.isRead });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;