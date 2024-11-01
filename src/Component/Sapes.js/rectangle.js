const drawing = require("./drawingEntity");

class rectangle extends drawing {
    startingPoint = {};
    constructor(x, y, color, lineWidth, lineType) {
        super(color, lineWidth, lineType)
        this.startingPoint = { x, y }
        this.width = 0
        this.heigh = 0
    }


    addNewPoint(x, y) {
        this.width = x - this.startingPoint.x;
        this.heigh = y - this.startingPoint.y;

        this.updateMinMaxPoint();
    }


    draw(context) {

        this.addStyleInContext(context)
        context.beginPath();
        context.rect(this.startingPoint.x, this.startingPoint.y, this.width, this.heigh);
        context.stroke();
    }

    checkBound(x, y) {
        if (x >= Math.min(this.startingPoint.x, this.startingPoint.x + this.width) - 5 && x <= Math.max(this.startingPoint.x, this.startingPoint.x + this.width) + 5 && y >= Math.min(this.startingPoint.y, this.startingPoint.y + this.heigh) - 5 && y <= Math.max(this.startingPoint.y, this.startingPoint.y + this.heigh) + 5) {
            return true;
        }
        return false;
    }

    scale(x, y ) {
        console.log("I am inside", x, y);
        this.addNewPoint(x,y);
       
    }

    updateMinMaxPoint(x, y) {
        this.minumumPoint = this.startingPoint
        this.maxPoint = { x: this.startingPoint.x + this.width, y: this.startingPoint.y + this.heigh }
    }

    transform(x, y) {
        this.startingPoint.x += x
        this.startingPoint.y += y
        this.updateMinMaxPoint();
    }
}

module.exports = rectangle;