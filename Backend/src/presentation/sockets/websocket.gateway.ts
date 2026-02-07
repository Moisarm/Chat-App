import { Server, type Socket } from "socket.io";

import type { new_message_dto } from "../../application/dto/message.dto";

import type {
  create_chat_dto,
  create_group_dto,
} from "../../application/dto/chat.dto";

import { create_group_use_case } from "../../application/use-cases/chat/create-group.use-case";

import { decode_token_service } from "../../application/services/auth/decode-token.service";
import { chat_handler } from "../handlers/chat.handler";
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
    const chat_handler_import = new chat_handler(
      io,
      socket,
      this.create_group_use_case,
    );

    chat_handler_import.handle_events(token);

    socket.on("disconnect", () =>
      console.log(`An user has disconnected id: ${socket.id}`),
    );
  }

  /*Controllers */
}
