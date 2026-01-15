import type { User } from "./user.entity";

export interface Message {
  id: String;
  chat_id: string;
  text: String;
  media?: Blob;
  created_at: Date;
  updated_at?: Date;
  sent_by: User;
}
