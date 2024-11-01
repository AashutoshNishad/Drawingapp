const drawing = require("./drawingEntity");

class StaraightLine extends drawing {
    startingPoint = {};
    endpoints = {}
    constructor(x, y, color, lineWidth, lineType) {
        super(color, lineWidth, lineType)
        this.startingPoint = { x, y }
        this.endpoints = { x, y };
    }


    addNewPoint(x, y) {

        // console.log(this.endpoints.x);
        
        this.endpoints = { x, y };
        this.updateMinMaxPoint();
    }


    draw(context) {

        this.addStyleInContext(context)
        context.beginPath();
        context.moveTo(this.startingPoint.x, this.startingPoint.y)
        context.lineTo(this.endpoints.x, this.endpoints.y)
        // context.rect(this.startingPoint.x, this.startingPoint.y, this.width, this.heigh);
        context.stroke();
    }

    // this.m = 

    checkBound(x, y) {

        var y1 = this.endpoints.y, y2 = this.startingPoint.y;
        var x1 = this.endpoints.x, x2 = this.startingPoint.x;

        var m = (y1 - y2)/(x1 - x2)
        var c = y1 - m*x1
        console.log(x, y, m * x + c, this.lineWidth);
        var tempy = m * x + c;
        return (tempy < y + 10 && tempy > y - 10) && (x < Math.max(x1 , x2)&&x > Math.min(x1 , x2)) && (y < Math.max(y1 , y2)&&x > Math.min(y1 , y2)) ;


    }

    scale(scaleX, scaleY) {
        this.addNewPoint(scaleX, scaleY);
    }
    updateMinMaxPoint(x, y) {
        this.minumumPoint = this.startingPoint;
        this.maxPoint = this.endpoints;
    }

    transform(x, y) {
        this.startingPoint.x += x
        this.startingPoint.y += y
        this.endpoints.x += x;
        this.endpoints.y += y;
        this.updateMinMaxPoint();
    }
}

module.exports = StaraightLine;