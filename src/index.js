import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './views/Landing';
import NewGroup from './views/NewGroup';
import GroupOverview from './views/GroupOverview';
import NewExpenseMoneyGiven from './views/NewExpenseMoneyGiven';
import NothingHere from './views/NothingHere';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='new-group' element={<NewGroup />} />
      <Route path='id' element={<GroupOverview />} />
      <Route
        path='id/new-expense/money-given'
        element={<NewExpenseMoneyGiven />}
      />
      <Route path='/*' element={<NothingHere />} />
    </Routes>
  </BrowserRouter>
);
