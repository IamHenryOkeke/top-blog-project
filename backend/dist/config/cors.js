"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../error/errorHandler");
const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin) || !origin) {
            callback(null, origin);
        }
        else {
            callback(new errorHandler_1.AppError('Not allowed by CORS', 403));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
exports.default = corsOptions;
