import test from 'node:test';
import assert from 'node:assert/strict';

import { Calculator, calculateBinary } from './calculator.js';

test('calculateBinary handles basic arithmetic', () => {
  assert.equal(calculateBinary('+', 4, 5), 9);
  assert.equal(calculateBinary('-', 9, 3), 6);
  assert.equal(calculateBinary('*', 7, 6), 42);
  assert.equal(calculateBinary('/', 8, 2), 4);
});

test('division by zero returns error state after evaluation', () => {
  const calculator = new Calculator();
  calculator.inputDigit('8');
  calculator.setOperator('/');
  calculator.inputDigit('0');

  assert.equal(calculator.evaluate(), 'Error');
});

test('calculator chains operations', () => {
  const calculator = new Calculator();
  calculator.inputDigit('7');
  calculator.setOperator('+');
  calculator.inputDigit('3');
  calculator.setOperator('*');
  calculator.inputDigit('2');

  assert.equal(calculator.evaluate(), '20');
});

test('decimal input is preserved', () => {
  const calculator = new Calculator();
  calculator.inputDigit('1');
  calculator.inputDecimal();
  calculator.inputDigit('5');

  assert.equal(calculator.displayValue, '1.5');
});
