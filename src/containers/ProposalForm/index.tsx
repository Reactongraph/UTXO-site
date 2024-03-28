import EditForm from './EditForm';
import ApplyForm from './ApplyForm';

const ProposalForm = () => {
  const action = window.location.pathname;
  return <>{action.includes('add') ? <ApplyForm /> : <EditForm />}</>;
};

export default ProposalForm;
