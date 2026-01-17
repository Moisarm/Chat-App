import express, { type Request, type Response } from "express";
import { auth_router } from "./auth.route";
import { health_router } from "./health.route";

export const index_router = express.Router();

index_router.use("/", health_router);
index_router.use("/auth", auth_router);
