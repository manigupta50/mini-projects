window.onload = function() {
    displayCurrentTime();
};
const appendZero = value => value < 10 && value >= 0 ? "0" + value : value;
let alarmsArray = [];

//Function to Display Current Time
function displayCurrentTime() {
    let date = new Date();
    let hours24 = date.getHours();
    let hours12 = appendZero(hours24 > 12 ? hours24 -12 : hours24);
    let minutes = appendZero(date.getMinutes());
    let seconds = appendZero(date.getSeconds());
    let amPm = date.getHours() >= 12 ? "PM" : "AM";
    let liveTime = document.querySelector('#live-time span');

    liveTime.innerText = hours12 + ":" + minutes + ":" + seconds + " " + amPm;

    //Iteration on Arrays of Alarm to check if the current time matches with any alarm
    alarmsArray.forEach(function(value) {
        if(hours12 + ":" + minutes + ":" + seconds + " " + amPm === value) {
            alert("Alarm Ringing");

        }
    });

    //Loop to fetch and update current time
    setInterval(function() {
        displayCurrentTime();
    }, 1000);
}

//Delete Element Function
const deleteAlarm = (e) => {
    e.target.parentElement.remove();
}

//Function to create an Alarm
const hourInput = document.getElementById('hour-input');
const minuteInput = document.getElementById('minute-input');
const setAlarm = document.getElementById('add-alarm');
const alarmList = document.getElementById('alarm-list');
const amPmAlarm = document.getElementById('am-pm');
setAlarm.addEventListener('click', createAlarm);
function createAlarm() {
    let hour = appendZero(hourInput.value);
    let minutes = appendZero(minuteInput.value);
    let seconds = appendZero(0);
    let pmAm = amPmAlarm.value;
    // let id = pmAm + hour + minutes;

    //Validation check on AM and PM
    if(pmAm === 'AM' || pmAm === 'PM') {
        // continue;
    } else {
        alert('Enter AM or PM');
        return;       
    }
    
    //Alarm div
    let alarmDiv = document.createElement('div');
    alarmDiv.classList.add('alarm');
    // alarmDiv.setAttribute('data-id', id);
    alarmDiv.innerHTML = `<span>${hour}:${minutes} ${pmAm}</span>`;

    let delButton = document.createElement('Button');
    // delButton.setAttribute('type', 'button');
    delButton.innerHTML = 'Delete';
    delButton.classList.add('deleteButton');

    alarmDiv.appendChild(delButton);
    alarmList.appendChild(alarmDiv);

    alarmsArray.push(hour + ":" + minutes + ":" + seconds + " " + pmAm);

    delButton.addEventListener('click', (e) => deleteAlarm(e));
}
