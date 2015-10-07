// In stopTool a snapshot of the current canvas would be taken, for
// undo purposes. Add undo option.

// Add UI hints, like the size of the current rectangle. Change the
// cursor shape.

// Add size of pencil.

import MapDiscoverer from "MapDiscoverer";

window.addEventListener("load", () => {
    let app = new MapDiscoverer(document.getElementById("orig-map"),
                                document.getElementById("tools"),
                                document.getElementById("overlay"));

    document.getElementById("new-map-file").addEventListener("change", evt => {
        let file = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = evt => {
            app.loadImage(evt.target.result);
        };
        reader.readAsDataURL(file);
    }, false);
}, false);
