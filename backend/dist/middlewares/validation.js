"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const errorHandler_1 = require("../error/errorHandler");
const validate = (schemas) => (req, res, next) => {
    if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success)
            throw new errorHandler_1.AppError('Validation failed', 400, result.error.flatten().fieldErrors);
        req.body = result.data;
    }
    if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success)
            throw new errorHandler_1.AppError('Validation failed', 400, result.error.flatten().fieldErrors);
    }
    if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success)
            throw new errorHandler_1.AppError('Validation failed', 400, result.error.flatten().fieldErrors);
        req.params = result.data;
    }
    // If all validations pass, call the next middleware
    next();
};
exports.validate = validate;
