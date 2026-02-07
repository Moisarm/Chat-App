import type { chat_repository } from "../../../domain/repositories/chat.repository";
import type { user_repository } from "../../../domain/repositories/user.repository";
import { failure, success } from "../../../domain/result/result-pattern";
import type { create_group_dto } from "../../dto/chat.dto";
import { decode_token_service } from "../../services/auth/decode-token.service";

export class create_group_use_case {
  private readonly user_repository: user_repository;
  private readonly chat_repository: chat_repository;
  private readonly decode_token_service: decode_token_service;

  constructor(
    user_repository: user_repository,
    chat_repository: chat_repository,
  ) {
    this.chat_repository = chat_repository;
    this.user_repository = user_repository;
    this.decode_token_service = new decode_token_service();
  }

  async run(token: string, data: create_group_dto) {
    try {
      const decoded = this.decode_token_service.run(token);

      if (data.users.length == 0) {
        return failure("should pick at least one user");
      }

      const sanitize_users = [...new Set([...data.users])];

      const users = await this.user_repository.find_many_by_id(sanitize_users);

      if (users.length !== sanitize_users.length) {
        return failure("Not Found");
      }

      if (!data.group_name) {
        data = {
          ...data,
          group_name: "New Group",
        };
      }

      data = {
        ...data,
        users: sanitize_users,
      };

      const new_group = await this.chat_repository.create_group(
        decoded.user_id,
        data,
      );

      return success(new_group);
    } catch (error) {
      throw error;
    }
  }
}
