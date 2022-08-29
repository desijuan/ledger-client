import Window from './Window';

const Form = () => {
  return (
    <form>
      <div className='row g-3 align-items-center mb-3'>
        <div className='col-auto'>
          <select className='form-select' id='form-select' name='from'></select>
        </div>
        <div className='col'>
          <p className='col-form-label'>gave money to someone</p>
        </div>
      </div>
      <div className='form-group mb-3'>
        <label for='amount' className='form-label'>
          How much?
        </label>
        <div className='input-group mb-3'>
          <span className='input-group-text'>$</span>
          <input type='number' className='form-control' min='0' name='amount' />
        </div>
      </div>
      <div className='form-group mb-3'>
        <label for='to' className='form-label'>
          To whom?
        </label>
        <div id='form-radio-container'></div>
      </div>
      <div className='form-group mb-3'>
        <label for='description' className='form-label'>
          What for?
        </label>
        <input type='text' className='form-control' id='descrption' />
      </div>
      <div className='form-group mb-3'>
        <label for='date' className='form-label'>
          When?
        </label>
        <input
          type='date'
          className='form-control'
          name='date'
          id='date-picker'
        />
      </div>
      <div className='d-grid gap-2 mx-auto'>
        <button type='submit' className='btn btn-primary' id='submit-btn'>
          Add expense
        </button>
        <a
          href='group_overview.html'
          type='button'
          className='btn btn-secondary'
          id='submit-btn'
        >
          Cancel
        </a>
      </div>
    </form>
  );
};

const NewExpense = () => {
  return (
    <Window title='New expense'>
      <Form />
    </Window>
  );
};

export default NewExpense;
