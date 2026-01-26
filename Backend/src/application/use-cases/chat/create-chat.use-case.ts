import type { chat_repository } from "../../../domain/repositories/chat.repository";
import type { participant_repository } from "../../../domain/repositories/participant.repository";
import type { user_repository } from "../../../domain/repositories/user.repository";
import { failure, success } from "../../../domain/result/result-pattern";
import type { create_chat_dto } from "../../dto/chat.dto";
import { decode_token_service } from "../../services/auth/decode-token.service";

export class create_chat_use_case {
  private readonly user_repository: user_repository;
  private readonly chat_repository: chat_repository;
  private readonly decode_token_service: decode_token_service;

  constructor(
    user_repository: user_repository,
    chat_repository: chat_repository,
  ) {
    this.user_repository = user_repository;
    this.chat_repository = chat_repository;
    this.decode_token_service = new decode_token_service();
  }

  async run(token: string, data: create_chat_dto) {
    try {
      {
        if (!data.target_user) {
          let fail = {
            status: 400,
            message: "User must be provided",
            error: "Bad Request",
          };
          return failure(fail);
        }

        const user = await this.user_repository.find_by_username(
          data.target_user,
        );

        if (!user) {
          let fail = {
            status: 404,
            message: "User not found",
            error: "Not Found",
          };
          return failure(fail);
        }

        const decoded_token = this.decode_token_service.run(token);
        const current_user_id = decoded_token.user_id;

        const existing = await this.chat_repository.find_private_chat(
          current_user_id,
          user.id,
        );

        if (existing) {
          let response = {
            status: 200,
            message: "Chat already exists",
            data: existing,
          };
          return success(response);
        }

        data.target_user = user.id;
        const new_chat = await this.chat_repository.create_chat(
          current_user_id,
          data,
        );

        let response = {
          status: 201,
          message: "Chat created successfully",
          data: new_chat,
        };
        return success(response);
      }
    } catch (error) {
      throw error;
    }
  }
}
