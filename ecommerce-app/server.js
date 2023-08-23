import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDatabase from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from './routes/CategoryRoutes.js'


//DotEnv
dotenv.config();

//Database-Config
connectDatabase();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//Rest Api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to My App",
  });
});

//Port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Running on 8080");
});
