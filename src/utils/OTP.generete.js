import OTP from "otp-generator";
const otp = OTP.generate(6, {
  digits: true,
  alphabets: false,
  upperCase: true,
  specialChars: false,
});

export default otp;
