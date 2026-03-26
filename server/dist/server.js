"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", auth_routes_1.default);
app.get("/", (req, res) => {
    res.send("AI Github Code Reviewer API");
});
app.listen(3000, () => {
    console.log("Database Url", process.env.DATABASE_URL);
    console.log("Server is running on 3000 port");
});
