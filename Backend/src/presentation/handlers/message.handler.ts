import { Server, Socket } from "socket.io";
import type { new_message_use_case } from "../../application/use-cases/message/new-message.use-case";
import type { new_message_dto } from "../../application/dto/message.dto";

export class message_handler {
  constructor(
    private io: Server,
    private socket: Socket,
    private new_message_use_case: new_message_use_case,
  ) {}

  async handle_message_events() {
    this.socket.on("new_message", (data: new_message_dto) => {
      this.on_new_message(this.io, this.socket, data);
    });
  }

  private async on_new_message(
    io: Server,
    socket: Socket,
    data: new_message_dto,
  ) {
    console.log("Sendind message");

    data = {
      ...data,
      sender_id: socket.data.user_id,
    };

    console.log(data);
    const new_message_result = await this.new_message_use_case.run(
      socket.data.user_id,
      data,
    );

    if (!new_message_result.succes) {
      return socket.emit("error", {
        message: "Failed to send message",
        code: 500,
      });
    }

    io.to(data.chat_id).emit("new_message", {
      content: new_message_result.data.content,
      sender: new_message_result.data.sender_id,
    });
  }
}
