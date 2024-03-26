import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import EditForm from './EditForm';
import ApplyForm from './ApplyForm';

const ProposalForm = () => {
  const action = window.location.pathname;
  return (
    <>
      <Header />
      {action.includes('add') ? <ApplyForm /> : <EditForm />}
      <Footer />
    </>
  );
};

export default ProposalForm;
