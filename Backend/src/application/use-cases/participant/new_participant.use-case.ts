import type { chat_repository } from "../../../domain/repositories/chat.repository";
import type { participant_repository } from "../../../domain/repositories/participant.repository";
import { failure, success } from "../../../domain/result/result-pattern";
import type { new_participant_dto } from "../../dto/participant.dto";

export class new_participant_use_case {
  private readonly participant_repository: participant_repository;
  private readonly chat_repository: chat_repository;
  constructor(
    participant_repo_injection: participant_repository,
    chat_repo_injection: chat_repository,
  ) {
    this.participant_repository = participant_repo_injection;
    this.chat_repository = chat_repo_injection;
  }

  async run(data: new_participant_dto) {
    if (data.users_id.length === 0) {
      return failure("should pick at least one user");
    }

    if (!data.chat_id) {
      return failure("A Group is required");
    }

    const chat = await this.chat_repository.find_chat_by_id(data.chat_id);
    if (!chat) {
      return failure("Chat doesn't exist");
    }

    const sanitize_users = [...new Set([...data.users_id])];

    const participants_in_chat =
      await this.participant_repository.find_participants_by_chat_id(
        data.chat_id,
      );

    const existing_user_ids = new Set(
      participants_in_chat.map((participant) => participant.user_id),
    );

    //Filter: Just allow the ids wich are not included in existing_users_id
    const users_to_add = sanitize_users.filter(
      (id) => !existing_user_ids.has(id),
    );

    if (users_to_add.length === 0) {
      return failure("All selected users are already members of this chat");
    }

    // Insert; Just insert the ids that aren't in this chat
    const result = await this.participant_repository.add_participants(
      users_to_add,
      data.chat_id,
    );

    return success(result);
  }
}
