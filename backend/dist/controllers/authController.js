"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.resetPassword = exports.sendOTP = exports.userLogin = exports.userSignUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const passwordUtils_1 = require("../utils/passwordUtils");
const queries_1 = require("../db/queries");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorHandler_1 = require("../error/errorHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_1 = __importDefault(require("../utils/otp"));
const nodemailer_1 = require("../utils/nodemailer");
exports.userSignUp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existingUser = yield (0, queries_1.getUserByEmail)(email.toLowerCase());
    if (existingUser) {
        throw new errorHandler_1.AppError("Email already used. Please use another email.", 409);
    }
    const hashedPassword = yield (0, passwordUtils_1.genPassword)(password);
    const values = {
        name,
        email: email.toLowerCase(),
        password: hashedPassword
    };
    const result = yield (0, queries_1.registerUser)(values);
    res.status(201).json({
        message: "Registration successful",
        user: {
            id: result.id,
            name: result.name,
            email: result.email,
        }
    });
}));
exports.userLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isExistingUser = yield (0, queries_1.getUserByEmail)(email.toLowerCase());
    if (!isExistingUser) {
        throw new errorHandler_1.AppError("invalid credentials", 401);
    }
    const isValidPassword = yield (0, passwordUtils_1.validPassword)(password, isExistingUser.password);
    if (!isValidPassword) {
        throw new errorHandler_1.AppError("invalid credentials", 401);
    }
    const user = {
        id: isExistingUser.id,
        name: isExistingUser.name,
        email: isExistingUser.email,
        role: isExistingUser.role
    };
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, { expiresIn: 1200 });
    const data = { accessToken: token };
    yield (0, queries_1.updateUser)(isExistingUser.id, data);
    res.status(200).json({
        message: "Login successful",
        token,
        user
    });
}));
exports.sendOTP = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const isExistingUser = yield (0, queries_1.getUserByEmail)(email);
    if (!isExistingUser) {
        throw new errorHandler_1.AppError("Invalid credentials", 401);
    }
    const isExistingOTPEmail = yield (0, queries_1.getOTP)(email);
    if (isExistingOTPEmail) {
        yield (0, queries_1.deleteOTP)(isExistingOTPEmail.email);
    }
    const otp = (0, otp_1.default)();
    const hashedOTP = yield bcryptjs_1.default.hash(otp, 10);
    const data = {
        email,
        code: hashedOTP,
        expires: new Date(Date.now() + 10 * 60 * 1000)
    };
    yield (0, nodemailer_1.sendMail)("Password Reset OTP", isExistingUser.name, email, `Your OTP is ${otp}. It will expire in 10 minutes.`);
    yield (0, queries_1.createOTP)(data);
    res.status(200).json({
        message: `OTP sent successfully to ${email}`,
    });
}));
exports.resetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, otp } = req.body;
    const isExistingOTP = yield (0, queries_1.getOTP)(email);
    if (!isExistingOTP) {
        throw new errorHandler_1.AppError("Invalid OTP", 401);
    }
    const isExpired = new Date() > isExistingOTP.expires;
    if (isExpired) {
        throw new errorHandler_1.AppError("OTP expired", 401);
    }
    const isExistingUser = yield (0, queries_1.getUserByEmail)(email);
    if (!isExistingUser) {
        throw new errorHandler_1.AppError("Invalid credentials or OTP", 401);
    }
    const isValidOTP = yield bcryptjs_1.default.compare(otp, isExistingOTP.code);
    if (!isValidOTP) {
        throw new errorHandler_1.AppError("Invalid OTP", 401);
    }
    const hashedPassword = yield (0, passwordUtils_1.genPassword)(password);
    const data = {
        password: hashedPassword
    };
    yield (0, queries_1.updateUser)(isExistingUser.id, data);
    yield (0, queries_1.deleteOTP)(isExistingOTP.email);
    res.status(200).json({
        message: `Password reset successfully for ${email}`
    });
}));
exports.userLogout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = { accessToken: null };
    if (!req.user) {
        throw new errorHandler_1.AppError("User not authenticated", 401);
    }
    const user = req.user;
    yield (0, queries_1.updateUser)(user.id, data);
    res.status(200).json({
        message: "Logout successful"
    });
}));
