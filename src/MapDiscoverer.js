import PencilTool from "tool/PencilTool";
import RectangleTool from "tool/RectangleTool";
import ToggleButton from "ToggleButton";
import Toolbox from "Toolbox";

export class MapDiscoverer {
    constructor(mapImg, toolsDiv, overlay) {
        this.mapImg = mapImg;
        this.canvasEl = overlay;

        let ctx = overlay.getContext('2d'),
            toolbox = new Toolbox([PencilTool, RectangleTool]);

        this.opacityToggle = new ToggleButton(["Toggle opacity", "Toggle opacity"],
                                              "img/transparency.png",
                                              function() {
                                                  overlay.style.opacity = "1";
                                              },
                                              function() {
                                                  overlay.style.opacity = "";
                                              });
        this.coverToggle = new ToggleButton(["Cover Mode", "Uncover Mode"],
                                            "img/eraser.png",
                                            () => {
                                                ctx.globalCompositeOperation = "source-over";
                                            },
                                            () => {
                                                ctx.globalCompositeOperation = "destination-out";
                                            });
        toolsDiv.appendChild(this.opacityToggle.domElement);
        toolsDiv.appendChild(this.coverToggle.domElement);

        toolbox.install(overlay, toolsDiv);

        this.mapImg.addEventListener("load", () => {
            this.canvasEl.height = this.mapImg.height;
            this.canvasEl.width = this.mapImg.width;
            let ctx = this.canvasEl.getContext('2d');
            ctx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.mapImg.style.visibility = "";

            this.opacityToggle.disable();
            this.coverToggle.disable();
        });

        this.loadImage("img/default-map.png");
    }

    loadImage(imageUrl) {
        this.mapImg.style.visibility = "hidden";
        // Setting "src" will load the image, and the "load" event
        // will take care of the rest
        this.mapImg.src = imageUrl;
    }
}
