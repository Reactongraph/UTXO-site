import { createContext, useReducer, useContext, ReactNode } from 'react';
import { produce } from 'immer';

export interface IProposalState {
  proposalName: string;
  fundAmount: number;
  btcWallet: string;
  targetDate: string;
  githubLink: string;
  twitterLink: string;
  telegramLink: string;
  description: string;
  additionalInfo: string;
  uploadImage: string;
  fileUpload: string;
}

interface ProposalAction {
  type: string;
  payload?: Partial<IProposalState>;
}

export const proposalInitialState: IProposalState = {
  proposalName: '',
  fundAmount: 0,
  btcWallet: '',
  targetDate: '',
  githubLink: '',
  twitterLink: '',
  telegramLink: '',
  description: '',
  additionalInfo: '',
  uploadImage: '',
  fileUpload: ''
};

// Using Immer's produce function for direct field value assignments
const proposalReducer = produce((draft: IProposalState, action: ProposalAction) => {
  switch (action.type) {
    case 'UPDATE_PROPOSAL':
      draft.proposalName = action.payload?.proposalName ?? draft.proposalName;
      break;
    case 'RESET_PROPOSAL':
      return proposalInitialState;
    default:
      break;
  }
});

const ProposalContext = createContext<{ proposal: IProposalState; dispatch: React.Dispatch<ProposalAction> }>({
  proposal: proposalInitialState,
  dispatch: () => {}
});

export const ProposalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(proposalReducer, proposalInitialState);
  return <ProposalContext.Provider value={{ proposal: state, dispatch }}>{children}</ProposalContext.Provider>;
};

export const useProposalContext = () => useContext(ProposalContext);
