const router = require('express').Router();
const userRoutes = require('./userRoutes');
const flowerRoutes = require('./flowerRoutes');
const plantedRoutes = require('.plantedRoutes/');

router.use('/users', userRoutes);
router.use('/flowers', flowerRoutes);
router.use('/plantedRoutes', plantedRoutes);

module.exports = router;