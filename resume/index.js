
// For Navigation Smooth Scroll
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
var interval;


for (var i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener('click', function (event) {
        event.preventDefault();
        var targetSectionID = this.textContent.trim().toLowerCase();
        console.log(this.textContent);
        var targetSection = document.getElementById(targetSectionID);
        console.log(targetSection);
        //    interval = setInterval(scrollVertically, 20, targetSection);

        interval = setInterval(function () {
            scrollVertically(targetSection);
        }, 20);
    });
}


function scrollVertically(targetSection) {
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if (targetSectionCoordinates.top <= 0) {
        clearInterval(interval);
        return;
    }
    window.scrollBy(0, 50);
}


// For Smooth progress bar in Skills
var progressBars = document.querySelectorAll('.skill-progress > div');
var skillContainer = document.getElementById('display-container');
var animationStatus = [];
for(let i = 0; i < progressBars.length; i++) {
    animationStatus[i] = false;
}

function removeBars() {
    for(let bar of progressBars) {
        bar.style.width = 0 + '%';
    }
}

removeBars();

function removeBar(i) {
        progressBars[i].style.width = 0 + '%';
}

function fillBar(i) {
    let percentage = progressBars[i].getAttribute('data-bar-width');
    let currWidth = 0;
    let filing = setInterval(function () {
        if(currWidth > percentage) {
            clearInterval(filing);
            return;
        }
        currWidth++;
        progressBars[i].style.width = currWidth + '%';
    }, 5);      
}

function scrolling() {
    var coordinates;
    for(let i = 0; i < progressBars.length; i++) {
        coordinates = progressBars[i].getBoundingClientRect();
        if(!animationStatus[i] && coordinates.top <= window.innerHeight) { //innerHeight gives vh
            animationStatus[i] = true;
            fillBar(i);
        } else if(coordinates.top > window.innerHeight) {
            animationStatus[i] = false;
            removeBar(i);
        }
    }
}

window.addEventListener('scroll', scrolling);



