// store.ts
import { IUserState } from '@/types/user.types';
import { UserProvider, userInitialState } from './contexts/userContext';
import { createContext, useReducer, ReactNode, useContext } from 'react';
import { IProposalState, ProposalProvider, proposalInitialState } from './contexts/proposalContext';

interface MainAction {
  type: string;
  payload?: unknown;
}

interface MainState {
  user: IUserState;
  proposal: IProposalState;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mainReducer = (state: MainState, _action: MainAction): MainState => {
  return state;
};

// Define the context type
interface StoreContextType {
  user: IUserState;
  proposal: IProposalState;
  dispatch: React.Dispatch<MainAction>;
}

// Create the main context
const StoreContext = createContext<StoreContextType>({
  user: {} as IUserState,
  proposal: {} as IProposalState,
  dispatch: () => {}
});

// Create the main provider component
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    user: userInitialState,
    proposal: proposalInitialState
  });

  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      <UserProvider>
        <ProposalProvider>{children}</ProposalProvider>
      </UserProvider>
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
