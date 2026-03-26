"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../utils/prisma");
const createUser = async (email, password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });
    return user;
};
exports.createUser = createUser;
const findUser = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    return user;
};
exports.findUser = findUser;
