import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import NewGroup from "./views/NewGroup";
import GroupOverview from "./views/GroupOverview";
import NewExpense from "./views/NewExpense";
import NothingHere from "./views/NothingHere";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="new-group" element={<NewGroup />} />
      <Route path="group/:group_id" element={<GroupOverview />} />
      <Route path="group/:group_id/new-expense" element={<NewExpense />} />
      <Route path="/*" element={<NothingHere />} />
    </Routes>
  </BrowserRouter>,
);
