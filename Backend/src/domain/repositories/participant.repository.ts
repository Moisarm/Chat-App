import type { Participant } from "../entities/participant.entity";

export interface participant_repository {
  add_participant(user_id: string, chat_id: string): Promise<Participant>;
  // get_chat_participants(chat_id: string): Promise<Participant[]>;
  delete_participant(chat_id: string, user_id: string): Promise<void>;
  update_admin_status(
    chat_id: string,
    user_id: string,
    status: boolean,
  ): Promise<void>;
}
