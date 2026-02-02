import { Server as http_server } from "node:http";
import { Server as socket_server } from "socket.io";
import { websocket_gateway } from "./websocket.gateway";
import { create_group_use_case } from "../../application/use-cases/chat/create-group.use-case";
import { user_repository_implemented } from "../../infrastructure/repositories/user.repository";
import { chat_repository_implemented } from "../../infrastructure/repositories/chat.repository";
export class socket_module {
  public static init(http_server: http_server) {
    const io = new socket_server(http_server, {
      cors: { origin: "*" },
      connectionStateRecovery: {},
    });

    const user_repository = new user_repository_implemented();
    const chat_repository = new chat_repository_implemented();
    const new_group_use_case = new create_group_use_case(
      user_repository,
      chat_repository,
    );
    const controller = new websocket_gateway(new_group_use_case);

    io.on("connection", (socket) => {
      controller.on_connection(io, socket);
    });

    return io;
  }
}
