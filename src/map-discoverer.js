// In stopTool a snapshot of the current canvas would be taken, for
// undo purposes. Add undo option.

// Add UI hints, like the size of the current rectangle. Change the
// cursor shape.

// Add size of pencil.

import PencilTool from "tool/PencilTool";
import RectangleTool from "tool/RectangleTool";
import Toolbox from "Toolbox";

function loadImage(imgEl, canvasEl, imageUrl) {
    imgEl.style.visibility = "hidden";
    imgEl.src = imageUrl;

    canvasEl.height = imgEl.height;
    canvasEl.width = imgEl.width;
    let ctx = canvasEl.getContext('2d');
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.globalCompositeOperation = "destination-out";
    let showHideBtn = document.getElementById("show-hide-btn"),
        showHideBtnText = document.getElementById("show-hide-btn-text");
    showHideBtnText.textContent = 'Uncover Mode';
    showHideBtn.dataset.mode = 'uncover';
    let overlay = document.getElementById("overlay");
    overlay.style.opacity = "";

    imgEl.style.visibility = "";
}

window.addEventListener("load", function(/*e*/) {
    let mapImg = document.getElementById("orig-map"),
        canvas = document.getElementById("overlay"),
        ctx = canvas.getContext('2d'),
        toolbox = new Toolbox(canvas, [PencilTool, RectangleTool]);

    loadImage(mapImg, canvas, "img/default-map.png");
    document.getElementById("new-map-file").addEventListener("change", evt => {
        let file = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = evt => {
            loadImage(mapImg, canvas, evt.target.result);
        };
        reader.readAsDataURL(file);
    }, false);

    let toggleBtn = document.getElementById("toggle-transparency-btn"),
        overlay = document.getElementById("overlay");
    toggleBtn.addEventListener("click", function(/*e*/) {
        if (overlay.style.opacity) {
            overlay.style.opacity = "";
        } else {
            overlay.style.opacity = "1";
        }
    });

    let showHideBtn = document.getElementById("show-hide-btn"),
        showHideBtnText = document.getElementById("show-hide-btn-text");
    showHideBtn.addEventListener("click", function(/*e*/) {
        if (showHideBtn.dataset.mode === 'uncover') {
            showHideBtnText.textContent = 'Cover Mode';
            showHideBtn.dataset.mode = 'cover';
            ctx.globalCompositeOperation = "source-over";
        } else {
            showHideBtnText.textContent = 'Uncover Mode';
            showHideBtn.dataset.mode = 'uncover';
            ctx.globalCompositeOperation = "destination-out";
        }
    });
}, false);
