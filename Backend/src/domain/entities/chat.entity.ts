import type { Message } from "./message.entity";
import type { Participant } from "./participant.entity";

export interface Chat {
  id: String;
  is_group: Boolean;
  group_name?: String;
  created_at: Date;
  messages: Message[];
  participant: Participant[];
}
