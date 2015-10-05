export class RectangleTool {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
    }

    onStart({offsetX, offsetY}) {
        [this.initialX, this.initialY] = [offsetX, offsetY];
    }

    onMove(/*evt*/) {}

    onStop({offsetX, offsetY}) {
        this.ctx.beginPath();
        this.ctx.rect(this.initialX, this.initialY,
                      offsetX - this.initialX, offsetY - this.initialY);
        this.ctx.fill();
        this.ctx.stroke();
    }
}
RectangleTool.title = "Rectangle Tool";
RectangleTool.img = "rectangle.png";
