import { decode } from "jsonwebtoken";
import type { chat_repository } from "../../../domain/repositories/chat.repository";
import { decode_token_service } from "../../services/auth/decode-token.service";
import { failure, success } from "../../../domain/result/result-pattern";

export class get_user_chat_use_case {
  private readonly chat_repository: chat_repository;
  private readonly decode_token_service: decode_token_service;

  constructor(chat_repository: chat_repository) {
    this.chat_repository = chat_repository;
    this.decode_token_service = new decode_token_service();
  }

  async run(token: string) {
    const decoded = this.decode_token_service.run(token);
    const chats = await this.chat_repository.get_user_chat(decoded.user_id);

    if (chats.length == 0) {
      return failure("No chats registered");
    }

    return success(chats);
  }
}
