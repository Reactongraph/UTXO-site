export interface ICurrentUser {
  address: string;
  balance: string;
  votingPower: number;
}

export interface IWalletMessageResponse {
  message: string;
}

export interface ISignInPayload {
  address: string;
  message: string;
  signature: string;
  publicKey: string;
  walletType: string;
}

export interface ISignInResponse<T> {
  accessToken: string;
  refreshToken: string;
  data: T;
}
