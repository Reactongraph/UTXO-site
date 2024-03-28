import { getItem } from '@/utils/helpers/storageHelper';
import { useState, useEffect } from 'react';

const useIsLogged = () => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);

  const checkLoginStatus = () => {
    const accessToken = getItem('access');
    const refreshToken = getItem('refresh');
    const walletValue = getItem('wallet');
    setIsLogged(!!accessToken && !!refreshToken && !!walletValue);
    setWallet(walletValue as string);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return { isLogged, checkLoginStatus, wallet };
};

export default useIsLogged;
