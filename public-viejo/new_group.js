const participants = [];

const participantsList = document.getElementById('participants-list');
const participantsListContainer = document.getElementById('participants-list-container');
const groupNameInput = document.getElementById('group-name');
const participantNameInput = document.getElementById('participant-name');
const addParticipantBtn = document.getElementById('add-participant-btn');
const submitBtn = document.getElementById('submit-btn');

addParticipantBtn.addEventListener('click', () => {
  participantsListContainer.hidden = false;
  const participantName = participantNameInput.value;
  participantNameInput.value = '';
  participants.push(participantName);
  const li = document.createElement('li');
  li.innerText = participantName;
  participantsList.appendChild(li);
  participantNameInput.focus();
});

submitBtn.addEventListener('click', async event => {
  try {
    event.preventDefault();
    const name = groupNameInput.value;
    participants.sort();
    const response = await axios.post('/api/groups', { name, participants });
    const groupID = response.data._id;
    window.location.replace(`${groupID}`);
  } catch (error) {
    console.log(error);
  }
});
