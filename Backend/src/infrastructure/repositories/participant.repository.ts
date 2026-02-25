import type { participant_repository } from "../../domain/repositories/participant.repository";
import { prisma } from "../config/database/prisma.config";
import type { Participant } from "../external/database/generated/prisma/client";

export class participant_repository_implemented implements participant_repository {
  async add_participants(
    users_id: string[],
    chat_id: string,
  ): Promise<{ count: number }> {
    const result = await prisma.participant.createMany({
      data: users_id.map((user_id) => ({
        user_id: user_id,
        chat_id: chat_id,
        is_admin: false,
      })),
      skipDuplicates: true,
    });

    return result;
  }

  async delete_participant(chat_id: string, users_id: string[]) {
    await prisma.participant.deleteMany({
      where: {
        chat_id: chat_id,
        user_id: { in: users_id },
      },
    });
  }

  async find_participant(chat_id: string, user_id: string) {
    const participant = await prisma.participant.findFirst({
      where: {
        chat_id: chat_id,
        user_id: user_id,
      },
    });

    return participant;
  }

  async update_admin_status(participant: Participant) {
    const participant_updated = await prisma.participant.update({
      where: {
        id: participant.id,
      },
      data: {
        is_admin: !participant.is_admin,
      },
    });
    return participant_updated;
  }
}
