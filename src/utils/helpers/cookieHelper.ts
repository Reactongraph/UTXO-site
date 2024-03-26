import { parseCookies, setCookie, destroyCookie } from 'nookies';

// Get item from cookies
export function getCookieItem<T>(key: string): T | null {
  const cookies = parseCookies();
  const item = cookies[key];
  if (item) {
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error parsing cookie item:', error);
      return null;
    }
  }
  return null;
}

// Set item in cookies
export function setCookieItem<T>(key: string, value: T, options?: { [key: string]: unknown }): void {
  try {
    const serializedValue = JSON.stringify(value);
    setCookie(null, key, serializedValue, options);
  } catch (error) {
    console.error('Error serializing value for cookie:', error);
  }
}

// Delete item from cookies
export function deleteCookieItem(key: string): void {
  destroyCookie(null, key);
}

// Update item in cookies
export function updateCookieItem<T>(key: string, updater: (prevValue: T | null) => T, options?: { [key: string]: unknown }): void {
  const prevValue = getCookieItem<T>(key);
  const nextValue = updater(prevValue);
  setCookieItem(key, nextValue, options);
}
