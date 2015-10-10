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

        this.tools = []; this.toolButtons = [];
        for (let toolClass of this.toolList) {
            let tool = new toolClass(this.canvas),
                buttonEl = this.createToolButton(tool);

            this.tools.push(tool);
            this.toolButtons.push(buttonEl);
            this.toolsDiv.appendChild(buttonEl);
        }
        this.currentTool = this.tools[0];
        this.toolButtons[0].classList.add("active");
    }

    createToolButton(tool) {
        let toolClass = tool.constructor,
            buttonDomEl = document.createElement("button"),
            toolIconEl = document.createElement("img"),
            self = this;

        toolIconEl.src = "img/" + toolClass.img;
        toolIconEl.alt = "";

        buttonDomEl.appendChild(toolIconEl);
        buttonDomEl.appendChild(document.createTextNode(" " + toolClass.title));
        buttonDomEl.addEventListener("click", function () {
            self.currentTool = tool;
            for (let button of self.toolButtons) {
                button.classList.remove("active");
            }
            buttonDomEl.classList.add("active");
        }, false);

        return buttonDomEl;
    }
}
