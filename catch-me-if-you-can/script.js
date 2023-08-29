var box = document.getElementById('catch-me-container');

var maxHeight = window.innerHeight;
var maxWidth = window.innerWidth;

box.addEventListener("mouseover", function () {
    var currPos = box.getBoundingClientRect();
    var newPos = getPos(currPos.height, currPos.width);

    box.style.top = newPos.y + "px";
    box.style.left = newPos.x + "px";
});

function getPos(x, y) {
    var newX = Math.random() * maxWidth + 1 - x;
    var newY = Math.random() * maxHeight + 1 - y;

    if(newX < 0) {
        newX = 0;
    }

    if(newY < 0) {
        newY = 0;
    }

    return {
        x: newX,
        y: newY
    };
}