import type { Server, Socket } from "socket.io";
import type { new_message_dto } from "../../application/dto/message.dto";
import type { create_group_dto } from "../../application/dto/chat.dto";
import { create_group_use_case } from "../../application/use-cases/chat/create-group.use-case";
import type { get_user_chat_use_case } from "../../application/use-cases/chat/get-users-chats.use-case";
export class chat_handler {
  constructor(
    private io: Server,
    private socket: Socket,
    private readonly create_group_use_case: create_group_use_case,
    private readonly get_chats_use_case: get_user_chat_use_case,
  ) {}

  async handle_events(token: string) {
    this.socket.on("join_chat", (chat_id) => {
      this.socket.join(chat_id);
    });

    /*this.socket.on("new_message", (data: new_message_dto) => {
      this.on_new_message(this.io, this.socket, data);
    });*/

    this.socket.on("new_group", (data: create_group_dto) => {
      this.on_new_group(this.io, this.socket, token, data);
    });

    this.socket.on("message_recieve", () => {
      this.on_get_chats(this.io, this.socket, token);
    });
  }

  /*private async on_new_message(
    io: Server,
    socket: Socket,
    data: new_message_dto,
  ) {
    console.log("Sendind message");
    io.to(data.chat_id).emit("new_message", {
      content: data.content,
      sender: socket.data.user_id,
    });
  }*/

  private async on_new_group(
    io: Server,

    socket: Socket,

    token: string,

    data: create_group_dto,
  ) {
    try {
      console.log(
        `Group creation request from ${socket.id}: ${data.group_name}`,
      );

      const result = await this.create_group_use_case.run(token, data);

      if (!result.succes) {
        return socket.emit("error", result.error);
      }

      const new_group = result.data;

      new_group.participants.forEach((participant) => {
        const user_id = participant.user_id;
        io.to(`user:${user_id}`).emit("added_to_group", {
          message: `You have been added to ${new_group.group_name}`,
          group: new_group,
        });
      });

      socket.emit("new_group_created", {
        message: "Group created Succesfully",
        chat_id: new_group.id,
      });
    } catch (error) {
      console.error("Error Creating Group");
      socket.emit("error", { message: "Error Creating Group", code: 500 });
    }
  }

  private async on_get_chats(io: Server, socket: Socket, token: string) {
    try {
      const result = await this.get_chats_use_case.run(token);

      if (!result.succes) {
        return socket.emit("error", result.error);
      }

      socket.emit("message_recieve", result.data);
    } catch (error) {
      console.error("Error Fetching Chats");
    }
  }
}
