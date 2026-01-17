import type { User } from "../entities/user.entity";

export interface user_repository {
  find_by_email(email: string): Promise<User>;
  find_by_username(username: string): Promise<User>;
  get_users(): Promise<User[]>;
}
