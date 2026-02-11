import type {
  create_chat_dto,
  create_group_dto,
} from "../../application/dto/chat.dto";
import type { Chat } from "../../domain/entities/chat.entity";
import type { chat_repository } from "../../domain/repositories/chat.repository";
import { prisma } from "../config/database/prisma.config";

export class chat_repository_implemented implements chat_repository {
  async create_chat(
    current_user_id: string,
    data: create_chat_dto,
  ): Promise<Chat> {
    const new_chat = await prisma.chat.create({
      data: {
        is_group: false,
        participants: {
          create: [{ user_id: current_user_id }, { user_id: data.target_user }],
        },
      },

      include: {
        participants: true,
        messages: true,
      },
    });

    return new_chat as unknown as Chat;
  }

  async create_group(
    current_user_id: string,
    data: create_group_dto,
  ): Promise<Chat> {
    const new_group = await prisma.chat.create({
      data: {
        is_group: true,
        group_name: data.group_name,
        participants: {
          create: data.users.map((id) => ({
            user_id: id,
          })),
        },
      },
      include: {
        participants: true,
        messages: true,
      },
    });

    return new_group as unknown as Chat;
  }
  async find_chat_by_id(chat_id: string): Promise<Chat> {
    const chat = await prisma.chat.findUnique({
      where: { id: chat_id },
    });

    return chat as unknown as Chat;
  }

  async get_user_chat(user_id: string): Promise<Chat[]> {
    const chats = await prisma.chat.findMany({
      where: {
        participants: {
          some: {
            user_id: user_id,
          },
        },
      },
      include: {
        participants: {
          where: { NOT: { user_id: user_id } },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                profile_picture: true,
                status: true,
              },
            },
          },
        },
        messages: {
          orderBy: {
            created_at: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return chats as unknown as Chat[];
  }

  async find_private_chat(
    user_id: string,
    target_user_id: string,
  ): Promise<Chat> {
    try {
      const chat = await prisma.chat.findFirst({
        where: {
          is_group: false,
          AND: [
            {
              participants: {
                some: { user_id: user_id },
              },
            },
            {
              participants: {
                some: { user_id: target_user_id },
              },
            },
          ],
        },
        include: {
          participants: true,
        },
      });

      return chat as unknown as Chat;
    } catch (error) {
      console.error("Error en find_private_chat:", error);
      throw error;
    }
  }

  async delete_chat(chat_id: string): Promise<null> {
    await prisma.chat.delete({
      where: { id: chat_id },
    });

    return null;
  }
}
