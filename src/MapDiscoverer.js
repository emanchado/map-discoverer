import PencilTool from "tool/PencilTool";
import RectangleTool from "tool/RectangleTool";
import ToggleButton from "ToggleButton";
import Toolbox from "Toolbox";

export class MapDiscoverer {
    constructor(mapImg, toolsDiv, overlay, uiHintsOverlay) {
        this.mapImg = mapImg;
        this.canvasEl = overlay;
        this.uiHintsEl = uiHintsOverlay;
        this.undoActions = [];
        this.stateIndex = -1;

        let ctx = this.canvasEl.getContext("2d"),
            undoButton = this.createButton("Undo", "img/undo.png", () => {
                if (this.stateIndex > 0) {
                    this.stateIndex--;
                    ctx.putImageData(this.undoActions[this.stateIndex], 0, 0);
                }
            }),
            redoButton = this.createButton("Redo", "img/redo.png", () => {
                if (this.stateIndex + 1 < this.undoActions.length) {
                    this.stateIndex++;
                    ctx.putImageData(this.undoActions[this.stateIndex], 0, 0);
                }
            });
        this.toolbox = new Toolbox([PencilTool, RectangleTool]);
        this.opacityToggle = this.createOpacityToggleButton();
        this.coverToggle = this.createCoverToggleButton();

        toolsDiv.appendChild(this.opacityToggle.domElement);
        toolsDiv.appendChild(this.coverToggle.domElement);
        toolsDiv.appendChild(undoButton);
        toolsDiv.appendChild(redoButton);
        this.toolbox.install(this.canvasEl, this.uiHintsEl, toolsDiv);

        this.addCanvasHandlers(this.canvasEl);
        this.addImageLoadHandler(this.mapImg);
        this.loadImage("img/default-map.png");
    }

    createOpacityToggleButton() {
        return new ToggleButton(["Toggle opacity", "Toggle opacity"],
                                "img/transparency.png",
                                () => {
                                    this.canvasEl.style.opacity = "1";
                                },
                                () => {
                                    this.canvasEl.style.opacity = "";
                                });
    }

    createCoverToggleButton() {
        let ctx = this.canvasEl.getContext("2d");

        return new ToggleButton(
            ["Cover Mode", "Uncover Mode"],
            "img/eraser.png",
            () => {
                ctx.globalCompositeOperation = "source-over";
            },
            () => {
                ctx.globalCompositeOperation = "destination-out";
            }
        );
    }

    createButton(title, iconUrl, functionality) {
        let button = document.createElement("button"),
            buttonImg = document.createElement("img");
        buttonImg.src = iconUrl;
        button.appendChild(buttonImg);
        button.appendChild(document.createTextNode(" " + title));
        button.addEventListener("click", functionality);
        return button;
    }

    addCanvasHandlers(canvasEl) {
        let ctx = this.canvasEl.getContext("2d"),
            uiHintsCtx = this.uiHintsEl.getContext("2d");

        canvasEl.addEventListener("mousedown", evt => {
            this.toolbox.currentTool.onStart(evt);
        }, false);
        canvasEl.addEventListener("mouseup", evt => {
            this.toolbox.currentTool.onStop(evt);
            // Take a snapshot of the canvasEl, for undo purposes
            this.stateIndex++;
            this.undoActions = this.undoActions.slice(0, this.stateIndex);
            this.undoActions[this.stateIndex] =
                ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
        }, false);
        canvasEl.addEventListener("mousemove", evt => {
            this.toolbox.currentTool.onMove(evt);
        }, false);
        canvasEl.addEventListener("mouseout", () => {
            uiHintsCtx.clearRect(0,
                                 0,
                                 this.uiHintsEl.width,
                                 this.uiHintsEl.height);
        });
    }

    addImageLoadHandler(imgEl) {
        imgEl.addEventListener("load", () => {
            this.canvasEl.height = imgEl.height;
            this.canvasEl.width = imgEl.width;
            let ctx = this.canvasEl.getContext("2d");
            ctx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);

            this.uiHintsEl.height = imgEl.height;
            this.uiHintsEl.width = imgEl.width;
            let uiHintsCtx = this.uiHintsEl.getContext("2d");
            uiHintsCtx.clearRect(0, 0, this.uiHintsEl.width, this.uiHintsEl.height);

            this.stateIndex = 0;
            this.undoActions = [ctx.getImageData(0,
                                                 0,
                                                 this.canvasEl.width,
                                                 this.canvasEl.height)];
            imgEl.style.visibility = "";

            this.opacityToggle.disable();
            this.coverToggle.disable();
        });
    }

    loadImage(imageUrl) {
        this.mapImg.style.visibility = "hidden";
        // Setting "src" will load the image, and the "load" event
        // will take care of the rest
        this.mapImg.src = imageUrl;
    }
}
