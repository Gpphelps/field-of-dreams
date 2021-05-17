

const profileInit = () => {
    fetch('/api/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        renderProfileFlowers(data.flower)
    })
}


const renderProfileFlowers = (flowers) => {

    flowers.forEach(flower => {
        console.log(flower)
        let canv = document.querySelector(`#${flower.id}`)
        console.log(canv)
        let canvas = new Canvas(canv,75,75,'rgb(170,170,170)')
        canvas.init()


        let f = flower;

        let attr = {
            maxCurve: f.max_curve,
            maxVariation: f.max_variation,
            stemWidth: f.stem_width,
            bulbRadius: f.bulb_radius,
            bulbColor: {
                r: f.bulb_color_R,
                g: f.bulb_color_G,
                b: f.bulb_color_B,
            },
            petalColor: {
                r: f.petal_color_R,
                g: f.petal_color_G,
                b: f.petal_color_B,
            },
            stemColor: {
                r: f.stem_color_R,
                g: f.stem_color_G,
                b: f.stem_color_B,
            },
            petalColorVariation: f.petal_color_variation,
            segments: f.segments,
            segmentVaraiation: f.segment_variation,
            petalNum: f.petal_number,
            petalShape: JSON.parse(f.petal_shape),
            petalScale: f.petal_scale,
            petalScaleVariation: f.petal_scale_variation,
        }

        let newFlower = new Flower(attr,10,canvas.w/2,canvas.h*.9,canvas.ctx)
        newFlower.init()
        newFlower.draw()

    })
}


let deleteButtons = document.querySelectorAll('.profileFlowerDelete')
deleteButtons.forEach(button => {
    button.addEventListener('mousedown',function(e){
        fetch(`api/flowers/${e.target.dataset.flowerid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
    })
})