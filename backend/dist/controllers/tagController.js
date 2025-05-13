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
exports.deleteTag = exports.updateTag = exports.createTag = exports.getTagById = exports.getAllTags = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const errorHandler_1 = require("../error/errorHandler");
const queries_1 = require("../db/queries");
exports.getAllTags = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm = "" } = req.query;
    const tags = yield (0, queries_1.getAllTags)(String(searchTerm));
    res.status(200).json({
        message: "Tags fetched successfully",
        data: tags,
    });
}));
exports.getTagById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId } = req.params;
    if (!tagId) {
        throw new errorHandler_1.AppError("Tag ID is required", 400);
    }
    const tag = yield (0, queries_1.getTagById)(tagId);
    if (!tag) {
        throw new errorHandler_1.AppError("Tag not found", 404);
    }
    res.status(200).json({
        message: "Tags fetched successfully",
        data: tag,
    });
}));
exports.createTag = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const values = {
        name: name.toLowerCase()
    };
    const data = yield (0, queries_1.createTag)(values);
    if (data) {
        res.status(201).json({
            message: "Tag created successfully",
            data
        });
        return;
    }
}));
exports.updateTag = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId } = req.params;
    if (!tagId) {
        throw new errorHandler_1.AppError("Tag ID is required", 400);
    }
    const tag = yield (0, queries_1.getTagById)(tagId);
    if (!tag) {
        throw new errorHandler_1.AppError("Tag not found", 404);
    }
    const { name } = req.body;
    const values = {
        name: name === null || name === void 0 ? void 0 : name.toLowerCase()
    };
    const data = yield (0, queries_1.updateTag)(tagId, values);
    if (data) {
        res.status(201).json({
            message: "Tag updated successfully",
            data
        });
        return;
    }
}));
exports.deleteTag = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId } = req.params;
    if (!tagId) {
        throw new errorHandler_1.AppError("Tag ID is required", 400);
    }
    const tag = yield (0, queries_1.getTagById)(tagId);
    if (!tag) {
        throw new errorHandler_1.AppError("Tag not found", 404);
    }
    const data = yield (0, queries_1.deleteTag)(tagId);
    if (data) {
        res.status(201).json({
            message: "Tag deleted successfully",
            data
        });
        return;
    }
}));
