import type { User } from "../../domain/entities/user.entity";
import type { user_repository } from "../../domain/repositories/user.repository";
import { prisma } from "../config/database/prisma.config";

export class user_repository_implemented implements user_repository {
  async find_by_email(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user as User;
  }

  async find_by_username(username: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user as User;
  }

  async get_users(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users as User[];
  }
}
