import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ApplyForm from "./applyForm";
import EditForm from "./editForm";

const ProposalForm = () => {
  const action  = window.location.pathname
  console.log("action", action);
  return (
    <>
      <Header />
      {action.includes("add") ? <ApplyForm /> : <EditForm />}
      <Footer />
    </>
  );
};

export default ProposalForm;
