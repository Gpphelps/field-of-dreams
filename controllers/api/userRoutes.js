const router = require('express').Router();
const {User, Flower} = require('../../models');

//Create new user
router.post('/', async(req, res) => {
    try {
        const userDataDB = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userDataDB);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//User Login
router.post('/login', async(req, res) => {
    try {
        const userDataDB = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!userDataDB) {
            res
                .status(400)
                .json({message: 'Incorrect email or password. Please try again!'});
            return;
        }

        const validPassword = await userDataDB.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect email or password. Please try again!'});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
      
            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
          });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//User Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
});

//get route, include model flower
router.get('/:id', (req, res) => {
    try {
        const userDataDB = await User.findAll({
            where: {
                id: req.params.id,
            }, 
        }, 
        {include: [{
            model: Flower,
        }]
        }, 
        );

        if (!userDataDB) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.status(200).json(userDataDB);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;