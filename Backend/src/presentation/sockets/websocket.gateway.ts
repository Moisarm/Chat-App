import { Server, type Socket } from "socket.io";

import { create_group_use_case } from "../../application/use-cases/chat/create-group.use-case";

import { decode_token_service } from "../../application/services/auth/decode-token.service";
import { chat_handler } from "../handlers/chat.handler";
import type { get_user_chat_use_case } from "../../application/use-cases/chat/get-users-chats.use-case";
import { message_handler } from "../handlers/message.handler";
import { new_message_use_case } from "../../application/use-cases/message/new-message.use-case";
export class websocket_gateway {
  private readonly decode_token_service: decode_token_service;

  constructor(
    private create_group_use_case: create_group_use_case,
    private get_user_chats_use_case: get_user_chat_use_case,
    private new_message_use_case: new_message_use_case,
  ) {
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
      this.get_user_chats_use_case,
    );

    const message_handler_import = new message_handler(
      io,
      socket,
      this.new_message_use_case,
    );

    chat_handler_import.handle_events(token);
    message_handler_import.handle_message_events();

    socket.on("disconnect", () =>
      console.log(`An user has disconnected id: ${socket.id}`),
    );
  }

  /*Controllers */
}
