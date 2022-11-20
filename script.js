const display = document.querySelector(".display");

var displayValue = 0;
var expression = " ";

document.querySelectorAll(".number").forEach((number) => {
  number.addEventListener("click", function () {
    addNumber(number.innerHTML);
  });
});

document.querySelector(".clear").addEventListener("click", () => {
  displayValue = 0;
  expression = " ";
  display.innerHTML = displayValue;
});

document.querySelector(".plusminus").addEventListener("click", () => {
  displayValue *= -1;
  var arr = expression.split(" ");
  arr[arr.length - 1] *= -1;
  expression = arr.join(" ");
  display.innerHTML = displayValue;
});

document.querySelector(".percnt").addEventListener("click", () => {
  displayValue /= 100;
  var arr = expression.split(" ");
  arr[arr.length - 1] /= 100;
  expression = arr.join(" ");
  display.innerHTML = displayValue;
});

document.querySelector(".divide").addEventListener("click", () => {
  addOperator("/");
});

document.querySelector(".multiply").addEventListener("click", () => {
  addOperator("*");
});

document.querySelector(".minus").addEventListener("click", () => {
  addOperator("-");
});

document.querySelector(".plus").addEventListener("click", () => {
  addOperator("+");
});

document.querySelector(".decimal").addEventListener("click", () => {
  addNumber(".");
});

document.querySelector(".equals").addEventListener("click", () => {
  calculate();
});

function addNumber(num) {
  if (expression.endsWith(".") && num === ".") return;
  if (expression.split(" ").pop().includes(".") && num === ".") return;
  if (displayValue.length >= 12) return;
  expression += num.toString();
  displayValue
    ? (displayValue = displayValue.toString() + num.toString()) // if displayValue is not 0, add num to displayValue
    : (displayValue = num); // if displayValue is 0, then displayValue = num
  display.innerHTML = displayValue;
}

function addOperator(operator) {
  if (
    expression.endsWith(" + ") ||
    expression.endsWith(" - ") ||
    expression.endsWith(" * ") ||
    expression.endsWith(" / ")
  ) {
    expression = expression.slice(0, -3);
  }
  expression += ` ${operator} `;
  displayValue = 0;
  display.innerHTML = displayValue;
}

function calculate() {
  if (!expression) return;
  if (
    expression.endsWith(" + ") ||
    expression.endsWith(" - ") ||
    expression.endsWith(" * ") ||
    expression.endsWith(" / ")
  ) {
    expression = expression.slice(0, -3);
  }
  displayValue = eval(expression).toPrecision();
  if (displayValue.length > 12) {
    displayValue = parseFloat(displayValue).toExponential(4);
  }
  expression = displayValue.toString();
  display.innerHTML = displayValue;
}
