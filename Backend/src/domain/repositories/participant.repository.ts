import type { Participant } from "../entities/participant.entity";

export interface participant_repository {
  add_participants(
    users_id: string[],
    chat_id: string,
  ): Promise<{ count: number }>;
  // get_chat_participants(chat_id: string): Promise<Participant[]>;
  find_participant(chat_id: string, user_id: string): Promise<Participant>;
  delete_participant(chat_id: string, users_id: string[]): Promise<void>;
  update_admin_status(participant: Participant): Promise<Participant>;
}
