import type { Chat } from "../entities/chat.entity";

export interface chat_repository {
  find_chat_by_id(chat_id: string): Promise<Chat>;
  create_chat(is_group: boolean, username: string[]): Promise<Chat>;
  get_user_chat(user_id: string): Promise<Chat[]>;
  delete_chat(chat_id: string): Promise<null>;
}
