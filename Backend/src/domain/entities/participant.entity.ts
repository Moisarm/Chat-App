import type { Chat } from "./chat.entity";
import type { User } from "./user.entity";

export interface Participant {
  id: String;
  user_id: String;
  chat_id: String;
  is_admin: Boolean;

  user: User;
  chat: Chat;
}
