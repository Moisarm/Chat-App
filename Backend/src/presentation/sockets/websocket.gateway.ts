import type { Server, Socket } from "socket.io";

import type { new_message_dto } from "../../application/dto/message.dto";

import type { create_group_dto } from "../../application/dto/chat.dto";

import type { create_group_use_case } from "../../application/use-cases/chat/create-group.use-case";

import { decode_token_service } from "../../application/services/auth/decode-token.service";
import { failure } from "../../domain/result/result-pattern";

export class websocket_gateway {
  private readonly decode_token_service: decode_token_service;

  constructor(private create_group_use_case: create_group_use_case) {
    this.decode_token_service = new decode_token_service();
  }

  public on_connection(io: Server, socket: Socket) {
    console.log(`An user has connected id: ${socket.id}`);
    const token = socket.request.headers.cookie;

    try {
      if (!token) {
        console.log("Invalid Token");
        return;
      }
      const decoded = this.decode_token_service.run(token);
      socket.data.user_id = decoded.user_id;
      socket.join(`user:${socket.data.user_id}`);
      console.log(
        `User ${socket.data.user_id} authenticated and joined private room.`,
      );
    } catch (error) {
      socket.emit("error", { message: "Invalid Token", code: 401 });
      return;
    }

    /*Events */

    socket.on("join_chat", async (chat_id) => {
      socket.join(chat_id);
    });

    socket.on("new_message", async (data: new_message_dto) => {
      this.on_new_message(io, socket, data);
    });

    socket.on("new_group", async (data: create_group_dto) => {
      this.on_new_group(io, socket, token, data);
    });

    socket.on("disconnect", () =>
      console.log(`An user has disconnected id: ${socket.id}`),
    );
  }

  /*Controllers */
  private async on_new_group(
    io: Server,

    socket: Socket,

    token: string,

    data: create_group_dto,
  ) {
    console.log(`Group creation request from ${socket.id}: ${data.group_name}`);

    const result = await this.create_group_use_case.run(token, data);

    if (!result.succes) {
      return socket.emit("error", result.error);
    }

    const new_group = result.data;

    new_group.data.participant.forEach((participant) => {
      const user_id = participant.id;
      io.to(`user:${user_id}`).emit("added_to_group", {
        message: `You have been added to ${new_group.data.group_name}`,
        group: new_group,
      });
    });

    console.log(new_group);
  }

  private on_new_message(io: Server, socket: Socket, data: new_message_dto) {
    io.to(data.chat_id).emit("new_message", {
      content: data.content,
      sender: socket.data.user_id,
    });
  }
}
