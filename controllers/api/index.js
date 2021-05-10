const router = require('express').Router();
const userRoutes = require('./userRoutes');
const flowerRoutes = require('./flowerRoutes');

router.use('/users', userRoutes);
router.use('/flowers', flowerRoutes);

module.exports = router;