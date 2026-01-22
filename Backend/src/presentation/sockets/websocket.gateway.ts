import type { Server, Socket } from "socket.io";
import type { new_message_dto } from "../../application/dto/message.dto";

export class websocket_gateway {
  constructor() {}

  public on_connection(io: Server, socket: Socket) {
    console.log(`An user has connected id: ${socket.id}`);

    /*here i can manage the events */
    socket.on("join_chat", async (chat_id) => {
      socket.join(chat_id);
    });

    socket.on("new_message", async (data: new_message_dto) => {
      this.on_new_message(io, socket, data);
    });

    socket.on("disconnect", () =>
      console.log(`An user has disconnected id:  ${socket.id}`),
    );
  }

  private on_new_message(io: Server, socket: Socket, data: new_message_dto) {
    console.log(`Message received from ${socket.id}: ${data.content}`);

    //save on db
    const saved_message = "Test"; //Database response
    io.to(data.chat_id).emit("new_message", saved_message);
  }
  /*Here should be controllers */
}
