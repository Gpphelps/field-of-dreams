


class Canvas{
    constructor(elem,w,h,bkg){
        this.canv = elem;
        this.ctx = null;
        this.w = w;
        this.h = h;
        this.bkg = bkg
    }

    init(){
        this.canv.width = this.w;
        this.canv.height = this.h;

        this.ctx = this.canv.getContext('2d');

        this.ctx.fillStyle = this.bkg;
        this.ctx.fillRect(0,0,this.w,this.h)
    }
}

class Flower{
    constructor(attr,scale,x,y,ctx){
        this.parts = [];
        this.stem = null;
        this.canv = null;
        this.ctx = ctx;
        this.id = 0;
        this.segments = 0;
        this.attr = attr
        this.canvSettings = {
            w: 400,
            h: 400,
        }
        this.render = {
            scale: scale,
            posX: x,
            posY: y,
        }
    }

    init(){
        // this.canv = document.querySelector(`#canv${this.id}`)
        // this.canv.width = this.canvSettings.w;
        // this.canv.height = this.canvSettings.h;
        // this.ctx = this.canv.getContext('2d');

        // this.ctx.fillStyle = '#000000'
        // this.ctx.fillRect(0,0,this.canv.width,this.canv.height)

        this.segments = this.attr.segments + Math.floor(getRndm(-this.attr.segmentVaraiation,this.attr.segmentVaraiation))

        this.newStem()
        this.grow()
        this.parts[0].newBulb(this)


    }

    newStem(){
        this.stem = new Stem(this.attr)

        this.stem.init()

        this.parts.push(this.stem)
  
    }

    grow(){
        for(let i=0;i<this.segments;i++){
            this.stem.grow()
        }
    }

    pToRenderX(x){
        return (x*this.render.scale) + this.render.posX; 
    }
    pToRenderY(y){
        return this.render.posY - (y*this.render.scale)
    }

    draw(){
        this.parts.forEach(part => {
            if(part.type == "stem"){
                for (var i=0;i<part.points.length-1;i++){
                    let x = (part.points[i][0]*this.render.scale)+this.render.posX
                    let y = this.render.posY - (part.points[i][1]*this.render.scale)

                    if(this.attr.stemWidth*this.render.scale > 0){
                        this.ctx.beginPath()
                        this.ctx.fillStyle = `rgb(${this.attr.stemColor.r},${this.attr.stemColor.g},${this.attr.stemColor.b})`
                        this.ctx.arc(x,y,((this.attr.stemWidth*this.render.scale))/2,0,2*Math.PI);
                        this.ctx.fill();
                        this.ctx.closePath()
                    }
 
                    let nextX = (part.points[i+1][0]*this.render.scale)+this.render.posX
                    let nextY = this.render.posY - (part.points[i+1][1]*this.render.scale)

                    this.ctx.beginPath()
                    this.ctx.strokeStyle = `rgb(${this.attr.stemColor.r},${this.attr.stemColor.g},${this.attr.stemColor.b})`;
                    this.ctx.lineWidth = part.lineWidth * this.render.scale
                    this.ctx.moveTo(x,y)
                    this.ctx.lineTo(nextX,nextY);
                    this.ctx.stroke()
                    this.ctx.closePath()
                }

            } else if (part.type == "bulb"){
                if(part.radius*this.render.scale > 0){
                    let x = (part.point[0]*this.render.scale)+this.render.posX;
                    let y = this.render.posY - (part.point[1]*this.render.scale)
                    this.ctx.beginPath()
                    this.ctx.fillStyle = `rgb(${this.attr.bulbColor.r},${this.attr.bulbColor.g},${this.attr.bulbColor.b})`
                    this.ctx.arc(x,y,(part.radius*this.render.scale),0,2*Math.PI);
                    this.ctx.fill()
                    this.ctx.closePath()
                }
            } else if (part.type == "petal"){
                this.ctx.beginPath()
                this.ctx.moveTo(this.pToRenderX(part.points[0][0]),this.pToRenderY(part.points[0][1]))
                for(var i=0;i<part.points.length;i++){
                    let point = part.points[i]
                    this.ctx.lineTo(this.pToRenderX(point[0]),this.pToRenderY(point[1]))
                }
                let colorVar = getRndm(-this.attr.petalColorVariation,this.attr.petalColorVariation)
                this.ctx.fillStyle = `rgb(${this.attr.petalColor.r+colorVar},${this.attr.petalColor.g+colorVar},${this.attr.petalColor.b+colorVar})`
                this.ctx.fill()
                this.ctx.closePath()

            }
        })
    }
}

class Stem{
    constructor(attr){
        this.type = "stem"
        this.points = [];
        this.attr = attr;
        this.growVector = [0,1];
        this.maxTotalGrowth = 1;
        this.currentCoord = [0,0];
        this.color = 'green';
        this.lineWidth = 5;
        this.initialCurve = null;
        this.curve = null;
        this.bulb = null;
    }

    init(){
        this.initialCurve = getRndm(-this.attr.maxCurve,this.attr.maxCurve)
        this.curve = this.initialCurve;

        this.lineWidth = this.attr.stemWidth
    }

    grow(){
        this.points.push(this.currentCoord)

        this.growVector = [this.growVector[0]+this.curve,this.growVector[1]]
        
        if(Math.abs(this.growVector[0])+Math.abs(this.growVector[1]) > this.maxTotalGrowth){
            this.growVector = downScaler(this.growVector, this.maxTotalGrowth)
        }

        let rndmX = getRndm(-this.attr.maxVariation,this.attr.maxVariation)
        let rndmY = getRndm(-this.attr.maxVariation,this.attr.maxVariation)
        this.currentCoord = [this.growVector[0]+this.currentCoord[0]+rndmX,this.growVector[1]+this.currentCoord[1]+rndmY]

        this.curve += this.initialCurve

    }

    newBulb(parent){
        let x = this.points[this.points.length-1][0]
        let y = this.points[this.points.length-1][1]
        this.bulb = new Bulb(this.attr,x,y,parent);

        this.bulb.init();

        parent.parts.push(this.bulb)
    }

}

class Bulb{
    constructor(attr,x,y,parent){
        this.type = "bulb"
        this.attr = attr;
        this.color = 'yellow';
        this.radius = 10;
        this.point = [x,y];
        this.parent = parent
    }

    init(){
        
        this.radius = this.attr.bulbRadius;
        this.color = this.attr.bulbColor;

        this.petalGen()
    }

    petalGen(){
        for(var i=0;i<this.attr.petalNum;i++){
            let angleStep = (Math.PI*2)/this.attr.petalNum;
            let newPetal = new Petal(this.attr,this.point[0],this.point[1],angleStep*i)
            newPetal.init()
            this.parent.parts.push(newPetal)
        }
    }

    updatePoint(x,y){
        this.point = [x,y]
    }

    affix(){

    }
}

class Petal{
    constructor(attr,x,y,angle){
        this.type = "petal"
        this.attr = attr;
        this.pos = [x,y];
        this.angle = angle;
        this.points = []
    }

    init(){

        this.attr.petalShape.forEach(point => {
            let x = point[0]
            let y = point[1]

            x = this.attr.petalScale * x;
            y = this.attr.petalScale * y;

            let rotationMatrix = [[Math.cos(this.angle),Math.sin(this.angle)],[-Math.sin(this.angle),Math.cos(this.angle)]]
            let rotated = math.multiply(rotationMatrix,[x,y])

            rotated = [rotated[0]+getRndm(-this.attr.petalScaleVariation,this.attr.petalScaleVariation),rotated[1]+getRndm(-this.attr.petalScaleVariation,this.attr.petalScaleVariation)]

            rotated[0] = rotated[0] + this.pos[0]
            rotated[1] = rotated[1] + this.pos[1]
            


            this.points.push(rotated)
        })
    }
}









const getRndm = (min,max) => {
    return Math.random() * (max-min) + min
}

const downScaler = (vector,max) => {
    
    let theVector = vector
    for(var i=0;i<100;i++){
        theVector = [theVector[0]*.95,theVector[1]*.95]
        if(Math.abs(theVector[0])+Math.abs(theVector[1]) <= max){
            return theVector
        }
    }
}








