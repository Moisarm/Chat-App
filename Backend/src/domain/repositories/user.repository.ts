import type { User } from "../entities/user.entity";

export interface User_repository {
  find_by_email(email: String): Promise<User>;
  find_by_username(username: String): Promise<User>;
  get_users(): Promise<User[]>;
}
