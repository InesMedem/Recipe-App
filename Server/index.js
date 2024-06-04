import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./router/users.js";

//! env variables

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//!

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);

//! db connection

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const { name, host } = db.connection;

    console.log(
      `Conectada la DB 👌  en el host: ${host} con el nombre: ${name}`
    );
  } catch (error) {
    console.log("No se ha conectado la db", error.message);
  }
};

connect();

//! PORT CONFIG

app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
