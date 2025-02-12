export const formatPhoneNumber = (phone: string): string => {
  // Remove the '+' if it exists
  phone = phone.startsWith('+') ? phone.slice(1) : phone;

  // Extract country code (first 2 digits), state code (next 2 digits), and number (remaining digits)
  const countryCode = phone.slice(0, 2); // "55"
  const stateCode = phone.slice(2, 4);   // "85"
  let number = phone.slice(4);           // Rest of the phone number

  // If the number has 9 digits, remove the first one
  if (number.length === 9) {
    number = number.slice(1);
  }

  // Return formatted number
  return `${countryCode}${stateCode}${number}`;
};
