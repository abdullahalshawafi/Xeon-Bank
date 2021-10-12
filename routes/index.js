const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Xeon Bank',
        files: 'home'
    });
});

module.exports = router;