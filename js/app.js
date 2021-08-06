'use strict';
const btnTip = document.querySelectorAll('.js-tip-btn');
const btnReset = document.querySelector('.js-reset-btn');
const btnCalculate = document.querySelector('.js-calculate-btn');
const billAmount = document.querySelector('.js-bill-amount');
const tipPercent = document.querySelector('.js-tip-percent');
const peopleCount = document.querySelector('.js-people-count');
const totalTip = document.querySelector('.js-total-tip');
const totalAmount = document.querySelector('.js-total-amount');
const error = document.querySelector('.js-error');

// Total tip and total amount calculation
const totalTipAndBill = function (tipPercent) {
  // checking for number of people
  if (+peopleCount.value === 0) {
    error.textContent = "can't be zero";
    peopleCount.style.borderColor = 'red';
    return;
  }

  // Reset after first error in people count
  error.textContent = '';
  peopleCount.style.borderColor = 'hsl(172, 67%, 45%)';

  // Calculating tip and bill amount
  const bill = +billAmount.value;
  const persons = +peopleCount.value;

  const tip = bill * tipPercent / 100;
  const total = bill + tip;

  const tipPerPerson = tip / persons;
  const totalPerPerson = total / persons;

  totalTip.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
};

// Predefined tip
const calculatePredefinedTip = function (e) {
  const tip = parseInt(e.textContent);

  totalTipAndBill(tip);
};

// Custom tip calculation
const calculateCustomTip = function () {
  const customTip = +tipPercent.value;

  totalTipAndBill(customTip);
};

// Event listeners
btnCalculate.addEventListener('click', calculateCustomTip);

btnTip.forEach((btn) =>
  btn.addEventListener('click', function (e) {
    calculatePredefinedTip(e.target);
  })
);

btnReset.addEventListener('click', function () {
  billAmount.value = tipPercent.value = 0;
  peopleCount.value = 1;
  totalTip.textContent = '$0.00';
  totalAmount.textContent = '$0.00';
});
