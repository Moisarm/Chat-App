import express, { type Request, type Response } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import morgan from "morgan";
import { cors_options } from "./src/infrastructure/config/server/cors.config";
import { not_found_handler } from "./src/presentation/middlewares/404-handler";
import { index_router } from "./src/presentation/routes/index.route";
import { PORT } from "./src/infrastructure/config/server/env";

//create express server
const server = express();

//Create an node server with the instance of the express one so the express server can get all the functions form the socket one
const node_server = createServer(server);

//Create socket.io server with the instance of the node one
const socket_server = new Server(node_server, { connectionStateRecovery: {} });

server.use(cors(cors_options));
server.use(morgan("tiny"));

socket_server.on("connection", () => {
  console.log("An user has connected");
});

server.get("/", index_router);

node_server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

server.use(not_found_handler);
