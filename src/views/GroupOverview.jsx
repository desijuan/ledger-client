import Window from './Window';

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
  return (
    <>
      <h4>Expenses</h4>
      <button
        type='button'
        className='btn btn-primary btn-sm float-end'
        id='new-expense-button'
      >
        New expense
      </button>
      <span id='expenses-status-text'>Loading...</span>
      <ul id='expenses-list' hidden></ul>
    </>
  );
};

const GroupOverview = () => {
  return (
    <Window title='Group overview'>
      {/* <ToSettleTheDebts /> */}
      <Expenses />
    </Window>
  );
};

export default GroupOverview;
