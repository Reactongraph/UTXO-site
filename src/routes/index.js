import * as React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "../container/Dashboard";
import { PublicRoute } from "./publicRoute";
import ProposalForm from "../container/ProposalForm";
import HomePage from "../container/HomaPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/proposal/:id" element={<ProposalForm />} />
      </Route>
    </Routes>
  );
};

export default App;
