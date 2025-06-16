const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// State
let transactions = [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  const description = textInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (!description || isNaN(amount)) {
    alert('Please provide valid description and amount.');
    return;
  }

  const newTransaction = {
    id: Date.now(),
    description,
    amount
  };

  transactions.push(newTransaction);

  textInput.value = '';
  amountInput.value = '';

  updateUI();
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateUI();
}

// Update UI
function updateUI() {
  // Reset values
  let balance = 0, income = 0, expense = 0;

  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const sign = transaction.amount > 0 ? 'income' : 'expense';
    const li = document.createElement('li');
    li.classList.add(sign);
    li.innerHTML = `
      <span>${transaction.description}</span>
      <span>₹${transaction.amount}</span>
      <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">❌</button>
    `;
    transactionList.appendChild(li);

    balance += transaction.amount;
    if (transaction.amount > 0) {
      income += transaction.amount;
    } else {
      expense += Math.abs(transaction.amount);
    }
  });

  balanceElement.textContent = `₹${balance}`;
  incomeElement.textContent = `₹${income}`;
  expenseElement.textContent = `₹${expense}`;
}

// Event listener
transactionForm.addEventListener('submit', addTransaction);

// Initial render
updateUI();
