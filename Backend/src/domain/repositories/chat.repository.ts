import type {
  create_chat_dto,
  create_group_dto,
} from "../../application/dto/chat.dto";
import type { Chat } from "../entities/chat.entity";

export interface chat_repository {
  find_chat_by_id(chat_id: string): Promise<Chat>;
  find_private_chat(user_id: string, target_user_id: string): Promise<Chat>;
  create_chat(current_user_id: string, data: create_chat_dto): Promise<Chat>;
  create_group(current_user_id: string, data: create_group_dto): Promise<Chat>;
  get_user_chat(user_id: string): Promise<Chat[]>;
  delete_chat(chat_id: string): Promise<null>;
}
