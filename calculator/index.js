// import "./style.css";

// document.getElementById("app").innerHTML = ``;
var inputExpresion = document.getElementById("screen-span");

function clicked(element) {
  var currColor = element.style.backgroundColor;
  element.style.backgroundColor = "orange";
  setTimeout(revColor, 100, currColor, element);
}

function revColor(currColor, element) {
  element.style.backgroundColor = currColor;
}

function result() {
  var evaluated = eval(inputExpresion.innerText);
  document.getElementById("screen-span").innerText = evaluated;
}

function solve(val) {
  if(inputExpresion.innerText == "Infinity" || inputExpresion.innerText == "Error") {
    inputExpresion.innerText = "";
  }

  if(inputExpresion.innerText == "" && (val === "%" || val === "*" || val === "/")) {
    inputExpresion.innerText = "Error";
    return;
  }
  inputExpresion.innerText += val;
}

function clearDisplay() {
  inputExpresion.innerText = "";
}

function sign() {
  if (inputExpresion.innerText === "") {
    return;
  } else if(inputExpresion.innerText.length >= 3) {
    var evaluated = eval(inputExpresion.innerText);
    inputExpresion.innerText = evaluated;
  }
  
  if(inputExpresion.innerText.slice(0, 1) === "-") {
    var sliced = inputExpresion.innerText.slice(1, inputExpresion.length);
    inputExpresion.innerText = sliced;
  } else {
    inputExpresion.innerText = "-" + inputExpresion.innerText;
  }
}
