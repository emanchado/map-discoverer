// In stopTool a snapshot of the current canvas would be taken, for
// undo purposes. Add undo option.

// Add UI hints, like the size of the current rectangle. Change the
// cursor shape.

// Add size of pencil.

import PencilTool from "tool/PencilTool";
import RectangleTool from "tool/RectangleTool";
import ToggleButton from "ToggleButton";
import Toolbox from "Toolbox";

function loadImage(imgEl, canvasEl, imageUrl) {
    imgEl.style.visibility = "hidden";
    imgEl.src = imageUrl;

    canvasEl.height = imgEl.height;
    canvasEl.width = imgEl.width;
    let ctx = canvasEl.getContext('2d');
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    imgEl.style.visibility = "";
}

window.addEventListener("load", function(/*e*/) {
    let mapImg = document.getElementById("orig-map"),
        overlay = document.getElementById("overlay"),
        ctx = overlay.getContext('2d'),
        toolsDiv = document.getElementById("tools"),
        toolbox = new Toolbox([PencilTool, RectangleTool]);

    let opacityToggle = new ToggleButton(["Toggle opacity", "Toggle opacity"],
                                         "img/transparency.png",
                                         function() {
                                             overlay.style.opacity = "1";
                                         },
                                         function() {
                                             overlay.style.opacity = "";
                                         }),
        coverToggle = new ToggleButton(["Cover Mode", "Uncover Mode"],
                                       "img/eraser.png",
                                       function() {
                                           ctx.globalCompositeOperation = "source-over";
                                       },
                                       function() {
                                           ctx.globalCompositeOperation = "destination-out";
                                       });
    toolsDiv.appendChild(opacityToggle.domElement);
    toolsDiv.appendChild(coverToggle.domElement);

    toolbox.install(overlay, toolsDiv);
    loadImage(mapImg, overlay, "img/default-map.png");
    opacityToggle.disable();
    coverToggle.disable();
    document.getElementById("new-map-file").addEventListener("change", evt => {
        let file = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = evt => {
            loadImage(mapImg, overlay, evt.target.result);
            opacityToggle.disable();
            coverToggle.disable();
        };
        reader.readAsDataURL(file);
    }, false);
}, false);
