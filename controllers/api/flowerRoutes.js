const router = require('express').Router();
const {Flower} = require('../../models');

//Create new flower
router.post('/', async(req, res) => {
    try {
        const newFlower = await Flower.create({
            height: req.body.height,
            stem_width: req.body.stem_width,
            max_curve: req.body.max_curve,
            max_variation: req.body.max_variation,
            bulb_radius: req.body.bulb_radius,
            bulb_color_R: req.body.bulb_color_R,
            bulb_color_G: req.body.bulb_color_G,
            bulb_color_B: req.body.bulb_color_B,
            petal_color_variation: req.body.petal_color_variation,
            segments: req.body.segments,
            segment_variation: req.body.segment_variation,
            petal_number: req.body.petal_number,
            petal_scale: req.body.petal_scale,
            petal_shape: req.body.petal_shape,
        });

        res.status(200).json(newFlower);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Get flower by id
router.get('/:id', (req, res) => {
    try {
        const newFlower = await Flower.findAll({
            where: {
                id: req.params.id,
            }
        });
        if (!newFlower) {
            res.status(404).json({ message: 'No flower found with this id!' });
            return;
        }
        res.status(200).json(newFlower);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', (req, res) => {
    try {
        const newFlower = await Flower.findAll({
            where: {
                id: req.params.id,
            }
        });
        if (!newFlower) {
            res.status(404).json({ message: 'No flower found with this id!' });
            return;
        }
        res.status(200).json(newFlower);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;