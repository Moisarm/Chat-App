import type { User } from "../entities/user.entity";

export interface auth_repository {
  register(user_data: User): Promise<User>;
  login(user_data: string): Promise<User>;
  update_user(user_data: User): Promise<User>;
  delete_account(user_data: String): Promise<null>;
}
