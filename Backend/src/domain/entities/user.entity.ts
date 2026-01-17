import type { Message } from "./message.entity";
import type { Participant } from "./participant.entity";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profile_picture?: string;
  status: string;
  last_seen: Date;
  created_at: Date;
  updated_at?: Date;

  messages: Message[];
  participants: Participant[];
}
