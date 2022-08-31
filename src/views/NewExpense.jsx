import axios from 'axios';

import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Window from './Window';

const Form = () => {
  const [state, setState] = useState({
    loading: true,
    participants: null,
    from: null,
    to: null,
  });
  const { groupID } = useParams();
  const navigate = useNavigate();

  const howMuchInputRef = useRef(null);
  const whatForInputRef = useRef(null);
  const whenInputRef = useRef(null);

  const getGroup = async (groupID) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/groups/${groupID}`
      );
      setState({
        loading: false,
        participants: response.data.participants,
        from: response.data.participants[0],
        to: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postExpense = async (groupID, expense) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/groups/${groupID}`,
        expense
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (state.loading) {
    getGroup(groupID);
    return (
      <div className='d-flex align-items-center justify-content-between'>
        <span>Loading...</span>
        <div
          className='spinner-border spinner-border-sm'
          role='status'
          aria-hidden='true'
        ></div>
      </div>
    );
  }

  const today = new Date();

  const { participants } = state;
  const otherParticipants = participants.filter(
    (participant) => participant !== state.from
  );

  return (
    <form>
      <div className='row g-3 align-items-center mb-3'>
        <div className='col-auto'>
          <select
            className='form-select'
            name='from'
            value={state.from}
            onChange={(event) =>
              setState({ ...state, from: event.target.value, to: null })
            }
          >
            {participants.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </select>
        </div>
        <div className='col'>
          <p className='col-form-label'>gave money to someone.</p>
        </div>
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='to' className='form-label'>
          To whom?
        </label>
        <div>
          {otherParticipants.map((participant) => (
            <div key={participant} className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='to'
                value={participant}
                checked={state.to === participant}
                onChange={(event) =>
                  setState({ ...state, to: event.target.value })
                }
              />
              <label className='form-check-label' htmlFor={participant}>
                {participant}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='description' className='form-label'>
          What for?
        </label>
        <input type='text' className='form-control' ref={whatForInputRef} />
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='amount' className='form-label'>
          How much?
        </label>
        <div className='input-group mb-3'>
          <span className='input-group-text'>$</span>
          <input
            type='number'
            className='form-control'
            min='0'
            name='amount'
            ref={howMuchInputRef}
          />
        </div>
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='date' className='form-label'>
          When?
        </label>
        <input
          type='date'
          className='form-control'
          name='date'
          defaultValue={today.toLocaleDateString('en-CA')}
          ref={whenInputRef}
        />
      </div>
      <div className='d-grid gap-2 mx-auto'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            const expense = {
              from: state.from,
              to: state.to,
              amount: howMuchInputRef.current.value,
              for: whatForInputRef.current.value,
              date: whenInputRef.current.value,
            };
            postExpense(groupID, expense).then(navigate(`/group/${groupID}`));
          }}
        >
          Add expense
        </button>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => navigate(`/group/${groupID}`)}
        >
          Cancel
        </button>
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
