import { randomInt } from 'crypto';

export default function generateOTP(length = 6) {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += randomInt(0, 10); // Generates a single digit
  }
  return otp;
}
