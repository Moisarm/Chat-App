import express, { type Request, type Response } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import morgan from "morgan";
import { cors_options } from "./src/infrastructure/config/server/cors.config";
import { not_found_handler } from "./src/presentation/middlewares/404-handler";
import { index_router } from "./src/presentation/routes/index.route";
import { PORT } from "./src/infrastructure/config/server/env";
import { socket_module } from "./src/presentation/sockets/websocket.module";

//create express server
const server = express();

//Create an node server with the instance of the express one so the express server can get all the functions form the socket one
const node_server = createServer(server);

//Create socket.io server with the instance of the node one
socket_module.init(node_server); //This return the instance of the io so i can use it later

server.use(cors(cors_options));
server.use(morgan("tiny"));
server.use(express.json());

server.use("/", index_router);

node_server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

server.use(not_found_handler);
