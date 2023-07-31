const display = document.getElementById("display");
const historyText = document.getElementById("history-text");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const calculateButton = document.querySelector(".calculate");
const decimalButton = document.querySelector(".decimal");

let currentInput = "";
let prevInput = "";
let currentOperator = null;
let history = "";

function updateDisplay() {
  display.value = currentInput;
}

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function selectOperator(operator) {
  if (currentInput === "") return;
  if (prevInput !== "") {
    calculate();
  }
  currentOperator = operator;
  prevInput = currentInput;
  currentInput = "";
  history += `${prevInput} ${currentOperator} `;
  updateDisplay();
}

function calculate() {
  const prev = parseFloat(prevInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;
  switch (currentOperator) {
    case "+":
      currentInput = (prev + current).toString();
      break;
    case "-":
      currentInput = (prev - current).toString();
      break;
    case "x":
      currentInput = (prev * current).toString();
      break;
    case "÷":
      currentInput = (prev / current).toString();
      break;
    default:
      return;
  }
  history += `${current} = ${currentInput}\n`;
  currentOperator = null;
  prevInput = "";
  updateDisplay();
}

function clear() {
  currentInput = "";
  prevInput = "";
  currentOperator = null;
  history = "";
  updateDisplay();
}

// Event listeners for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

// Event listeners for operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectOperator(button.textContent);
  });
});

// Event listener for calculate button
calculateButton.addEventListener("click", calculate);

// Event listener for clear button
clearButton.addEventListener("click", clear);

// Event listener for decimal button
decimalButton.addEventListener("click", () => {
  if (currentInput.includes(".")) return;
  currentInput += ".";
  updateDisplay();
});

// Update history text
function updateHistory() {
  historyText.textContent = history;
}
