import express, { type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { cors_options } from "./src/infraestructure/config/server/cors.config";
import { not_found_handler } from "./src/presentation/middlewares/404-handler";

const server = express();
server.use(cors(cors_options));
server.use(morgan("tiny"));

const PORT = process.env.PORT || "3001";

server.use("/", (req: Request, res: Response) => {
  res.send("Hello");
});

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

server.use(not_found_handler);
