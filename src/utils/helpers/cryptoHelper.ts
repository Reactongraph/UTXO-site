import * as CryptoJS from 'crypto-js';

// Secret key for encryption and decryption
const secretKey = `${process.env.REACT_APP_CRYPTO_KEY}`;

// Encryption function
export function encrypt(value: string): string {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
}

// Decryption function
export function decrypt(value: string): string {
  const bytes = CryptoJS.AES.decrypt(value, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
