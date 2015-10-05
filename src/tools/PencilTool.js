export class PencilTool {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.started = false;
    }

    onStart({offsetX, offsetY}) {
        this.started = true;

        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.beginPath();
        this.ctx.arc(offsetX,
                     offsetY,
                     20,
                     (Math.PI/180)*0,
                     (Math.PI/180)*360,
                     false);
        this.ctx.fill();
        this.ctx.closePath();
    }

    onMove({offsetX, offsetY}) {
        if (!this.started) {
            return;
        }

        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.beginPath();
        this.ctx.arc(offsetX,
                     offsetY,
                     20,
                     (Math.PI/180)*0,
                     (Math.PI/180)*360,
                     false);
        this.ctx.fill();
        this.ctx.closePath();
    }

    onStop(/*evt*/) {
        this.started = false;
    }
}
PencilTool.title = "Pencil Tool";
PencilTool.img = "pencil.png";
