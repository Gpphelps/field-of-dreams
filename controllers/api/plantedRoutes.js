const router = require('express').Router();
const {Plantedflower, Flower} = require('../../models');

router.post('/', async (req, res) => {
    try {
       const newPlant =  await Plantedflower.create({
           flower_position: req.body.flower_position,
           flower_id: req.body.flower_id,

       })
       res.status(200).json(newPlant);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {

})

router.get('/:id', async (req, res) => {
    try {
        const newPlant = await Plantedflower.findAll({
            where: {
                id: req.params.id,
            }, 
        },
        { include: [{
            model: Flower,
            }]
        },
        );

        if (!newPlant) {
            res.status(404).json({ message: 'No user planted flower found with this id!'});
            return;
        }
        res.status(200).json(newPlant);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;