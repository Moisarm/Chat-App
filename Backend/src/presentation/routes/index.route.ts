import express, { type Request, type Response } from "express";
import { auth_router } from "./auth.route";
import { health_router } from "./health.route";
import { users_router } from "./users.route";
import { chat_router } from "./chat.route";

export const index_router = express.Router();

index_router.use("/", health_router);
index_router.use("/auth", auth_router);
index_router.use("/users", users_router);
index_router.use("/chat", chat_router);
