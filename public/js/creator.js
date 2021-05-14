

let testAttributes = {
    name: 'test',
    id: 1,
    maxCurve: 0.04,
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
    petalShape: [[0,0],[0.5,0.3],[1,0],[0.5,-0.3]],
    petalScale: 0.8,
    petalScaleVariation: 0.05,
}


let canvas = new Canvas(document.querySelector('#canv0'),400,400, 'black')
canvas.init()


let ctx;
let petalCanvas;

const petalShapeInit = () => {
    petalCanvas = document.querySelector('#petalShape')
    petalCanvas.width = 200;
    petalCanvas.height = 200;
    ctx = petalCanvas.getContext('2d')
}


let petalShape = [[0,0],[0.5,0.3],[1,0],[0.5,-0.3]]


const petalShapeInput = (e) => {
    let inputPos = petalCanvas.getBoundingClientRect()
    let relativeX = e.clientX - inputPos.left
    let relativeY = (e.clientY - inputPos.top)
    console.log(relativeX,relativeY)

    let scaledX = relativeX/petalCanvas.width;
    let scaledY = -1*(relativeY/petalCanvas.height) + 0.5;
    console.log(scaledX,scaledY)

    petalShape.push([scaledX,scaledY])

    petalShapeRender()
}

const petalShapeRender = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,petalCanvas.width,petalCanvas.height)

    ctx.strokeStyle = 'white'
    ctx.moveTo(0,petalCanvas.height/2)
    ctx.lineTo(petalCanvas.width,petalCanvas.height/2)
    ctx.stroke();

    petalShape.forEach(point => {
        let x = point[0] * petalCanvas.width;
        let y = ((point[1]*-1) * petalCanvas.height) + (petalCanvas.height/2)
        ctx.beginPath()
        ctx.fillStyle = 'yellow'
        ctx.arc(x,y,4,0,2*Math.PI)
        ctx.fill()
        ctx.closePath()
    })

    ctx.beginPath()
    ctx.strokeStyle = 'red'
    let w = petalCanvas.width;
    let h = petalCanvas.height;
    ctx.moveTo((petalShape[0][0]*w),(petalShape[0][1]*h*-1)+(h/2))
    for (let i=0;i<petalShape.length;i++){
        // let thisPoint = petalShape[i]
        // let nextPoint = petalShape[i+1]
        ctx.lineTo(petalShape[i][0]*w,(petalShape[i][1]*h*-1)+(h/2))
    }
    ctx.lineTo(petalShape[0][0]*w,(petalShape[0][1]*h*-1)+(h/2))
    ctx.stroke()
    ctx.closePath()
}


petalShapeInit()
petalShapeRender()
petalCanvas.addEventListener("mousedown",petalShapeInput)

document.querySelector('#clearPetalCanvas').addEventListener("mousedown",function(){
    console.log('clearing')
    petalShape = [[0,0]];
    ctx.clearRect(0,0,petalCanvas.width,petalCanvas.height)
    petalShapeRender()
})

document.querySelector('#updatePetals').addEventListener("mousedown",function(){
    resetCanv()
    attrConstructor()
})

document.querySelector('#regenButton').addEventListener("mousedown",function(){
    resetCanv()
    attrConstructor()
})

const generateFlower = (attr) => {
    console.log(attr)
    let flower = new Flower(attr,50,canvas.w/2,(canvas.h*0.8),canvas.ctx)
    flower.init()
    flower.draw()
    console.log(flower)
}

const attrConstructor = () => {
    const maxCurve = document.querySelector('#maxCurve').value
    const maxVariation = document.querySelector('#maxVariation').value
    const stemWidth = document.querySelector('#stemWidth').value
    const bulbRadius = document.querySelector('#bulbRadius').value

    const bulbColorR = document.querySelector('#bulbColorR').value
    const bulbColorG = document.querySelector('#bulbColorG').value
    const bulbColorB = document.querySelector('#bulbColorB').value

    const petalColorR = document.querySelector('#petalColorR').value
    const petalColorG = document.querySelector('#petalColorG').value
    const petalColorB = document.querySelector('#petalColorB').value

    const stemColorR = document.querySelector('#stemColorR').value
    const stemColorG = document.querySelector('#stemColorG').value
    const stemColorB = document.querySelector('#stemColorB').value

    const petalColorVariation = document.querySelector('#petalColorVariation').value
    const stemSegments = document.querySelector('#stemSegments').value
    const segmentVaraiation = document.querySelector('#segmentVariation').value
    const petalNum = document.querySelector('#petalNum').value
    const petalScale = document.querySelector('#petalScale').value
    const petalScaleVariation = document.querySelector('#petalScaleVariation').value


    console.log(stemSegments)

    let attributes = {
        maxCurve: Number(maxCurve),
        maxVariation: Number(maxVariation),
        stemWidth: Number(stemWidth),
        bulbRadius: Number(bulbRadius),
        bulbColor: {
            r: Number(bulbColorR),
            g: Number(bulbColorG),
            b: Number(bulbColorB),
        },
        petalColor: {
            r: Number(petalColorR),
            g: Number(petalColorG),
            b: Number(petalColorB),
        },
        stemColor: {
            r: Number(stemColorR),
            g: Number(stemColorG),
            b: Number(stemColorB),
        },
        petalColorVariation: Number(petalColorVariation),
        segments: Number(stemSegments),
        // segments: 4,
        segmentVaraiation: Number(segmentVaraiation),
        petalNum: Number(petalNum),
        petalShape: JSON.stringify(petalShape),
        petalScale: Number(petalScale),
        petalScaleVariation: Number(petalScaleVariation),
    }
    console.log(attributes.petalScale)
    generateFlower(attributes)

    return attributes

}

attrConstructor()


const resetCanv = () => {
    canvas.ctx.clearRect(0,0,canvas.w,canvas.h)

    canvas.ctx.beginPath()
    canvas.ctx.fillStyle = canvas.bkg;
    canvas.ctx.fillRect(0,0,canvas.w,canvas.h);
    canvas.ctx.closePath()

}



let inputs = document.querySelectorAll('.paramInput')
inputs.forEach(input => {
    input.previousElementSibling.innerHTML = input.value
    input.previousElementSibling.style.color = 'rgb(255,0,200)'
    input.previousElementSibling.style.fontStyle = 'italic'

    input.addEventListener('mouseup',function(e){
        resetCanv()
        attrConstructor()

        e.target.previousElementSibling.innerHTML = e.target.value
    })
})

let rgbInputs = document.querySelectorAll('.rgbInput')
rgbInputs.forEach(input => {

    document.querySelectorAll('.rgbColorDisplay').forEach(display => {
        // console.log(display.dataset.type)
        // console.log(input.dataset.type)
        
        if(display.dataset.type == input.dataset.type){
            let colors = document.querySelectorAll('.'+input.dataset.type+'Slider')
            // console.log(colors[0].value)
            display.style.backgroundColor = `rgb(${colors[0].value},${colors[1].value},${colors[2].value})`
        }
    })

    input.addEventListener('mouseup',function(e){
        document.querySelectorAll('.rgbColorDisplay').forEach(display => {
            // console.log(display.dataset.type)
            // console.log(input.dataset.type)
            
            if(display.dataset.type == input.dataset.type){
                let colors = document.querySelectorAll('.'+input.dataset.type+'Slider')
                // console.log(colors[0].value)
                display.style.backgroundColor = `rgb(${colors[0].value},${colors[1].value},${colors[2].value})`
            }
        })
    })
})




const submitFlower = async () => {
    let attrObj = attrConstructor()
    let statusP = document.querySelector('#saveStatus');

    let attributeDBFormat = {
        max_curve: attrObj.maxCurve,
        max_variation: attrObj.maxVariation,
        stem_width: attrObj.stemWidth,
        bulb_radius: attrObj.bulbRadius,
        bulb_color_R: attrObj.bulbColor.r,
        bulb_color_G: attrObj.bulbColor.g,
        bulb_color_B: attrObj.bulbColor.b,
        petal_color_R: attrObj.petalColor.r,
        petal_color_G: attrObj.petalColor.g,
        petal_color_B: attrObj.petalColor.b,
        stem_color_R: attrObj.stemColor.r,
        stem_color_G: attrObj.stemColor.g,
        stem_color_B: attrObj.stemColor.b,
        petal_color_variation: attrObj.petalColorVariation,
        segments: attrObj.segments,
        segment_variation: attrObj.segmentVaraiation,
        petal_number: attrObj.petalColor,
        petal_shape: attrObj.petalShape,
        petal_scale: attrObj.petalScale,
        petal_scale_variation: attrObj.petalScaleVariation,
    }

    statusP.innerHTML = 'Saving Flower...'
    //NEED TO PUT IN THE ACTUAL ROUTE
    const response = await fetch('/api/flowers', {
        method: 'POST',
        body: JSON.stringify(attributeDBFormat),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok){
        statusP.innerHTML = 'Flower succesfully'
    }

    
}


document.querySelector('#saveButton').addEventListener('mousedown',submitFlower)

