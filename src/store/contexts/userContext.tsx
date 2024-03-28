// UserContext.tsx
/* eslint-disable react-refresh/only-export-components */
import { produce } from 'immer';
import { ICurrentUser, IUserState } from '@/types/user.types';
import { createContext, useReducer, useContext, ReactNode } from 'react';
import { getItem } from '@/utils/helpers/storageHelper';

enum UserActionTypes {
  UPDATE_AUTH = 'UPDATE_AUTH',
  UPDATE_USER = 'UPDATE_USER',
  RESET_USER = 'RESET_USER'
}

export const updateAuthAction = (data: IUserState) => ({
  type: UserActionTypes.UPDATE_AUTH,
  payload: data
});

export const updateUserAction = (data: ICurrentUser) => ({
  type: UserActionTypes.UPDATE_USER,
  payload: data
});

export const resetUserStore = () => ({
  type: UserActionTypes.RESET_USER
});

export interface UserAction {
  type: UserActionTypes;
  payload?: Partial<IUserState>;
}

export const userInitialState: IUserState = {
  accessToken: getItem('access') ?? '',
  refreshToken: getItem('refresh') ?? '',
  wallet: getItem('wallet') ?? '',
  address: '',
  balance: '0',
  votingPower: 0
};

// Using Immer's produce function for direct field value assignments
const userReducer = produce((draft: IUserState, action: UserAction) => {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER:
      draft.address = action.payload?.address ?? draft.address;
      draft.balance = action.payload?.balance ?? draft.balance;
      draft.votingPower = action.payload?.votingPower ?? draft.votingPower;
      break;
    case UserActionTypes.UPDATE_AUTH:
      draft.accessToken = action.payload?.accessToken ?? draft.accessToken;
      draft.refreshToken = action.payload?.refreshToken ?? draft.refreshToken;
      draft.wallet = action.payload?.wallet ?? draft.wallet;
      break;
    case UserActionTypes.RESET_USER:
      return userInitialState;
    default:
      break;
  }
});

const UserContext = createContext<{ user: IUserState; dispatch: React.Dispatch<UserAction> }>({
  user: userInitialState,
  dispatch: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  return <UserContext.Provider value={{ user: state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
