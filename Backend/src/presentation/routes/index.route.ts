import express, { type Request, type Response } from "express";

export const index_router = express.Router();

index_router.get("/", (req: Request, res: Response) => {
  res.send("Test");
});
