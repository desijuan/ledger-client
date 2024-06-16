import axios from "axios";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Window from "../components/Window";
import Loading from "../components/Loading";

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
  const { group_id } = useParams();
  const navigate = useNavigate();

  const getGroup = async (group_id) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/group/${group_id}`)
      .then((response) => {
        setState({ loading: false, data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (state.loading) {
    getGroup(group_id);
    return <Loading />;
  }

  const group = state.data.group_board;
  if (group.trs.length === 0) {
    return (
      <>
        <h1 className="text-center mb-3">{group.name}</h1>
        <div className="d-flex align-items-center justify-content-between">
          <h4>Expenses</h4>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate("new-expense")}
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
      <h1 className="text-center mb-3">{group.name}</h1>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4>Expenses</h4>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => navigate("new-expense")}
        >
          New expense
        </button>
      </div>

      <ul className="list-group list-group-flush">
        {group.trs.map((tr) => (
          <li className="list-group-item" key={tr.from_id}>{`${
            tr.from_id
          } gave $${tr.amount.toFixed(2)} to ${tr.to} for ${
            tr.description
          }.`}</li>
        ))}
      </ul>
    </>
  );
};

const GroupOverview = () => (
  <Window title="Group overview">
    {/* <ToSettleTheDebts /> */}
    <Expenses />
  </Window>
);

export default GroupOverview;
