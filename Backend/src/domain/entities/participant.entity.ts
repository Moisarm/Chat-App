import type { Chat } from "./chat.entity";
import type { User } from "./user.entity";

export interface Participant {
  id: string;
  user_id: string;
  chat_id: string;
  is_admin: boolean;

  user?: User;
  chat?: Chat;
}
