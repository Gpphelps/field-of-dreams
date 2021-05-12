const router = require('express').Router();
const { Flower, User, Plantedflower } = require('../models');
const withAuth = require('../utils/auth');

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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Uses the withAuth middleware to prevent access to the proflie page unless the user is logged in
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Finds the logged in user's profile based on their session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{ model: Flower }],
        });

        const user = userData.get({plain: true});

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status.json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
})

module.exports = router;