var ball = document.getElementById('ball');
const ballStyle = getComputedStyle(ball);

ball.style.top = ball.offsetTop + "px";
ball.style.left = ball.offsetLeft + "px";

function move(key) {
    let top = parseInt(ball.style.top);
    let left = parseInt(ball.style.left);

    if((key === 'w' || key === 'W') && top > 0) {
        ball.style.top = (top - 5) + "px";
    }

    if((key === 'a' || key === 'A') && left > 0) {
        ball.style.left = (left - 5) + "px";
    }

    if((key === 's' || key === 'S') && ((top + parseInt(ballStyle.height)) < window.innerHeight)) {
        // console.log("top:" + top + ", ball height:" + parseInt(ballStyle.height) + ", " + "window Height:" + window.innerHeight)
        ball.style.top = (top + 5) + "px";
    }

    if((key === 'd' || key === 'D') && ((left + parseInt(ballStyle.width)) < window.innerWidth)) {
        // console.log("left:" + left + ", ball width:" + parseInt(ballStyle.width) + ", " + "window Width:" + window.innerWidth)
        ball.style.left = (left + 5) + "px";
    }
}

window.addEventListener('keypress', function(event) {
    let key = event.key;
    // console.log(key);
    move(key);
});