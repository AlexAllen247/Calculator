const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) =>
  num2 === 0 ? "Error: Cannot divide by zero" : num1 / num2;

const operate = (operator, num1, num2) => {
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
      throw new Error(`Unknown operator: ${operator}`);
  }
};

const display = document.querySelector(".display p");
let displayValue = "0";
let previousValue = null;
let selectedOperator = null;
let chainOperations = false;

const updateDisplay = (value) => {
  if (value === "=") return;
  displayValue = displayValue === "0" ? value : displayValue + value;
  display.textContent = displayValue;
};

document
  .querySelectorAll(".buttons button:not(.operator)")
  .forEach((button) => {
    button.addEventListener("click", () => updateDisplay(button.textContent));
  });

document.querySelectorAll(".buttons button.operator").forEach((button) => {
  button.addEventListener("click", () => {
    if (previousValue !== null && !chainOperations) {
      const currentNumber = parseFloat(displayValue);
      const result = operate(selectedOperator, previousValue, currentNumber);
      displayValue = result.toFixed(2);
      display.textContent = parseFloat(displayValue);
      previousValue = result;
    } else {
      previousValue = parseFloat(displayValue);
    }

    selectedOperator = button.textContent;
    displayValue = "0";
    chainOperations = false;
  });
});

document.querySelector(".equals").addEventListener("click", () => {
  if (!selectedOperator) return;

  const currentNumber = parseFloat(displayValue);
  const result = operate(selectedOperator, previousValue, currentNumber);
  displayValue = result.toFixed(2);
  display.textContent = parseFloat(displayValue);
  previousValue = result;
  selectedOperator = null;
  chainOperations = false;
});

document.querySelector(".clear").addEventListener("click", () => {
  displayValue = "0";
  previousValue = null;
  selectedOperator = null;
  display.textContent = displayValue;
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    updateDisplay(key);
  } else if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "="
  ) {
    if (key === "=") {
      document.querySelector(".equals").click();
    } else {
      document.querySelector(`button.operator[data-key="${key}"]`).click();
    }
  } else if (key.toLowerCase() === "c") {
    document.querySelector(".clear").click();
  }
});
