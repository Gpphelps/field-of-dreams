
let canvas = new Canvas(document.querySelector('#mainField'),window.innerWidth,window.innerHeight-(document.querySelector('header').offsetHeight),'green')
canvas.init()

canvas.ctx.beginPath()
canvas.ctx.fillStyle = '#a2f0fa'
canvas.ctx.fillRect(0,0,canvas.w,canvas.h/2)
canvas.ctx.closePath()

const getFlowers = () => {
    //NEED TO PUT IN THE ACTUAL ROUTE
    fetch('/api/plantedRoutes/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
        }
    })
    .then((response)=> response.json())
    .then((data) => {
        console.log(data)
        drawFlowers(data)
    })
}


let loggedIn;
console.log(document.querySelector('#login-proxy'))
let proxyText = document.querySelector('#login-proxy').textContent
if(proxyText == 'true'){
    loggedIn = true
} else {
    loggedIn = false
}

console.log('LOGGED IN PROXY VALUE BELOW')
console.log(loggedIn)

// let testArray = [
//     {
//         flower_position: [100,200],
//         flower: {
//             max_curve: 0.04,
//             max_variation: 0.05,
//             stem_width: 0.2,
//             bulb_radius: 0.3,
//             bulb_color_R: 255,
//             bulb_color_G: 255,
//             bulb_color_B: 0,
//             petal_color_R: 220,
//             petal_color_G: 0,
//             petal_color_B: 100,
//             stem_color_R: 0,
//             stem_color_G: 100,
//             stem_color_B: 0,
//             petal_color_variation: 125,
//             segments: 5,
//             segment_variation: 0,
//             petal_number: 10,
//             petal_shape: '[[0,0],[2,1],[3,0],[2,-1]]',
//             petal_scale: 0.3,
//             petal_scale_variation: 0.05,
//         }
//     },
//     {
//         flower_position: [300,400],
//         flower: {
//             max_curve: 0.03,
//             max_variation: 0.07,
//             stem_width: 0.2,
//             bulb_radius: 0.3,
//             bulb_color_R: 255,
//             bulb_color_G: 100,
//             bulb_color_B: 0,
//             petal_color_R: 0,
//             petal_color_G: 10,
//             petal_color_B: 200,
//             stem_color_R: 0,
//             stem_color_G: 100,
//             stem_color_B: 0,
//             petal_color_variation: 125,
//             segments: 5,
//             segment_variation: 0,
//             petal_number: 10,
//             petal_shape: '[[0,0],[2,1],[3,0],[2,-1]]',
//             petal_scale: 0.3,
//             petal_scale_variation: 0.05,
//         }
//     },
// ]




const drawFlowers = (flowers) => {
    flowers.forEach(flower => {
        // console.log(flower)
        // let pos = JSON.parse(flower.flower_position)
        let flowerX = flower.flower_position_x;
        let flowerY = flower.flower_position_y;

        let denormalized = denormalizeCoords(flowerX,flowerY);

        let f = flower.flower

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

        let distScale = ((denormalized[1]-(canvas.h/2))/canvas.h)*2*40
        let newFlower = new Flower(attr,distScale,denormalized[0],denormalized[1],canvas.ctx);
        // console.log(newFlower)
        newFlower.init()
        newFlower.draw()
    })
}

// drawFlowers(testArray)


let selectedAttr = {
    id: 1,
    maxCurve: 0.1,
    maxVariation: 0.05,
    stemWidth: 0.2,
    bulbRadius: 0.3,
    bulbColor: {
        r: 255,
        g: 255,
        b: 0,
    },
    petalColor: {
        r: 220,
        g: 0,
        b: 100,
    },
    stemColor: {
        r: 0,
        g: 100,
        b: 0,
    },
    petalColorVariation: 125,
    segments: 5,
    segmentVaraiation: 0,
    petalNum: 10,
    petalShape: [[0,0],[2,1],[3,0],[2,-1]],
    petalScale: 0.3,
    petalScaleVariation: 0.05,
}

const plantNewFlower = (e) => {
    if(loggedIn){
        console.log(e.clientX);

        let canvRect = canvas.canv.getBoundingClientRect()
        let placeX = e.clientX + canvRect.left;
        let placeY = e.clientY - canvRect.top;

        let normalized = normalizeCoords(placeX,placeY)

        let distScale = ((e.clientY-(canvas.h/2))/canvas.h)*2*40
        console.log(distScale)
        let newFlower = new Flower(selectedAttr,distScale,placeX,placeY,canvas.ctx)

        newFlower.init()
        newFlower.draw()
    
        let plantedFlowerModelCompatible = {
            flower_position_x: normalized[0],
            flower_position_y: normalized[1],
            flower_id: selectedAttr.id,
        }
    
        fetch('/api/plantedRoutes', {
            method: 'POST',
            body: JSON.stringify(plantedFlowerModelCompatible),
            headers: {
                'Content-Type': 'application/json', 
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
    }

}

canvas.canv.addEventListener('mousedown',plantNewFlower)



const myFlowersInit = () => {
    if(loggedIn){
        fetch('/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            displayUserFlowers(data.flowers)
        })
    }


}

const selectFlower = (e) => {
    console.log(e.target.dataset.flowerid)
    let targetFlowerId = e.target.dataset.flowerid

    let allCanvs = document.querySelectorAll('.userFlowerCanv');
    allCanvs.forEach(canv => canv.style.outline = '0px rgba(0,0,0,0) solid')

    e.target.style.outline = '2px rgb(255,0,200) solid';


    fetch(`api/flowers/${targetFlowerId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((dataArray) => {
        let data = dataArray[0]
        selectedAttr = {
            id: data.id,
            maxCurve: data.max_curve,
            maxVariation: data.max_variation,
            stemWidth: data.stem_width,
            bulbRadius: data.bulb_radius,
            bulbColor: {
                r: data.bulb_color_R,
                g: data.bulb_color_G,
                b: data.bulb_color_B,
            },
            petalColor: {
                r: data.petal_color_R,
                g: data.petal_color_G,
                b: data.petal_color_B,
            },
            stemColor: {
                r: data.stem_color_R,
                g: data.stem_color_G,
                b: data.stem_color_B,
            },
            petalColorVariation: data.petal_color_variation,
            segments: data.segments,
            segmentVaraiation: data.segment_variation,
            petalNum: data.petal_number,
            petalShape: JSON.parse(data.petal_shape),
            petalScale: data.petal_scale,
            petalScaleVariation: data.petal_scale_variation,
        }
    })
    
}


const displayUserFlowers = (flowers) => {
    if(flowers.length == 0){
        let div = document.querySelector('#flowerCanvDiv');
        let msgCont = document.createElement('div');
        msgCont.classList.add('noFlowersDiv');
        
        let msg = document.createElement('p');
        
        div.appendChild(msgCont)
        msgCont.appendChild(msg)

        msg.innerHTML = "You don't have any flowers yet."
    }
    flowers.forEach(flower => {
        let div = document.querySelector('#flowerCanvDiv')
        let canv = document.createElement('canvas')
        canv.classList.add('userFlowerCanv')
        canv.setAttribute("data-flowerID",flower.id)
        div.appendChild(canv)

        let canvas = new Canvas(canv,100,100,'rgb(170,170,170)')
        canvas.init()

        let f = flower 

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

        let newFlower = new Flower(attr,15,canvas.w/2,canvas.h*.9,canvas.ctx)
        newFlower.init()
        newFlower.draw()

        canv.addEventListener('mousedown',selectFlower)

        let elem = {
            target: document.querySelector('.userFlowerCanv')
        }
        selectFlower(elem)
    })
}

// displayUserFlowers([{max_curve: 0.04,
//     max_variation: 0.05,
//     stem_width: 0.2,
//     bulb_radius: 0.3,
//     bulb_color_R: 255,
//     bulb_color_G: 255,
//     bulb_color_B: 0,
//     petal_color_R: 220,
//     petal_color_G: 0,
//     petal_color_B: 100,
//     stem_color_R: 0,
//     stem_color_G: 100,
//     stem_color_B: 0,
//     petal_color_variation: 125,
//     segments: 5,
//     segment_variation: 0,
//     petal_number: 10,
//     petal_shape: '[[0,0],[2,1],[3,0],[2,-1]]',
//     petal_scale: 0.3,
//     petal_scale_variation: 0.05,
//     id:1},
//     {
//     max_curve: 0.04,
//     max_variation: 0.05,
//     stem_width: 0.2,
//     bulb_radius: 0.3,
//     bulb_color_R: 255,
//     bulb_color_G: 255,
//     bulb_color_B: 0,
//     petal_color_R: 220,
//     petal_color_G: 0,
//     petal_color_B: 100,
//     stem_color_R: 0,
//     stem_color_G: 100,
//     stem_color_B: 0,
//     petal_color_variation: 125,
//     segments: 5,
//     segment_variation: 0,
//     petal_number: 10,
//     petal_shape: '[[0,0],[2,1],[3,0],[2,-1]]',
//     petal_scale: 0.3,
//     petal_scale_variation: 0.05,
//     id:2},
//     {
//     max_curve: 0.04,
//     max_variation: 0.05,
//     stem_width: 0.2,
//     bulb_radius: 0.3,
//     bulb_color_R: 255,
//     bulb_color_G: 255,
//     bulb_color_B: 0,
//     petal_color_R: 220,
//     petal_color_G: 0,
//     petal_color_B: 100,
//     stem_color_R: 0,
//     stem_color_G: 100,
//     stem_color_B: 0,
//     petal_color_variation: 125,
//     segments: 5,
//     segment_variation: 0,
//     petal_number: 10,
//     petal_shape: '[[0,0],[2,1],[3,0],[2,-1]]',
//     petal_scale: 0.3,
//     petal_scale_variation: 0.05,
//     id:3},
//     {
//         max_curve: 0.04,
//         max_variation: 0.05,
//         stem_width: 0.2,
//         bulb_radius: 0.3,
//         bulb_color_R: 255,
//         bulb_color_G: 255,
//         bulb_color_B: 0,
//         petal_color_R: 220,
//         petal_color_G: 0,
//         petal_color_B: 100,
//         stem_color_R: 0,
//         stem_color_G: 100,
//         stem_color_B: 0,
//         petal_color_variation: 125,
//         segments: 5,
//         segment_variation: 0,
//         petal_number: 10,
//         petal_shape: '[[0,0],[2,1],[3,0],[2,-1]]',
//         petal_scale: 0.3,
//         petal_scale_variation: 0.05,
//         id:4},
//     {
//         max_curve: 0.04,
//         max_variation: 0.05,
//         stem_width: 0.2,
//         bulb_radius: 0.3,
//         bulb_color_R: 255,
//         bulb_color_G: 255,
//         bulb_color_B: 0,
//         petal_color_R: 220,
//         petal_color_G: 0,
//         petal_color_B: 100,
//         stem_color_R: 0,
//         stem_color_G: 100,
//         stem_color_B: 0,
//         petal_color_variation: 125,
//         segments: 5,
//         segment_variation: 0,
//         petal_number: 10,
//         petal_shape: '[[0,0],[2,1],[3,0],[2,-1]]',
//         petal_scale: 0.3,
//         petal_scale_variation: 0.05,
//         id:5},
    
// ])

// window.onresize = function(){
//     location.reload();
// }

let userFlowersExpanded = false;

if(loggedIn){
    document.querySelector('#userFlowersExpand').addEventListener('mousedown',function(){
        userFlowersExpanded = !userFlowersExpanded
    
        if(userFlowersExpanded){
            document.querySelector('#userFlowers').classList.remove('userFlowersClose')
            document.querySelector('#userFlowers').classList.add('userFlowersOpen')
            document.querySelector('#userFlowersExpand').innerHTML = '-'
        } else {
            document.querySelector('#userFlowers').classList.remove('userFlowersOpen')
            document.querySelector('#userFlowers').classList.add('userFlowersClose')
            document.querySelector('#userFlowersExpand').innerHTML = '+'
        }
    
    })
}


const fieldResize = (e) => {
    console.log('resize')
    setTimeout(function(){
        location.reload()
    },500)
}

window.onresize = fieldResize



getFlowers()
myFlowersInit()


//takes certain input coords and makes (0,0) at the center of the page rather than top left
const normalizeCoords = (x,y) => {
    return [x-(window.innerWidth/2),y-(window.innerHeight/2)]
}

const denormalizeCoords = (x,y) => {
    return [x+(window.innerWidth/2),y+(window.innerHeight/2)]
}