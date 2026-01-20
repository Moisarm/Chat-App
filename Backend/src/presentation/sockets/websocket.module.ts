import { Server as http_server } from "node:http";
import { Server as socket_server } from "socket.io";
import { websocket_gateway } from "./websocket.gateway";
export class socket_module {
  public static init(http_server: http_server) {
    const io = new socket_server(http_server, {
      cors: { origin: "*" },
      connectionStateRecovery: {},
    });
    const controller = new websocket_gateway();

    io.on("connection", (socket) => {
      controller.on_connection(io, socket);
    });

    return io;
  }
}
