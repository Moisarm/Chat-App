import type { message_repository } from "../../../domain/repositories/message.repository";
import type { user_repository } from "../../../domain/repositories/user.repository";
import { failure, success } from "../../../domain/result/result-pattern";
import type { new_message_dto } from "../../dto/message.dto";

export class new_message_use_case {
  private readonly user_repository: user_repository;
  private readonly message_repository: message_repository;

  constructor(
    user_repository: user_repository,
    chat_repository: message_repository,
  ) {
    this.user_repository = user_repository;
    this.message_repository = chat_repository;
  }

  async run(token: string, message: new_message_dto) {
    try {
      const new_message = await this.message_repository.save_message(message);
      if (!new_message) {
        return failure("error saving message");
      }

      return success(new_message);
    } catch (error) {
      throw error;
    }
  }
}
