class Calculator {
  constructor(currentTextField, previousTextField) {
    this.currentTextField = currentTextField;
    this.previousTextField = previousTextField;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = "";
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;

      case "*":
        computation = prev * curr;
        break;

      case "-":
        computation = prev - curr;
        break;

      case "÷":
        computation = prev / curr;
        break;
    }
    this.currentOperand = computation;
    this.operation = "";
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigit = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigit)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigit.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentTextField.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousTextField.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    }
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const equalButton = document.querySelector("[data-equal]");
const currentTextField = document.querySelector("[data-current-operand]");
const previousTextField = document.querySelector("[data-previous-operand]");

const calculator = new Calculator(currentTextField, previousTextField);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
