import type { create_chat_dto } from "../../application/dto/chat.dto";
import { create_chat_use_case } from "../../application/use-cases/chat/create-chat.use-case";
import { get_user_chat_use_case } from "../../application/use-cases/chat/get-users-chats.use-case";
import { chat_repository_implemented } from "../../infrastructure/repositories/chat.repository";
import { user_repository_implemented } from "../../infrastructure/repositories/user.repository";

export class chat_controller {
  private readonly user_repository = new user_repository_implemented();
  private readonly chat_repository = new chat_repository_implemented();

  async new_chat(token: string, data: create_chat_dto) {
    const create = new create_chat_use_case(
      this.user_repository,
      this.chat_repository,
    );

    try {
      const new_chat = await create.run(token, data);
      if (!new_chat.succes) {
        return new_chat.error;
      }

      return new_chat.data;
    } catch (error) {
      throw error;
    }
  }

  async get_chats(token: string) {
    const get = new get_user_chat_use_case(this.chat_repository);

    try {
      const chats = await get.run(token);
      if (!chats.succes) {
        return chats.error;
      }

      return {
        status: 200,
        message: "Chats retrieve",
        data: chats.data,
      };
    } catch (error) {
      throw error;
    }
  }
}
