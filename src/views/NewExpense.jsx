import axios from 'axios';

import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Window from '../components/Window';
import Loading from '../components/Loading';

const Tabs = ({ activeTab, handleTabs }) => {
  return (
    <ul className='nav nav-tabs mb-3'>
      <li className='nav-item'>
        <button
          className={activeTab === 'expense' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleTabs('expense')}
        >
          Expense
        </button>
      </li>
      <li className='nav-item'>
        <button
          className={
            activeTab === 'money-given' ? 'nav-link active' : 'nav-link'
          }
          onClick={() => handleTabs('money-given')}
        >
          Money given
        </button>
      </li>
      <li className='nav-item'>
        <button
          className={activeTab === 'income' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleTabs('income')}
        >
          Income
        </button>
      </li>
    </ul>
  );
};

const MoneyGiven = ({
  groupID,
  participants,
  from,
  to,
  handleParticipant0,
  handleParticipant1,
  setLoading,
}) => {
  const navigate = useNavigate();

  const toWhomRef = useRef(null);
  const howMuchInputRef = useRef(null);
  const whatForInputRef = useRef(null);
  const whenInputRef = useRef(null);

  const today = new Date();

  const addExpenseBtnHandler = async () => {
    // validation
    if (!to) {
      toWhomRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!howMuchInputRef.current.value) {
      howMuchInputRef.current.focus();
      return;
    }
    if (!whatForInputRef.current.value) {
      whatForInputRef.current.focus();
      return;
    }
    if (!whenInputRef.current.value) {
      whenInputRef.current.focus();
      return;
    }
    try {
      setLoading(true);
      const expense = {
        from: from,
        to: to,
        amount: howMuchInputRef.current.value,
        for: whatForInputRef.current.value,
        date: whenInputRef.current.value,
      };
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/groups/${groupID}`,
        expense
      );
      navigate(`/group/${groupID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const otherParticipants = participants.filter(
    (participant) => participant !== from
  );

  return (
    <form>
      <div className='row g-3 align-items-center mb-3'>
        <div className='col-auto'>
          <select
            className='form-select'
            name='from'
            value={from}
            onChange={handleParticipant0}
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
      <div className='form-group mb-3' ref={toWhomRef}>
        <label htmlFor='to' className='form-label'>
          To whom?
        </label>
        {otherParticipants.map((participant) => (
          <div key={participant} className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='to'
              value={participant}
              checked={to === participant}
              onChange={handleParticipant1}
            />
            <label className='form-check-label' htmlFor={participant}>
              {participant}
            </label>
          </div>
        ))}
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
        <label htmlFor='description' className='form-label'>
          What for?
        </label>
        <input type='text' className='form-control' ref={whatForInputRef} />
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
          onClick={addExpenseBtnHandler}
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

const Content = ({
  groupID,
  activeTab,
  state,
  handleParticipant0,
  handleParticipant1,
  setLoading,
}) => {
  if (state.loading) {
    return <Loading />;
  } else if (activeTab === 'expense') {
    return <span>Expense</span>;
  } else if (activeTab === 'money-given') {
    return (
      <MoneyGiven
        groupID={groupID}
        participants={state.participants}
        from={state.participant0}
        to={state.participant1}
        handleParticipant0={handleParticipant0}
        handleParticipant1={handleParticipant1}
        setLoading={setLoading}
      />
    );
  } else if (activeTab === 'income') {
    return <span>Income</span>;
  }
};

const NewExpense = () => {
  const [activeTab, setActiveTab] = useState('money-given');
  const [state, setState] = useState({
    loading: true,
    participants: null,
    participant0: null,
    participant1: null,
  });

  const getGroup = async (groupID) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/groups/${groupID}`
      );
      setState({
        loading: false,
        participants: response.data.participants,
        participant0: response.data.participants[0],
        participant1: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { groupID } = useParams();

  if (!state.participants) {
    getGroup(groupID);
  }

  const setLoading = (value) => setState({ ...state, loading: value });

  const handleTabs = (value) => setActiveTab(value);

  const handleParticipant0 = (event) =>
    setState({
      ...state,
      participant0: event.target.value,
      participant1: null,
    });
  const handleParticipant1 = (event) =>
    setState({ ...state, participant1: event.target.value });

  return (
    <Window title='New expense'>
      <Tabs activeTab={activeTab} handleTabs={handleTabs} />
      <Content
        groupID={groupID}
        activeTab={activeTab}
        state={state}
        handleParticipant0={handleParticipant0}
        handleParticipant1={handleParticipant1}
        setLoading={setLoading}
      />
    </Window>
  );
};

export default NewExpense;
