const groupID = window.location.pathname.split('/').at('-1');

const expensesStatusText = document.getElementById('expenses-status-text');
const expensesList = document.getElementById('expenses-list');
const newExpenseButton = document.getElementById('new-expense-button');

newExpenseButton.addEventListener('click', event => {
  event.preventDefault();
  window.location.assign(`/ledger/${groupID}`);
});

// load group from /api/groups/:id
const showEntries = async groupID => {
  try {
    const { data: { ledger } } = await axios.get(`/api/groups/${groupId}`);
    if (ledger.length < 1) {
      expensesStatusText.innerText = 'There are no expenses yet.';
      return;
    };
    expensesStatusText.hidden = true;
    expensesList.hidden = false;
    ledger.forEach(entry => {
      const li = document.createElement('li');
      li.innerText = `${entry.from} gave $${entry.amount.toFixed(2)} to ${entry.to} for ${entry.for}.`;
      expensesList.appendChild(li);
    });
  } catch (error) {
    expensesStatusText.innerText = 'Error!'
  };
};

showEntries(groupID);