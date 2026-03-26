"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_PASSWORD;
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (e) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};
exports.authMiddleware = authMiddleware;
