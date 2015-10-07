export class ToggleButton {
    constructor([titleDisabled, titleEnabled], imageUrl, enableF, disableF) {
        this.titleEnabled = titleEnabled;
        this.titleDisabled = titleDisabled;
        this.enableFunction = enableF;
        this.disableFunction = disableF;
        this.buttonText = document.createTextNode("");
        this.domElement = document.createElement("button");

        let buttonImage = document.createElement("img");
        buttonImage.src = imageUrl;
        this.domElement.dataset.enabled = "false";
        this.domElement.appendChild(buttonImage);
        this.domElement.appendChild(this.buttonText);

        this.domElement.addEventListener("click", () => {
            if (this.domElement.dataset.enabled !== "false") {
                this.disable();
            } else {
                this.enable();
            }
        });

        this.disable();
    }

    enable() {
        this.buttonText.textContent = " " + this.titleEnabled;
        this.domElement.dataset.enabled = "true";
        this.enableFunction();
    }

    disable() {
        this.buttonText.textContent = " " + this.titleDisabled;
        this.domElement.dataset.enabled = "false";
        this.disableFunction();
    }
}
