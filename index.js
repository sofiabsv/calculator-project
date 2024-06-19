function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let firstNumber;
let secondNumber;
let operator;

function operate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      add(firstNumber, secondNumber);
      break;
    case "-":
      subtract(firstNumber, secondNumber);
      break;
    case "*":
      multiply(firstNumber, secondNumber);
      break;
    case "/":
      divide(firstNumber, secondNumber);
      break;
    default:
      return "Invalid operator";
  }
}

let display = document.querySelector(".display");
let displayValue = "";

let buttons = document.querySelectorAll("button");

function populateDisplay() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      displayValue += e.target.textContent;
      display.textContent = displayValue;
    });
  });
}

populateDisplay();
