"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateOTP;
const crypto_1 = require("crypto");
function generateOTP(length = 6) {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += (0, crypto_1.randomInt)(0, 10); // Generates a single digit
    }
    return otp;
}
