import type { Message } from "./message.entity";
import type { Participant } from "./participant.entity";

export interface User {
  id: String;
  username: String;
  email: String;
  password: String;
  profile_picture?: Blob;
  status: Boolean;
  last_seen: Date;
  created_at: Date;
  updated_at?: Date;

  messages: Message[];
  participants: Participant[];
}
