
var canvas, ctx, draw;
var width = 400;
var height = 400;
var TAU = Math.PI * 2;
var useStroke = true;
var useFill = true;
var drawId;
var DEFAULT_FRAME_RATE = 60;
var mouseX = 0;
var mouseY = 0;
var CENTER = "center";
var RIGHT = "right";
var LEFT = "left";
var MIDDLE = "middle";
var SPACE = 32;
var currentFont = "Arial";
var mouseReleased;
var mousePressed;
var mouseClicked;
var keyPressed;
var keyReleased;
var key;
var mouseIsPressed = false;
var _date = new Date();

function print(s) {
    console.log(s);
}

// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function color(r, g, b) {
    if (g === undefined) {
        g = r;
    }
    if (b === undefined) {
        b = r;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function lerpColor(c1, c2, amount) {
    return c1;
}

function frameRate(rate) {
    if(!rate){rate=DEFAULT_FRAME_RATE}
    if (drawId) clearInterval(drawId);
    drawId = setInterval(function(){requestAnimationFrame(draw)}, 1000/rate);
}

function noLoop() {
    if (drawId) clearInterval(drawId);
}

function setMousePos(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
}

function size(w, h) {
    width = w;
    height = h;
    canvas.width = width;
    canvas.height = height;
}

function initGraphics(w, h, id) {
    width = w;
    height = h;
    if (!id) {id="canvas1";}
    canvas = document.getElementById(id);

    if (!canvas) {
        print("Failed to get canvas element.");
        return;
    }

    ctx = canvas.getContext("2d");

    if (!ctx) {
        print("Failed to get canvas context");
        return;
    }

    // Event listeners
    window.addEventListener("keydown", function(e) {
        key = e.keyCode;
        if(keyPressed) {
            keyPressed();
        }
    });
    window.addEventListener("keyup", function(e) {
        key = e.keyCode;
        if (keyReleased) {
            keyReleased();
        }
    });
    canvas.addEventListener("mousemove", function(e){setMousePos(e);});
    canvas.addEventListener("mouseup", function(e){mouseIsPressed = false; if(mouseReleased){mouseReleased();}});
    canvas.addEventListener("mousedown", function(e){mouseIsPressed = true; if(mouseClicked){mouseClicked();}if(mousePressed){mousePressed();}});
    window.addEventListener("load", function() {
        frameRate();
    });

    size(width, height);
}
initGraphics(width, height);

function pushMatrix() {
    ctx.save();
}

function popMatrix() {
    ctx.restore();
}

function translate(x, y) {
    ctx.translate(x, y);
}

function scale(x, y) {
    ctx.scale(x, y);
}

function rotate(t) {
    ctx.rotate(t);
}

// http://www.w3schools.com/tags/canvas_fillstyle.asp
function background(r, g, b) {
    fill(r, g, b);
    ctx.fillRect(0, 0, width, height);
}

function fill(r, g, b) {
    if (typeof r === "string") {
        ctx.fillStyle = r;
        return;
    }
    else if (g === undefined) {
        g = r;
        b = r;
    }
    ctx.fillStyle = color(r, g, b);
    useFill = true;
}

function stroke(r, g, b) {
    if (typeof r === "string") {
        ctx.strokeStyle = r;
        return;
    }
    else if (g === undefined) {
        g = r;
        b = r;
    }
    ctx.strokeStyle = color(r, g, b);
    useStroke = true
}

function strokeWeight(w) {
    ctx.lineWidth = w;
}

function noFill() {
    useFill = false;
}

function noStroke() {
    useStroke = false;
}

function rect(x, y, w, h, r) {
    if (r !== undefined) {
        // Draw a rounded rectangle
    }
    else {
        if (useFill) ctx.fillRect(x, y, w, h);
        if (useStroke) ctx.strokeRect(x, y, w, h);
    }
}

// http://www.williammalone.com/briefs/how-to-draw-ellipse-html5-canvas/
function ellipse(x, y, w, h) {
    if (x + w/2 < 0) {return;}
    if (y + h/2 < 0) {return;}
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1.0, h / w);
    ctx.beginPath();
    ctx.arc(0, 0, w / 2, 0, Math.PI*2, false);
    if (useFill) ctx.fill();
    if (useStroke) ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

function point(x, y) {
    rect(x, y, 1, 1);
}

function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function triangle(x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    if (useFill) ctx.fill();
    if (useStroke) ctx.stroke();
}

function bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    ctx.stroke();
}

var floor = Math.floor;
var cos = Math.cos;
var sin = Math.sin;
var max = Math.max;
var min = Math.min;

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function millis() {
    return (new Date() - _date);
}

function random(a, b) {
    if (b === undefined) {
        return Math.random() * a;
    }
    return a + Math.random() * (b - a);
}

function arc() {

}

function atan2(y, x) {
    return Math.atan2(y, x);
}

function textAlign(align, valign) {
    if (!valign) {valign="alphabetic";}
    if (valign === CENTER) {
        valign = MIDDLE;
    }
    ctx.textAlign = align;
    ctx.textBaseline = valign
}

function textFont(fontName, size) {
    ctx.font = size + "px " + fontName;
}

function textSize(size) {
    textFont(currentFont, size);
}

function text(text, x, y) {
    if (useFill) ctx.fillText(text, x, y);
    if (useStroke) ctx.strokeText(text, x, y);
}

function arc(x, y, width, height, start, stop) {
    ctx.beginPath();
    ctx.arc(x, y, width / 2, start, stop);
    ctx.closePath();
    if (useFill) ctx.fill();
    if (useStroke) ctx.stroke();
}

function loadImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}

function image(img, x, y, width, height) {
    if (width && height) {ctx.drawImage(img, x, y, width, height);}
    else{ctx.drawImage(img, x, y);}
}
