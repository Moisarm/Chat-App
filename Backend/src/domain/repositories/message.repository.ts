import type { new_message_dto } from "../../application/dto/message.dto";
import type { Message } from "../entities/message.entity";

export interface message_repository {
  save_message(message: new_message_dto): Promise<Message>;
  get_chat_messages(
    chat_id: string,
    limit: number,
    last_message_id?: string,
  ): Promise<Message[]>;
  mark_as_readed(message_id: string): Promise<void>;
  delete_message(message_id: string): Promise<void>;
}
