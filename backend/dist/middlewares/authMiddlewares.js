"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const passport_config_1 = __importDefault(require("../config/passport-config"));
const errorHandler_1 = require("../error/errorHandler");
const isAuthenticated = (req, res, next) => {
    passport_config_1.default.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err)
            return next(err);
        if (!user)
            throw new errorHandler_1.AppError("You are not authorized to access this resource", 401);
        req.user = user;
        return next();
    })(req, res, next);
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        return next();
    }
    else {
        throw new errorHandler_1.AppError("You are not authorized to access this resource", 403);
    }
};
exports.isAdmin = isAdmin;
