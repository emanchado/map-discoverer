export class Toolbox {
    constructor(toolList) {
        if (!toolList.length) {
            throw new Error("Need at least one tool!");
        }
        this.toolList = toolList;
    }

    install(canvas, toolsDiv) {
        this.canvas = canvas;
        this.toolsDiv = toolsDiv;

        this.tools = [];
        for (let toolClass of this.toolList) {
            let tool = new toolClass(this.canvas);
            this.createToolButton(tool);
            this.tools.push(tool);
        }
        this.currentTool = this.tools[0];

        this.canvas.addEventListener("mousedown", evt => {
            this.currentTool.onStart(evt);
        }, false);
        this.canvas.addEventListener("mouseup", evt => {
            this.currentTool.onStop(evt);
        }, false);
        this.canvas.addEventListener("mousemove", evt => {
            this.currentTool.onMove(evt);
        }, false);
    }

    createToolButton(tool) {
        let toolClass = tool.constructor,
            buttonDomEl = document.createElement("button"),
            toolIconEl = document.createElement("img"),
            self = this;

        buttonDomEl.id = toolClass.name.toLowerCase() + "-btn";
        toolIconEl.src = "img/" + toolClass.img;
        toolIconEl.alt = "";

        buttonDomEl.appendChild(toolIconEl);
        buttonDomEl.appendChild(document.createTextNode(" " + toolClass.title));
        buttonDomEl.addEventListener("click", function () {
            self.currentTool = tool;
        }, false);

        this.toolsDiv.appendChild(buttonDomEl);
    }
}
