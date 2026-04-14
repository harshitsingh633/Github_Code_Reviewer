import express , {Request , Response} from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req : Request , res : Response) => {
    res.send("AI Github Code Reviewer API");
})

app.listen(3000 , () => {
    console.log("Server is running on 3000 port");
})