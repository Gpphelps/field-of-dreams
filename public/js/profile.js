

const profileInit = () => {
    fetch('', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        renderProfileFlowers(data)
    })
}


const renderProfileFlowers = (flowers) => {
    flowers.forEach(flower => {
        let div = document.createElement('div')
        div.classList.add('profileFlowerDiv')


        let canv = document.createElement('canvas')
        let canvas = new Canvas(canv,100,100,'rgb(170,170,170)')
        canvas.init()

        div.appendChild(canv)

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
            petalShape: f.petal_shape,
            petalScale: f.petal_scale,
            petalScaleVariation: f.petal_scale_variation,
        }

        let newFlower = new Flower(attr,15,canvas.w/2,canvas.h*.9,canvas.ctx)
        newFlower.init()
        newFlower.draw()

        let title = document.createElement('h3')
        div.appendChild(title)
        title.innerHTML = flower.name

        let deleteButton = document.createElement('button')
        div.appendChild(deleteButton)
        deleteButton.innerHTML = 'DELETE'
        deleteButton.setAttribute("data-flowerid",flower.id)
        deleteButton.classList.add('profileFlowerDelete')


        document.querySelector('#profileDiv').appendChild(div)
    })
}


renderProfileFlowers([{
    max_curve: 0.04,
    max_variation: 0.05,
    stem_width: 0.2,
    bulb_radius: 0.3,
    bulb_color_R: 255,
    bulb_color_G: 255,
    bulb_color_B: 0,
    petal_color_R: 220,
    petal_color_G: 0,
    petal_color_B: 100,
    stem_color_R: 0,
    stem_color_G: 100,
    stem_color_B: 0,
    petal_color_variation: 125,
    segments: 5,
    segment_variation: 0,
    petal_number: 10,
    petal_shape: [[0,0],[2,1],[3,0],[2,-1]],
    petal_scale: 0.3,
    petal_scale_variation: 0.05,
    id:1,
    name: 'My Flower'
},{
    max_curve: 0.04,
    max_variation: 0.05,
    stem_width: 0.2,
    bulb_radius: 0.3,
    bulb_color_R: 255,
    bulb_color_G: 255,
    bulb_color_B: 0,
    petal_color_R: 220,
    petal_color_G: 0,
    petal_color_B: 100,
    stem_color_R: 0,
    stem_color_G: 100,
    stem_color_B: 0,
    petal_color_variation: 125,
    segments: 5,
    segment_variation: 0,
    petal_number: 10,
    petal_shape: [[0,0],[2,1],[3,0],[2,-1]],
    petal_scale: 0.3,
    petal_scale_variation: 0.05,
    id:2,
    name: 'My Flower'
},])




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
            renderProfileFlowers(data)
        })
    })
})