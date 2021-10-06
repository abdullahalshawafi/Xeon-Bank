const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Home Page',
        files: 'home'
    });
});

module.exports = router;