import { saveTokens } from './storageHelper';
import { StacksMainnet } from '@stacks/network';
import { ISignInPayload, IWalletMessageResponse } from '@/types/user.types';
import { getMessageVerified, getWalletMessage } from '@/utils/apiCalls/user.apiCalls';
import { AppConfig, UserSession, openSignatureRequestPopup, showConnect } from '@stacks/connect';

const mainnet = new StacksMainnet();

function handleError(error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : 'An error occurred.';
  console.error('Error connecting wallet:', errorMessage);
}

async function signInWithWallet(
  walletType: string,
  address: string,
  message: string,
  signature: string,
  publicKey: string,
  setViewPopover: (arg0: boolean) => void,
  checkLoginStatus: () => void
) {
  const payload: ISignInPayload = { address, message, signature, publicKey, walletType };
  try {
    // eslint-disable-next-line
    const response: any = await getMessageVerified(payload);
    saveTokens(response, walletType);
    setViewPopover(false);
    checkLoginStatus();
  } catch (error: unknown) {
    handleError(error);
  }
}

export async function handleUnisetConnection(
  walletType: string,
  unisatInstalled: boolean,
  setViewPopover: (arg0: boolean) => void,
  checkLoginStatus: () => void
) {
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
    const messagePayload: IWalletMessageResponse = await getWalletMessage(address);
    const signature = await window.unisat.signMessage(messagePayload.message);
    const publicKey = await window.unisat.getPublicKey();

    await signInWithWallet(walletType, address, messagePayload.message, signature, publicKey, setViewPopover, checkLoginStatus);
  } catch (error: unknown) {
    handleError(error);
  }
}

export async function handleLeatherConnection(
  walletType: string,
  leatherInstalled: boolean,
  setViewPopover: (arg0: boolean) => void,
  checkLoginStatus: () => void
) {
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

          const messagePayload: IWalletMessageResponse = await getWalletMessage(address);
          await openSignatureRequestPopup({
            message: messagePayload?.message,
            network: mainnet,
            appDetails: {
              name: 'utxo',
              icon: window.location.origin + '/images/logo-dark-header.svg'
            },
            async onFinish(data) {
              await signInWithWallet(
                walletType,
                address,
                messagePayload.message,
                data?.signature,
                data?.publicKey,
                setViewPopover,
                checkLoginStatus
              );
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
}

export async function handleOkxConnection(
  walletType: string,
  okxInstalled: boolean,
  setViewPopover: (arg0: boolean) => void,
  checkLoginStatus: () => void
) {
  if (!okxInstalled) {
    window.location.href = 'https://okx.com/web3';
    return;
  }

  try {
    await window.okxwallet.bitcoin.connect();
    const accounts = await window.okxwallet.bitcoin.getAccounts();
    const publicKey = await window.okxwallet.bitcoin.getPublicKey();

    const address = accounts[0];
    const messagePayload: IWalletMessageResponse = await getWalletMessage(address);
    const signedMessage = await window.okxwallet.bitcoin.signMessage(messagePayload?.message);

    await signInWithWallet(walletType, address, messagePayload.message, signedMessage, publicKey, setViewPopover, checkLoginStatus);
  } catch (error: unknown) {
    handleError(error);
  }
}
