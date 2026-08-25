const MAX_DISPLAY_LENGTH = 12;

export function calculateBinary(operator, left, right) {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return right === 0 ? null : left / right;
    default:
      return right;
  }
}

function formatValue(value) {
  if (value === null || Number.isNaN(value) || !Number.isFinite(value)) {
    return 'Error';
  }

  const formatted = Number(value.toPrecision(MAX_DISPLAY_LENGTH)).toString();
  return formatted.length > MAX_DISPLAY_LENGTH
    ? Number(value).toExponential(6)
    : formatted;
}

export class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.displayValue = '0';
    this.previousValue = null;
    this.operator = null;
    this.waitingForOperand = false;
    return this.displayValue;
  }

  inputDigit(digit) {
    if (this.displayValue === 'Error') {
      return this.clear() && this.inputDigit(digit);
    }

    if (this.waitingForOperand) {
      this.displayValue = digit;
      this.waitingForOperand = false;
      return this.displayValue;
    }

    this.displayValue =
      this.displayValue === '0' ? digit : `${this.displayValue}${digit}`;
    return this.displayValue;
  }

  inputDecimal() {
    if (this.displayValue === 'Error') {
      return this.clear() && this.inputDecimal();
    }

    if (this.waitingForOperand) {
      this.displayValue = '0.';
      this.waitingForOperand = false;
      return this.displayValue;
    }

    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }

    return this.displayValue;
  }

  toggleSign() {
    if (this.displayValue !== '0' && this.displayValue !== 'Error') {
      this.displayValue = this.displayValue.startsWith('-')
        ? this.displayValue.slice(1)
        : `-${this.displayValue}`;
    }

    return this.displayValue;
  }

  percent() {
    if (this.displayValue === 'Error') {
      return this.displayValue;
    }

    this.displayValue = formatValue(Number(this.displayValue) / 100);
    return this.displayValue;
  }

  setOperator(nextOperator) {
    const inputValue = Number(this.displayValue);

    if (this.operator && !this.waitingForOperand) {
      const result = calculateBinary(this.operator, this.previousValue, inputValue);
      this.displayValue = formatValue(result);
      this.previousValue = result;
    } else {
      this.previousValue = inputValue;
    }

    this.operator = nextOperator;
    this.waitingForOperand = true;
    return this.displayValue;
  }

  evaluate() {
    if (!this.operator || this.waitingForOperand || this.previousValue === null) {
      return this.displayValue;
    }

    const result = calculateBinary(
      this.operator,
      this.previousValue,
      Number(this.displayValue)
    );

    this.displayValue = formatValue(result);
    this.previousValue = null;
    this.operator = null;
    this.waitingForOperand = false;
    return this.displayValue;
  }
}
