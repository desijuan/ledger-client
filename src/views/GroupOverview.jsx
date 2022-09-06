import axios from 'axios';

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Window from '../components/Window';
import Loading from '../components/Loading';

// const ToSettleTheDebts = () => {
//   return (
//     <>
//       <h4>To settle the debts</h4>
//       <ul>
//         <li>
//           Carlos pays 50$ to Lucía
//           <button
//             type='button'
//             className='btn btn-outline-primary btn-pequeno float-end'
//           >
//             Done!
//           </button>
//         </li>
//         <li>
//           Daniel pays 30$ to Lucía
//           <button
//             type='button'
//             className='btn btn-outline-primary btn-pequeno float-end'
//           >
//             Done!
//           </button>
//         </li>
//       </ul>
//     </>
//   );
// };

const Expenses = () => {
  const [state, setState] = useState({ loading: true, data: {} });
  const { groupID } = useParams();
  const navigate = useNavigate();

  const getGroup = async (groupID) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/groups/${groupID}`
      );
      setState({ loading: false, data: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  if (state.loading) {
    getGroup(groupID);
    return <Loading />;
  }

  const group = state.data;
  if (group.expenses.length === 0) {
    return (
      <>
        <div className='d-flex align-items-center justify-content-between'>
          <h4>Expenses</h4>
          <button
            type='button'
            className='btn btn-primary btn-sm'
            onClick={() => navigate('new-expense')}
          >
            New expense
          </button>
        </div>

        <span>No expenses yet.</span>
      </>
    );
  }
  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <h4>Expenses</h4>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={() => navigate('new-expense')}
        >
          New expense
        </button>
      </div>

      <ul className='list-group list-group-flush'>
        {group.expenses.map((expense) => (
          <li className='list-group-item' key={expense._id}>{`${
            expense.from
          } gave $${expense.amount.toFixed(2)} to ${expense.to} for ${
            expense.for
          }.`}</li>
        ))}
      </ul>
    </>
  );
};

const GroupOverview = () => (
  <Window title='Group overview'>
    {/* <ToSettleTheDebts /> */}
    <Expenses />
  </Window>
);

export default GroupOverview;
