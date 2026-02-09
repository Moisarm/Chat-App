import type { new_message_dto } from "../../application/dto/message.dto";
import type { Message } from "../../domain/entities/message.entity";
import type { message_repository } from "../../domain/repositories/message.repository";
import { prisma } from "../config/database/prisma.config";

export class message_repository_implemented implements message_repository {
  async save_message(message: new_message_dto): Promise<Message> {
    const new_message = await prisma.message.create({
      data: {
        chat_id: message.chat_id,
        sender_id: message.sender_id,
        content: message.content,
      },
    });
    return new_message as unknown as Message;
  }

  async get_chat_messages(
    chat_id: string,
    limit: number,
    last_message_id?: string,
  ): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where: { chat_id },
      take: limit,
      ...(last_message_id && {
        skip: 1,
        cursor: {
          id: last_message_id,
        },
      }),
      orderBy: {
        created_at: "desc",
      },
    });

    return messages as unknown as Message[];
  }

  async mark_as_readed(message_id: string): Promise<void> {}

  async delete_message(message_id: string): Promise<void> {
    await prisma.message.delete({
      where: { id: message_id },
    });
    return;
  }
}
