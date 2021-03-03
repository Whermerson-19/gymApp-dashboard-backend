import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";

import { errors } from "celebrate";

import cors from "cors";

import "express-async-errors";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";

import appRouter from "./routes";
import "./database";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));

app.use(appRouter);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => console.log("Server isRunning"));
