"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = require("express");
exports.indexRouter = (0, express_1.Router)();
exports.indexRouter.get("/", (req, res) => {
    res.json({
        message: "Welcome to my api",
        status: 200
    });
});
exports.default = exports.indexRouter;
