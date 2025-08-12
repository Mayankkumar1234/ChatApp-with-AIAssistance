import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./Cofig/db.js";
import "dotenv/config";
import morgan from "morgan";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";

// Connect to the database
connectDB();

const app = express();

// Middleware for logging requests
app.use(morgan("dev"));

// Cookie parser

app.use(cookieParser());

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use("/users", router);

// app.get("/", (req, res) => {
//   res.send("Working fine...");
// });

export default app;
