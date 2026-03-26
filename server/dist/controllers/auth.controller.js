"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const auth_schema_1 = require("../schemas/auth.schema");
const auth_service_1 = require("../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const JWT_SECRET = process.env.JWT_PASSWORD;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
}
const signup = async (req, res) => {
    try {
        const parsed = auth_schema_1.signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                error: parsed.error.format()
            });
        }
        const { email, password } = parsed.data;
        const user = await (0, auth_service_1.createUser)(email, password);
        res.json({
            message: "User created"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: "Server error"
        });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const parsed = auth_schema_1.signinSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                error: parsed.error.format()
            });
        }
        const { email, password } = parsed.data;
        const user = await (0, auth_service_1.findUser)(email, password);
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id
        }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        return res.json({
            message: "Logged in successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            error: "Server error"
        });
    }
};
exports.signin = signin;
