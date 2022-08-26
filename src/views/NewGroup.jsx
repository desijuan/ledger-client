import axios from 'axios';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Window from './Window';

const Form = () => {
  const [group, setGroup] = useState({ name: '', participants: [] });

  const addParticipantInputRef = useRef(null);
  const groupNameInputRef = useRef(null);

  const navigate = useNavigate();

  const addParticipantBtnHandler = () => {
    const participant = addParticipantInputRef.current.value;
    addParticipantInputRef.current.value = '';
    const participants = group.participants;
    participants.push(participant);
    setGroup({ ...group, participants });
  };

  const submitBtnHandler = async () => {
    try {
      const name = groupNameInputRef.current.value;
      const newGroup = { ...group, name: name };
      const response = await axios.post(
        'http://localhost:5000/api/v1/groups',
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
          id='group-name'
          ref={groupNameInputRef}
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
            id='add-participant-input'
            ref={addParticipantInputRef}
          />
          <button
            className='btn btn-primary'
            type='button'
            id='add-participant-btn'
            onClick={addParticipantBtnHandler}
          >
            Add
          </button>
        </div>
      </div>
      <div
        id='participants-list-container'
        hidden={group.participants.length === 0}
      >
        <h4>Participants</h4>
        <ul id='participants-list'>
          {group.participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>
      <div className='d-grid gap-2 mx-auto'>
        <button
          className='btn btn-primary'
          type='button'
          id='submit-btn'
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
