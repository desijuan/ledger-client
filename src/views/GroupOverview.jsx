const GroupOverview = () => {
  return (
    <div className='container my-3'>
      <div className='card mx-auto'>
        <div className='card-header'>Group overview</div>
        <div className='card-body'>
          <h4>To settle the debts</h4>
          <ul>
            <li>
              Carlos pays 50$ to Lucía
              <button
                type='button'
                className='btn btn-outline-primary btn-pequeno float-end'
              >
                Done!
              </button>
            </li>
            <li>
              Daniel pays 30$ to Lucía
              <button
                type='button'
                className='btn btn-outline-primary btn-pequeno float-end'
              >
                Done!
              </button>
            </li>
          </ul>
          <h4>
            Expenses
            <button
              type='button'
              className='btn btn-primary btn-sm float-end'
              id='new-expense-button'
            >
              New expense
            </button>
          </h4>
          <span id='expenses-status-text'>Loading...</span>
          <ul id='expenses-list' hidden></ul>
        </div>
      </div>
    </div>
  );
};

export default GroupOverview;
