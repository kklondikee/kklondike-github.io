let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    displayValue = localStorage.getItem('displayValue') || '0';
    display.textContent = displayValue;
});

function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = displayValue;
    localStorage.setItem('displayValue', displayValue);
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number.toString();
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number.toString() : displayValue + number.toString();
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function toggleSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

function percent() {
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay();
}

function operate(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculateResult(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculate() {
    const inputValue = parseFloat(displayValue);

    if (operator && !waitingForSecondOperand) {
        displayValue = `${parseFloat(calculateResult(firstOperand, inputValue, operator).toFixed(7))}`;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

function calculateResult(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '×':
            return first * second;
        case '÷':
            return first / second;
        default:
            return second;
    }
}
