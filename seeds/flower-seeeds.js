const { Flower } = require('../models');

const flowerData = [
    {
        name: 'Blue Dragon',
        stem_width: 0.2,
        max_curve: 0.05,
        max_variation: 0.05,
        bulb_radius: 0.3,
        bulb_color_R: 225,
        bulb_color_G: 225,
        bulb_color_B: 0,
        petal_color_R: 0,
        petal_color_G: 100,
        petal_color_B: 240,
        stem_color_R: 100,
        stem_color_G: 0,
        stem_color_B: 0,
        petal_color_variation: 100,
        segments: 6,
        segment_variation: 0,
        petal_number: 8,
        petal_scale: 0.8,
        petal_shape: '[[0,0],[0.5,0.3],[1,0],[0.5,-0.3]]',
        petal_scale_variation: 0.05,
        user_id: 1,
    },
    {
        name: 'Red Dragon',
        stem_width: 0.3,
        max_curve: 0.02,
        max_variation: 0.06,
        bulb_radius: 0.4,
        bulb_color_R: 0,
        bulb_color_G: 100,
        bulb_color_B: 200,
        petal_color_R: 240,
        petal_color_G: 100,
        petal_color_B: 0,
        stem_color_R: 0,
        stem_color_G: 0,
        stem_color_B: 100,
        petal_color_variation: 100,
        segments: 5,
        segment_variation: 1,
        petal_number: 10,
        petal_scale: 0.7,
        petal_shape: '[[0,0],[0.5,0.3],[1,0],[0.5,-0.3]]',
        petal_scale_variation: 0.05,
        user_id: 2,
    },
    {
        name: 'Green Dragon',
        stem_width: 0.2,
        max_curve: 0.05,
        max_variation: 0.05,
        bulb_radius: 0.3,
        bulb_color_R: 100,
        bulb_color_G: 0,
        bulb_color_B: 200,
        petal_color_R: 0,
        petal_color_G: 240,
        petal_color_B: 50,
        stem_color_R: 50,
        stem_color_G: 0,
        stem_color_B: 50,
        petal_color_variation: 50,
        segments: 6,
        segment_variation: 2,
        petal_number: 11,
        petal_scale: 0.5,
        petal_shape: '[[0,0],[0.4,0.2],[1,0],[0.6,-0.3]]',
        petal_scale_variation: 0.05,
        user_id: 3,
    },
    {
        name: 'Wizards Hat',
        stem_width: 0.4,
        max_curve: 0.06,
        max_variation: 0.06,
        bulb_radius: 0.4,
        bulb_color_R: 120,
        bulb_color_G: 55,
        bulb_color_B: 180,
        petal_color_R: 100,
        petal_color_G: 0,
        petal_color_B: 100,
        stem_color_R: 0,
        stem_color_G: 100,
        stem_color_B: 0,
        petal_color_variation: 100,
        segments: 4,
        segment_variation: 1,
        petal_number: 7,
        petal_scale: 0.5,
        petal_shape: '[[0,0],[0.4,0.2],[1,0],[0.6,-0.3]]',
        petal_scale_variation: 0.05,
        user_id: 3,
    },
    {
        name: 'Englishman Footprint',
        stem_width: 0.1,
        max_curve: 0.01,
        max_variation: 0.01,
        bulb_radius: 0.2,
        bulb_color_R: 0,
        bulb_color_G: 200,
        bulb_color_B: 100,
        petal_color_R: 10,
        petal_color_G: 200,
        petal_color_B: 10,
        stem_color_R: 0,
        stem_color_G: 100,
        stem_color_B: 50,
        petal_color_variation: 10,
        segments: 5,
        segment_variation: 1,
        petal_number: 8,
        petal_scale: 0.5,
        petal_shape: '[[1,0],[0.5,0.2],[1,0],[0.6,-0.3]]',
        petal_scale_variation: 0.06,
        user_id: 1,
    },
    {
        name: 'Mandrake',
        stem_width: 0.5,
        max_curve: 0.02,
        max_variation: 0.01,
        bulb_radius: 0.5,
        bulb_color_R: 200,
        bulb_color_G: 200,
        bulb_color_B: 200,
        petal_color_R: 200,
        petal_color_G: 200,
        petal_color_B: 200,
        stem_color_R: 200,
        stem_color_G: 200,
        stem_color_B: 200,
        petal_color_variation: 10,
        segments: 5,
        segment_variation: 1,
        petal_number: 4,
        petal_scale: 0.3,
        petal_shape: '[[0,0],[0.5,0.3],[1,0],[0.4,-0.2]]',
        petal_scale_variation: 0.05,
        user_id: 2,
    },
    {
        name: 'Mineapple',
        stem_width: 0.2,
        max_curve: 0.03,
        max_variation: 0.00,
        bulb_radius: 0.5,
        bulb_color_R: 50,
        bulb_color_G: 200,
        bulb_color_B: 100,
        petal_color_R: 50,
        petal_color_G: 200,
        petal_color_B: 150,
        stem_color_R: 0,
        stem_color_G: 100,
        stem_color_B: 100,
        petal_color_variation: 10,
        segments: 4,
        segment_variation: 2,
        petal_number: 6,
        petal_scale: 0.3,
        petal_shape: '[[1,0],[0.3,0.1],[1,.5],[0.7,-0.2]]',
        petal_scale_variation: 0.02,
        user_id: 3,
    },
];

const seedFlowers = () => Flower.bulkCreate(flowerData);

module.exports = seedFlowers;