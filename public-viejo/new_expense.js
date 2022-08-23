const formSelect = document.getElementById('form-select');
const formRadioContainer = document.getElementById('form-radio-container');
const submitBtn = document.getElementById('submit-btn');
const datePicker = document.getElementById('date-picker');

const getParticipants = async groupID => {
  try {
    const { data: { participants } } = await axios.get(`/api/groups/${groupId}`);
    return participants;
  } catch (error) {
    console.log(error);
  };
};

const populateSelect = participant => {
  const option = document.createElement('option');
  option.value = participant;
  option.innerText = participant;
  formSelect.appendChild(option);
};

const populateRadio = (selectedParticipant) => {
  while (formRadioContainer.firstChild) {
    formRadioContainer.firstChild.remove();
  };
  const otherParticipants = participants.filter(participant => participant !== selectedParticipant).sort();
  otherParticipants.forEach(participant => {
    const input = document.createElement('input');
    input.className = 'form-check-input';
    input.type = 'radio';
    input.name = 'to';
    input.id = participant;
    input.value = participant;
    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = participant;
    label.innerText = participant;
    const formCheckDiv = document.createElement('div');
    formCheckDiv.className = 'form-check';
    formCheckDiv.appendChild(input);
    formCheckDiv.appendChild(label);
    formRadioContainer.appendChild(formCheckDiv);
  });
};

const groupId = window.location.pathname.split('/').at('-1');
const participants = getParticipants(groupID);
participants.sort();

participants.forEach(populateSelect);

formSelect.addEventListener('change', event => {
  const selectedParticipant = event.target.value;
  populateRadio(selectedParticipant);
});

populateRadio(participants[0]);
datePicker.valueAsDate = new Date();

// submitBtn.addEventListener('click', async event => {
//   try {
//     event.preventDefault();
//     const name = groupNameInput.value;
//     groupNameInput.value = '';
//     const response = await axios.post('/groups/', { name, participants });
//     const groupID = response.data._id;
//     window.location.replace(`${groupID}`);
//   } catch (error) {
//     console.log(error);
//   }
// });
