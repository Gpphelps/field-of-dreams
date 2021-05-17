const router = require('express').Router();
const { Flower, User, Plantedflower } = require('../models');


router.get('/', async (req, res) => {
    try {
        // Gets all the flowers that have been created by all users
        const flowerData = await Plantedflower.findAll();

        // Serializes the flowerData so that the template can read it
        const flowers = flowerData.map((flower) => flower.get({plain: true}
        ));

        // Passes the seralized data and a session flag into the template for rendering onto the homepage
        res.render('homepage', {
            flowers,
            logged_in: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/profile', async (req, res) => {
    try {
        // Finds the logged in user's profile based on their session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{ model: Flower }],
        });

        const user = userData.get({plain: true});
        // renders the user's profile page
        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create', async (req, res) => {
    try {
        res.render('create', {
            logged_in: req.session.loggedIn,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/about', (req, res) => {
    res.render('about');
})
module.exports = router;