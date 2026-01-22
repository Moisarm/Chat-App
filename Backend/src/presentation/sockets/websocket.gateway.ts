import type { Server, Socket } from "socket.io";

export class websocket_gateway {
  constructor() {}

  public on_connection(io: Server, socket: Socket) {
    console.log(`An user has connected id: ${socket.id}`);

    /*here i can manage the events */
    socket.on("message", (message_content: string) => {
      this.on_message(socket, message_content);
    });

    socket.on("disconnect", () =>
      console.log(`An user has disconnected id:  ${socket.id}`),
    );
  }

  private on_message(socket: Socket, message_content: string) {
    console.log(`Message received from ${socket.id}: ${message_content}`);
  }
  /*Here should be controllers */
}
