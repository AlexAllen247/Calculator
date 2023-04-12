let firstNumber = 0;
let operator = "";
let secondNumber = 0;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Error: Cannot divide by zero";
  } else {
    return num1 / num2;
  }
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
}

const display = document.querySelector(".display p");
let displayValue = "0";

function updateDisplay(value) {
  if (displayValue === "0") {
    displayValue = value;
  } else {
    displayValue += value;
  }
  display.textContent = displayValue;
}

const numberButtons = document.querySelectorAll(
  ".buttons button:not(.operator)"
);
numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    updateDisplay(button.textContent);
  });
});

const operatorButtons = document.querySelectorAll(".buttons button.operator");
let previousValue = null;
let selectedOperator = null;
let currentNumber = "0";

operatorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    previousValue = parseFloat(displayValue);
    selectedOperator = button.textContent;
    displayValue = "0";
    currentNumber = "0";
  });
});

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", function () {
  if (!selectedOperator) {
    return;
  }

  currentNumber = parseFloat(displayValue);
  const result = operate(selectedOperator, previousValue, currentNumber);
  displayValue = result.toFixed(2);
  const finalResult = parseFloat(displayValue);
  display.textContent = finalResult;
  previousValue = result;
  selectedOperator = null;
  currentNumber = "0";
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", function () {
  displayValue = "0";
  previousValue = null;
  selectedOperator = null;
  currentNumber = "0";
  display.textContent = displayValue;
});

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", function () {
  displayValue = displayValue.slice(0, -1);
  if (displayValue.length === 0) {
    displayValue = "0";
  }
  display.textContent = displayValue;
});
