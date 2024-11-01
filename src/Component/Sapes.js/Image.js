const Drawing = require("./drawingEntity");

class ImageElement extends Drawing {
    constructor(x, y, imgSrc, color = "black", lineWidth = 1, lineType = "solid") {
        super(color, lineWidth, lineType);
        this.startingPoint = { x, y };
        this.width = 0;
        this.height = 0;
        this.img = new Image();
        this.img.src = imgSrc;
        this.imgLoaded = false;

        // Event listener for image load
        this.img.onload = () => {
            this.imgLoaded = true;
            this.width = this.img.width;
            this.height = this.img.height;
            this.updateMinMaxPoint();
        };
    }

    addNewPoint(x, y) {
        this.width = x - this.startingPoint.x;
        this.height = y - this.startingPoint.y;
        this.updateMinMaxPoint();
    }

    draw(context) {
        if (!this.imgLoaded) return; // Don't draw until the image has loaded

        this.addStyleInContext(context); // Optional: Add any styles
        context.drawImage(this.img, this.startingPoint.x, this.startingPoint.y, this.width, this.height);
    }

    checkBound(x, y) {
        const withinX = x >= Math.min(this.startingPoint.x, this.startingPoint.x + this.width) - 5 &&
            x <= Math.max(this.startingPoint.x, this.startingPoint.x + this.width) + 5;
        const withinY = y >= Math.min(this.startingPoint.y, this.startingPoint.y + this.height) - 5 &&
            y <= Math.max(this.startingPoint.y, this.startingPoint.y + this.height) + 5;

        return withinX && withinY;
    }

    scale(scaleX, scaleY) {
        this.addNewPoint(scaleX, scaleY);
    }

    updateMinMaxPoint() {
        this.minumumPoint = { x: this.startingPoint.x, y: this.startingPoint.y };
        this.maxPoint = { x: this.startingPoint.x + this.width, y: this.startingPoint.y + this.height };
    }

    transform(xOffset, yOffset) {
        this.startingPoint.x += xOffset;
        this.startingPoint.y += yOffset;
        this.updateMinMaxPoint();
    }
}

module.exports = ImageElement;
