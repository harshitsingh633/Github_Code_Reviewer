import express , {Request , Response} from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req : Request , res : Response) => {
    res.send("AI Github Code Reviewer API");
})

app.listen(3000 , () => {
    console.log("Server is running on 3000 port");
})