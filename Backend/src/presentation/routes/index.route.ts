import express, { type Request, type Response } from "express";
import { auth_router } from "./auth.route";

export const index_router = express.Router();

index_router.use("/auth", auth_router);
