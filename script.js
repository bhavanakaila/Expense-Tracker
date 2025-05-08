// Get references to the DOM elements
const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// Initialize variables
let transactions = [];
let balance = 0;
let income = 0;
let expense = 0;

// Function to update the UI (balance, income, expense)
function updateUI() {
  balanceElement.textContent = `₹${balance}`;
  incomeElement.textContent = `₹${income}`;
  expenseElement.textContent = `₹${expense}`;

  // Update transaction history
  transactionList.innerHTML = '';
  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.classList.add(transaction.amount > 0 ? 'income' : 'expense');
    li.innerHTML = `
      <span>${transaction.description}</span>
      <span>₹${transaction.amount}</span>
    `;
    transactionList.appendChild(li);
  });
}

// Function to handle form submission
function addTransaction(event) {
  event.preventDefault();

  const description = textInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (!description || isNaN(amount)) {
    alert('Please provide valid description and amount.');
    return;
  }

  // Add the transaction to the array
  const newTransaction = {
    description: description,
    amount: amount
  };
  transactions.push(newTransaction);

  // Update the balance, income, and expense
  balance += amount;
  if (amount > 0) {
    income += amount;
  } else {
    expense += Math.abs(amount);
  }

  // Reset input fields
  textInput.value = '';
  amountInput.value = '';

  // Update the UI
  updateUI();
}

// Attach event listener to the form
transactionForm.addEventListener('submit', addTransaction);

// Initial call to update the UI (in case there's any pre-existing data)
updateUI();
