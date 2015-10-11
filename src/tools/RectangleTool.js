export class RectangleTool {
    constructor(canvas, uiHintsLayer) {
        this.ctx = canvas.getContext("2d");
        this.uiHintsLayer = uiHintsLayer;
        this.uiHintsLayerCtx = uiHintsLayer.getContext("2d");
        this.started = false;
    }

    onStart({offsetX, offsetY}) {
        [this.initialX, this.initialY] = [offsetX, offsetY];
        this.clearUiHints();
        this.started = true;
    }

    onMove({offsetX, offsetY}) {
        this.clearUiHints();

        if (this.started) {
            let origStrokeStyle = this.uiHintsLayerCtx.strokeStyle;

            this.uiHintsLayerCtx.strokeStyle = "blue";

            this.uiHintsLayerCtx.lineWidth = 1;
            this.uiHintsLayerCtx.beginPath();
            this.uiHintsLayerCtx.rect(this.initialX, this.initialY,
                                      offsetX - this.initialX, offsetY - this.initialY);
            this.uiHintsLayerCtx.stroke();

            this.uiHintsLayerCtx.strokeStyle = origStrokeStyle;
        }
    }

    onStop({offsetX, offsetY}) {
        this.clearUiHints();

        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.rect(this.initialX, this.initialY,
                      offsetX - this.initialX, offsetY - this.initialY);
        this.ctx.fill();
        this.ctx.stroke();

        this.started = false;
    }

    clearUiHints() {
        this.uiHintsLayerCtx.clearRect(0,
                                       0,
                                       this.uiHintsLayer.width,
                                       this.uiHintsLayer.height);
    }
}
RectangleTool.title = "Rectangle Tool";
RectangleTool.img = "rectangle.png";
