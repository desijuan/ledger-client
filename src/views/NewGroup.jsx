import axios from 'axios';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Window from '../components/Window';

const Form = () => {
  const [participants, setParticipants] = useState([]);

  const groupNameInputRef = useRef(null);
  const addParticipantInputRef = useRef(null);

  const navigate = useNavigate();

  const addParticipantHandler = () => {
    const newParticipantName = addParticipantInputRef.current.value;
    if (
      newParticipantName !== '' &&
      !participants
        .map((participant) => participant.toUpperCase())
        .includes(newParticipantName.toUpperCase())
    ) {
      setParticipants((participants) => [...participants, newParticipantName]);
      addParticipantInputRef.current.value = '';
    }
    addParticipantInputRef.current.focus();
  };

  const clearListBtnHandler = () => {
    setParticipants([]);
    addParticipantInputRef.current.focus();
  };

  const submitBtnHandler = async () => {
    const name = groupNameInputRef.current.value;
    if (name === '') {
      groupNameInputRef.current.focus();
      return;
    } else if (participants.length < 2) {
      addParticipantInputRef.current.focus();
      return;
    }
    try {
      participants.sort();
      const newGroup = { name, participants };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/groups`,
        newGroup
      );
      const groupID = response.data._id;
      navigate(`../group/${groupID}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <div className='form-group mb-3'>
        <label htmlFor='group-name' className='form-label'>
          Group name:
        </label>
        <input
          type='text'
          className='form-control'
          ref={groupNameInputRef}
          onKeyDown={(event) => {
            if (
              (event.key === 'Enter' || event.key === 'NumpadEnter') &&
              groupNameInputRef.current.value !== ''
            ) {
              addParticipantInputRef.current.focus();
            }
          }}
        />
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='participant-name' className='form-label'>
          Add participant:
        </label>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            ref={addParticipantInputRef}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'NumpadEnter') {
                addParticipantHandler();
              }
            }}
          />
          <button
            className='btn btn-primary'
            type='button'
            onClick={addParticipantHandler}
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <div className='d-flex align-items-center justify-content-between'>
          <h4>Participants ({participants.length})</h4>
          <button
            type='button'
            className='btn btn-primary btn-sm'
            onClick={clearListBtnHandler}
          >
            Clear
          </button>
        </div>
        <ul>
          {participants.map((participant) => (
            <li key={participant}>{participant}</li>
          ))}
        </ul>
      </div>
      <div className='d-grid gap-2 mx-auto'>
        <button
          className='btn btn-primary'
          type='button'
          onClick={submitBtnHandler}
        >
          Done!
        </button>
      </div>
    </form>
  );
};

const NewGroup = () => (
  <Window title='New group'>
    <Form />
  </Window>
);

export default NewGroup;
