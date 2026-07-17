import { Calculator } from './calculator.js';

const calculator = new Calculator();
const display = document.querySelector('#display');

function updateDisplay() {
  display.textContent = calculator.displayValue;
}

function handleAction(action, value) {
  switch (action) {
    case 'digit':
      calculator.inputDigit(value);
      break;
    case 'decimal':
      calculator.inputDecimal();
      break;
    case 'operator':
      calculator.setOperator(value);
      break;
    case 'equals':
      calculator.evaluate();
      break;
    case 'clear':
      calculator.clear();
      break;
    case 'toggle-sign':
      calculator.toggleSign();
      break;
    case 'percent':
      calculator.percent();
      break;
    default:
      break;
  }

  updateDisplay();
}

document.querySelector('.buttons').addEventListener('click', (event) => {
  const button = event.target.closest('button');

  if (!button) {
    return;
  }

  handleAction(button.dataset.action, button.dataset.value);
});

window.addEventListener('keydown', (event) => {
  if (/^[0-9]$/.test(event.key)) {
    handleAction('digit', event.key);
  } else if (event.key === '.') {
    handleAction('decimal');
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    handleAction('operator', event.key);
  } else if (event.key === 'Enter' || event.key === '=') {
    handleAction('equals');
  } else if (event.key === 'Escape') {
    handleAction('clear');
  }
});

updateDisplay();
