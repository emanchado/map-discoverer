"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapDiscoverer = (function () {
    function MapDiscoverer(mapImg, toolsDiv, overlay) {
        var _this = this;

        _classCallCheck(this, MapDiscoverer);

        this.mapImg = mapImg;
        this.canvasEl = overlay;

        var ctx = overlay.getContext('2d'),
            toolbox = new Toolbox([PencilTool, RectangleTool]);

        this.opacityToggle = new ToggleButton(["Toggle opacity", "Toggle opacity"], "img/transparency.png", function () {
            overlay.style.opacity = "1";
        }, function () {
            overlay.style.opacity = "";
        });
        this.coverToggle = new ToggleButton(["Cover Mode", "Uncover Mode"], "img/eraser.png", function () {
            ctx.globalCompositeOperation = "source-over";
        }, function () {
            ctx.globalCompositeOperation = "destination-out";
        });
        toolsDiv.appendChild(this.opacityToggle.domElement);
        toolsDiv.appendChild(this.coverToggle.domElement);

        toolbox.install(overlay, toolsDiv);

        this.mapImg.addEventListener("load", function () {
            _this.canvasEl.height = _this.mapImg.height;
            _this.canvasEl.width = _this.mapImg.width;
            var ctx = _this.canvasEl.getContext('2d');
            ctx.fillRect(0, 0, _this.canvasEl.width, _this.canvasEl.height);
            _this.mapImg.style.visibility = "";

            _this.opacityToggle.disable();
            _this.coverToggle.disable();
        });

        this.loadImage("img/default-map.png");
    }

    _createClass(MapDiscoverer, [{
        key: "loadImage",
        value: function loadImage(imageUrl) {
            this.mapImg.style.visibility = "hidden";
            // Setting "src" will load the image, and the "load" event
            // will take care of the rest
            this.mapImg.src = imageUrl;
        }
    }]);

    return MapDiscoverer;
})();
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToggleButton = (function () {
    function ToggleButton(_ref, imageUrl, enableF, disableF) {
        var _ref2 = _slicedToArray(_ref, 2);

        var titleDisabled = _ref2[0];
        var titleEnabled = _ref2[1];

        var _this = this;

        _classCallCheck(this, ToggleButton);

        this.titleEnabled = titleEnabled;
        this.titleDisabled = titleDisabled;
        this.enableFunction = enableF;
        this.disableFunction = disableF;
        this.buttonText = document.createTextNode("");
        this.domElement = document.createElement("button");

        var buttonImage = document.createElement("img");
        buttonImage.src = imageUrl;
        this.domElement.dataset.enabled = "false";
        this.domElement.appendChild(buttonImage);
        this.domElement.appendChild(this.buttonText);

        this.domElement.addEventListener("click", function () {
            if (_this.domElement.dataset.enabled !== "false") {
                _this.disable();
            } else {
                _this.enable();
            }
        });

        this.disable();
    }

    _createClass(ToggleButton, [{
        key: "enable",
        value: function enable() {
            this.buttonText.textContent = " " + this.titleEnabled;
            this.domElement.dataset.enabled = "true";
            this.enableFunction();
        }
    }, {
        key: "disable",
        value: function disable() {
            this.buttonText.textContent = " " + this.titleDisabled;
            this.domElement.dataset.enabled = "false";
            this.disableFunction();
        }
    }]);

    return ToggleButton;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolbox = (function () {
    function Toolbox(toolList) {
        _classCallCheck(this, Toolbox);

        if (!toolList.length) {
            throw new Error("Need at least one tool!");
        }
        this.toolList = toolList;
    }

    _createClass(Toolbox, [{
        key: "install",
        value: function install(canvas, toolsDiv) {
            var _this = this;

            this.canvas = canvas;
            this.toolsDiv = toolsDiv;

            this.tools = [];this.toolButtons = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.toolList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var toolClass = _step.value;

                    var tool = new toolClass(this.canvas),
                        buttonEl = this.createToolButton(tool);

                    this.tools.push(tool);
                    this.toolButtons.push(buttonEl);
                    this.toolsDiv.appendChild(buttonEl);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.currentTool = this.tools[0];
            this.toolButtons[0].classList.add("active");

            this.canvas.addEventListener("mousedown", function (evt) {
                _this.currentTool.onStart(evt);
            }, false);
            this.canvas.addEventListener("mouseup", function (evt) {
                _this.currentTool.onStop(evt);
            }, false);
            this.canvas.addEventListener("mousemove", function (evt) {
                _this.currentTool.onMove(evt);
            }, false);
        }
    }, {
        key: "createToolButton",
        value: function createToolButton(tool) {
            var toolClass = tool.constructor,
                buttonDomEl = document.createElement("button"),
                toolIconEl = document.createElement("img"),
                self = this;

            toolIconEl.src = "img/" + toolClass.img;
            toolIconEl.alt = "";

            buttonDomEl.appendChild(toolIconEl);
            buttonDomEl.appendChild(document.createTextNode(" " + toolClass.title));
            buttonDomEl.addEventListener("click", function () {
                self.currentTool = tool;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = self.toolButtons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var button = _step2.value;

                        button.classList.remove("active");
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                            _iterator2["return"]();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                buttonDomEl.classList.add("active");
            }, false);

            return buttonDomEl;
        }
    }]);

    return Toolbox;
})();
"use strict";

window.addEventListener("load", function () {
    var app = new MapDiscoverer(document.getElementById("orig-map"), document.getElementById("tools"), document.getElementById("overlay"));

    document.getElementById("new-map-file").addEventListener("change", function (evt) {
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            app.loadImage(evt.target.result);
        };
        reader.readAsDataURL(file);
    }, false);
}, false);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PencilTool = (function () {
    function PencilTool(canvas) {
        _classCallCheck(this, PencilTool);

        this.ctx = canvas.getContext('2d');
        this.started = false;
    }

    _createClass(PencilTool, [{
        key: "onStart",
        value: function onStart(_ref) {
            var offsetX = _ref.offsetX;
            var offsetY = _ref.offsetY;

            this.started = true;

            this.ctx.fillStyle = "rgba(0,0,0,1)";
            this.ctx.beginPath();
            this.ctx.arc(offsetX, offsetY, 20, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }, {
        key: "onMove",
        value: function onMove(_ref2) {
            var offsetX = _ref2.offsetX;
            var offsetY = _ref2.offsetY;

            if (!this.started) {
                return;
            }

            this.ctx.fillStyle = "rgba(0,0,0,1)";
            this.ctx.beginPath();
            this.ctx.arc(offsetX, offsetY, 20, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }, {
        key: "onStop",
        value: function onStop() /*evt*/{
            this.started = false;
        }
    }]);

    return PencilTool;
})();

PencilTool.title = "Pencil Tool";
PencilTool.img = "pencil.png";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RectangleTool = (function () {
    function RectangleTool(canvas) {
        _classCallCheck(this, RectangleTool);

        this.ctx = canvas.getContext('2d');
    }

    _createClass(RectangleTool, [{
        key: "onStart",
        value: function onStart(_ref) {
            var offsetX = _ref.offsetX;
            var offsetY = _ref.offsetY;
            var _ref2 = [offsetX, offsetY];
            this.initialX = _ref2[0];
            this.initialY = _ref2[1];
        }
    }, {
        key: "onMove",
        value: function onMove() /*evt*/{}
    }, {
        key: "onStop",
        value: function onStop(_ref3) {
            var offsetX = _ref3.offsetX;
            var offsetY = _ref3.offsetY;

            this.ctx.beginPath();
            this.ctx.rect(this.initialX, this.initialY, offsetX - this.initialX, offsetY - this.initialY);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }]);

    return RectangleTool;
})();

RectangleTool.title = "Rectangle Tool";
RectangleTool.img = "rectangle.png";
