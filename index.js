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
      return add(parseFloat(firstNumber), parseFloat(secondNumber));
    case "-":
      return subtract(parseFloat(firstNumber), parseFloat(secondNumber));
    case "*":
      return multiply(parseFloat(firstNumber), parseFloat(secondNumber));
    case "/":
      return divide(parseFloat(firstNumber), parseFloat(secondNumber));
    default:
      return "Invalid operator";
  }
}

let display = document.querySelector(".display");
let displayValue = "";
let pendingOperation = false; //no pending operation at the start

let buttons = document.querySelectorAll("button");

function populateDisplay() {
  //for each of the buttons in the calculator
  buttons.forEach((button) => {
    if (button.classList.contains("number")) {
      button.addEventListener("click", (e) => {
        //if there is already a pending operation, add the number to the first number and the operator
        if (pendingOperation) {
          displayValue += e.target.textContent;
          display.textContent =
            firstNumber + " " + operator + " " + displayValue; // show the whole operation

          //if there is no pending operation, just add the number to the display
        } else {
          displayValue += e.target.textContent;
          display.textContent = displayValue; //only update the display with the number
        }
      });
    } else if (button.classList.contains("operator")) {
      button.addEventListener("click", (e) => {
        if (pendingOperation && firstNumber && displayValue) {
          //perform the operation first
          let result = operate(firstNumber, displayValue, operator).toString();
          display.textContent = result;

          //result is used for the next operation
          firstNumber = result;
          operator = e.target.textContent;
          displayValue = "";
          display.textContent = firstNumber + " " + operator;

          //if there is no pending operation, just set the operator
        } else if (!pendingOperation) {
          firstNumber = displayValue;
          operator = e.target.textContent;
          pendingOperation = true;
          displayValue = "";
          display.textContent = firstNumber + " " + operator;
        }
      });
    } else if (button.classList.contains("equals")) {
      button.addEventListener("click", () => {
        if (!firstNumber || !operator || !displayValue) {
          //if any of the components are missing, do nothing
          return;
        }
        if (displayValue === "0" && operator === "/") {
          displayValue = "Error: Division by zero";
          display.textContent = displayValue;
          alert("⛔️ Error: Division by zero");
          clearDisplay();
          display.textContent = "0";
        } else {
          displayValue = operate(
            firstNumber,
            displayValue,
            operator
          ).toString(); // Perform the operation
          display.textContent = displayValue; // Display the result

          //reset for next operation
          firstNumber = "";
          operator = "";
          pendingOperation = false; //no operation pending anymore, only the result is on the display
        }
      });
    } else if (button.classList.contains("clear")) {
      button.addEventListener("click", () => {
        clearDisplay();
      });
    }
  });
}

function clearDisplay() {
  displayValue = "";
  firstNumber = "";
  operator = "";
  pendingOperation = false;
  display.textContent = "0";
}

populateDisplay();
