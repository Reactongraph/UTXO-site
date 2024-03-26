import { decrypt, encrypt } from './cryptoHelper';

// Get item from localStorage with decryption
export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      const decryptedItem = decrypt(item);
      return JSON.parse(decryptedItem) as T;
    } catch (error) {
      console.error('Error extracting localStorage item:', error);
      return null;
    }
  }
  return null;
}

// Set item in localStorage with encryption
export function setItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    const encryptedValue = encrypt(serializedValue);
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error('Error storing value in localStorage:', error);
  }
}

// Delete item from localStorage
export function deleteItem(key: string): void {
  localStorage.removeItem(key);
}

// Update item in localStorage
export function updateItem<T>(key: string, updater: (prevValue: T | null) => T): void {
  const prevValue = getItem<T>(key);
  const nextValue = updater(prevValue);
  setItem(key, nextValue);
}

// Handler function to save access and refresh tokens with encryption
export const saveTokens = (payload: { accessToken: string; refreshToken: string }, walletType?: string) => {
  setItem('access', payload.accessToken);
  setItem('refresh', payload.refreshToken);
  setItem('wallet', walletType);
};
