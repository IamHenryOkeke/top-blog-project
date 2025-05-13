"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const indexRoter_1 = __importDefault(require("./routes/indexRoter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const passport_config_1 = __importDefault(require("./config/passport-config"));
const blogRouter_1 = __importDefault(require("./routes/blogRouter"));
const tagRouter_1 = __importDefault(require("./routes/tagRouter"));
const cors_2 = __importDefault(require("./config/cors"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.default));
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(passport_config_1.default.initialize());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api/auth", authRouter_1.default);
app.use("/api/blogs", blogRouter_1.default);
app.use("/api/tags", tagRouter_1.default);
app.use("/api", indexRoter_1.default);
// Catch-all for routes that don't exist
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: "The route you are looking for does not exist.",
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const data = {
        statusCode,
        message: err.message || "Something went wrong",
    };
    if (err.details) {
        data.details = err.details;
    }
    res.status(statusCode).json(data);
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
