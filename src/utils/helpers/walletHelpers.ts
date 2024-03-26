import axiosInstance from './axiosInstance';
import { saveTokens } from './storageHelper';
import { StacksMainnet } from '@stacks/network';
import { AppConfig, UserSession, openSignatureRequestPopup, showConnect } from '@stacks/connect';

const mainnet = new StacksMainnet();

interface SignInPayload {
  address: string;
  message: string;
  signature: string;
  publicKey: string;
  walletType: string;
}

interface MessageResponse {
  message: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

async function messageCaller(payload: string): Promise<MessageResponse> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await axiosInstance<MessageResponse>({
    url: '/auth/message',
    params: { address: payload }
  });
  return response;
}

async function signinCaller<T>(payload?: Partial<SignInPayload>): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await axiosInstance<T>({
    url: '/auth/signin',
    method: 'post',
    data: payload
  });
  return response;
}

function handleError(error: unknown): void {
  let errorMessage: unknown = 'An error occurred.';
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = error.message;
  }
  console.error('Error connecting wallet:', errorMessage);
}

export const handleUnisetConnection = async (
  walletType: string,
  unisatInstalled: boolean,
  setViewPopover: (arg0: boolean) => void,
  checkLoginStatus: () => void
) => {
  if (!unisatInstalled) {
    window.location.href = 'https://unisat.io';
    return;
  }

  try {
    const accounts: string[] = await window.unisat.requestAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts found. Please create an account first.');
    }

    const address = accounts[0];
    const messagePayload: MessageResponse = await messageCaller(address);
    const signature = await window.unisat.signMessage(messagePayload.message);
    const publicKey = await window.unisat.getPublicKey();

    const payload: SignInPayload = {
      address,
      message: messagePayload.message,
      signature,
      publicKey,
      walletType
    };

    const response: SignInResponse = await signinCaller<SignInResponse>(payload);

    saveTokens(response, walletType);
    setViewPopover(false);
    checkLoginStatus();
  } catch (error: unknown) {
    handleError(error);
  }
};

export const handleLeatherConnection = async (
  walletType: string,
  leatherInstalled: boolean,
  setViewPopover: (arg0: boolean) => void,
  checkLoginStatus: () => void
) => {
  if (!leatherInstalled) {
    window.location.href = 'https://leather.io/install-extension';
    return;
  }

  try {
    const appConfig = new AppConfig(['store_write', 'publish_data']);
    const newSession = new UserSession({ appConfig });

    const authenticate = async () => {
      await showConnect({
        appDetails: {
          name: 'utxo app',
          icon: window.location.origin + '/images/logo-dark-header.svg'
        },
        redirectTo: '/',
        onFinish: async () => {
          const userData = newSession.loadUserData();
          const address = userData?.profile?.btcAddress?.p2wpkh?.mainnet;
          if (!address) {
            throw new Error('No address found. Please create an account first.');
          }

          const messagePayload: MessageResponse = await messageCaller(address);
          await openSignatureRequestPopup({
            message: messagePayload?.message,
            network: mainnet,
            appDetails: {
              name: 'utxo',
              icon: window.location.origin + '/images/logo-dark-header.svg'
            },
            async onFinish(data) {
              const payload: SignInPayload = {
                address,
                message: messagePayload?.message,
                signature: data?.signature,
                publicKey: data?.publicKey,
                walletType
              };
              const response: SignInResponse = await signinCaller<SignInResponse>(payload);
              saveTokens(response, walletType);
              setViewPopover(false);
              checkLoginStatus();
            },
            userSession: newSession
          });
        },
        userSession: newSession
      });
    };

    authenticate();
  } catch (error: unknown) {
    handleError(error);
  }
};

export const handleOkxConnection = async (
  walletType: string,
  okxInstalled: boolean,
  setViewPopover: (arg0: boolean) => void,
  checkLoginStatus: () => void
) => {
  if (!okxInstalled) {
    window.location.href = 'https://okx.com/web3';
    return;
  }

  try {
    await window.okxwallet.bitcoin.connect();
    const accounts = await window.okxwallet.bitcoin.getAccounts();
    const publicKey = await window.okxwallet.bitcoin.getPublicKey();

    const address = accounts[0];
    const messagePayload: MessageResponse = await messageCaller(address);
    const signedMessage = await window.okxwallet.bitcoin.signMessage(messagePayload?.message);

    const payload: SignInPayload = {
      address,
      message: messagePayload?.message,
      signature: signedMessage,
      publicKey,
      walletType
    };

    const response: SignInResponse = await signinCaller<SignInResponse>(payload);
    saveTokens(response, walletType);
    setViewPopover(false);
    checkLoginStatus();
  } catch (error: unknown) {
    handleError(error);
  }
};
