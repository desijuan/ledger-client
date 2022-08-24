import Window from './Window';

const Form = () => {
  return (
    <form>
      <div className='form-group mb-3'>
        <label for='group-name' className='form-label'>
          Group name:
        </label>
        <input type='text' className='form-control' id='group-name' />
      </div>
      <div className='form-group mb-3'>
        <label for='participant-name' className='form-label'>
          Add participant:
        </label>
        <div className='input-group'>
          <input type='text' className='form-control' id='participant-name' />
          <button
            className='btn btn-primary'
            type='button'
            id='add-participant-btn'
          >
            Add
          </button>
        </div>
      </div>
      <div id='participants-list-container' hidden>
        <h4>Participants</h4>
        <ul id='participants-list'></ul>
      </div>
      <div className='d-grid gap-2 mx-auto'>
        <button className='btn btn-primary' type='submit' id='submit-btn'>
          Done!
        </button>
      </div>
    </form>
  );
};

const NewGroup = () => {
  return (
    <Window title='New group'>
      <Form />
    </Window>
  );
};

export default NewGroup;
