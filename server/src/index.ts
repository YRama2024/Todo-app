import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth';
import todoRoutes from './routes/todos';
app.use("/auth",authRoutes);
app.use("/todos",todoRoutes);

const url =
  "mongodb+srv://jackcruiser800:mypassword@cluster0.i2foem8.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url).then;
app.listen(3001, () => {
  console.log(" SERVER IS UP ");
});
