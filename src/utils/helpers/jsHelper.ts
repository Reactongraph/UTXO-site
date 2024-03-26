export function truncateAddress(address: string, maxLength: number) {
  let finalString: string = '';
  if (maxLength <= 0) {
    throw new Error('maxLength must be a positive number');
  }

  if (address && address.length > maxLength) {
    const start = address.substring(0, 5);
    const end = address.substring(address.length - (maxLength / 2 - 3));
    finalString = start + '...' + end;
    return finalString;
  }

  return finalString;
}
