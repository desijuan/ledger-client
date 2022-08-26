import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './views/Landing';
import NewGroup from './views/NewGroup';
import GroupOverview from './views/GroupOverview';
import NewExpense from './views/NewExpense';
import NothingHere from './views/NothingHere';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='new-group' element={<NewGroup />} />
      <Route path='group/:groupID' element={<GroupOverview />} />
      <Route path='group/:groupID/new-expense' element={<NewExpense />} />
      <Route path='/*' element={<NothingHere />} />
    </Routes>
  </BrowserRouter>
);
