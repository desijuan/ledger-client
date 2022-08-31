import axios from 'axios';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Window from './Window';

const Form = () => {
  const [participants, setParticipants] = useState([]);

  const groupNameInputRef = useRef(null);
  const addParticipantInputRef = useRef(null);

  const navigate = useNavigate();

  const addParticipantBtnHandler = () => {
    const newParticipantName = addParticipantInputRef.current.value;
    addParticipantInputRef.current.value = '';
    addParticipantInputRef.current.focus();
    setParticipants((participants) => [...participants, newParticipantName]);
  };

  const submitBtnHandler = async () => {
    try {
      participants.sort();
      const newGroup = { name: groupNameInputRef.current.value, participants };
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
        <input type='text' className='form-control' ref={groupNameInputRef} />
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
          />
          <button
            className='btn btn-primary'
            type='button'
            onClick={addParticipantBtnHandler}
          >
            Add
          </button>
        </div>
      </div>
      <div hidden={participants.length === 0}>
        <h4>Participants</h4>
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

const NewGroup = () => {
  return (
    <Window title='New group'>
      <Form />
    </Window>
  );
};

export default NewGroup;
