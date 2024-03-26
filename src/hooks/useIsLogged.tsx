import { getItem } from '@/utils/helpers/storageHelper';
import { useState, useEffect } from 'react';

const useIsLogged = () => {
  const [isLogged, setIsLogged] = useState(false);
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

    // Listen for changes in localStorage from other tabs/windows
    window.addEventListener('storage', checkLoginStatus);

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return { isLogged, checkLoginStatus, wallet };
};

export default useIsLogged;
