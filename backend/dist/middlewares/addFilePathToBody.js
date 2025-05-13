"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFilePathToBody = void 0;
const errorHandler_1 = require("../error/errorHandler");
const addFilePathToBody = (req, res, next) => {
    if (req.file && req.file.path) {
        req.body.thumbnailImage = req.file.path;
    }
    if (!req.file) {
        delete req.body.thumbnailImage;
    }
    if (typeof req.body.tags === 'string') {
        try {
            req.body.tags = JSON.parse(req.body.tags);
        }
        catch (error) {
            throw new errorHandler_1.AppError('Invalid tags format', 400);
        }
    }
    if (typeof req.body.isPublished === 'string') {
        try {
            req.body.isPublished = (req.body.isPublished === true || req.body.isPublished === "true");
        }
        catch (error) {
            throw new errorHandler_1.AppError('Invalid tags format', 400);
        }
    }
    next();
};
exports.addFilePathToBody = addFilePathToBody;
