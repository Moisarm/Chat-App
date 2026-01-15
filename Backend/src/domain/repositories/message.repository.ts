import type { Message } from "../entities/message.entity";

export interface message_repository {
  save_message(message: Message): Promise<Message>;
  get_chat_messages(chat_id: string): Promise<Message[]>;
  mark_as_readed(message_id: string): Promise<void>;
  delete_message(message_id: string): Promise<void>;
}
