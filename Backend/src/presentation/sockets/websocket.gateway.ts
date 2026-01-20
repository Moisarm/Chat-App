import type { Server, Socket } from "socket.io";

export class websocket_gateway {
  constructor() {}

  public on_connection(io: Server, socket: Socket) {
    console.log(`An user has connected id: ${socket.id}`);

    /*here i can manage the events */
    socket.on("disconnect", () => console.log("An user has disconnected"));
  }

  /*Here should be controllers */
}
