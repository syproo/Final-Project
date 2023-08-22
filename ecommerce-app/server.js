import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
<<<<<<< HEAD
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"

=======
import cors from "cors";
import router from "./routes/CategoryRoutes.js";
>>>>>>> 4a93f3c1b9e377260fc4493ffb0894f7d187edbd


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
<<<<<<< HEAD
app.use("/api/v1/auth", productRoutes);
=======
app.use("/api/v1/category", router);
>>>>>>> 4a93f3c1b9e377260fc4493ffb0894f7d187edbd

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
