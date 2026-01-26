import type {
  register_dto,
  update_user_dto,
} from "../../application/dto/auth.dto";
import type { User } from "../../domain/entities/user.entity";
import type { auth_repository } from "../../domain/repositories/auth.repository";
import { prisma } from "../config/database/prisma.config";

export class auth_repository_implemented implements auth_repository {
  async register(user_data: register_dto): Promise<User> {
    const new_user = await prisma.user.create({
      data: {
        ...user_data,
      },
    });

    return new_user as User;
  }

  async update_user(
    user_id: string,
    user_data: update_user_dto,
  ): Promise<User> {
    const now = new Date();

    const user = {
      ...user_data,
      updated_at: now,
    };

    const updated_user = await prisma.user.update({
      where: { id: user_id },
      data: user,
    });

    return updated_user as User;
  }

  async delete_account(user_id: string): Promise<null> {
    await prisma.user.delete({
      where: {
        id: user_id,
      },
    });

    return null;
  }
}
