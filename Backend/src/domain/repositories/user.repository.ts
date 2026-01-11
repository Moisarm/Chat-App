import type { User } from "../entities/user.entity";

export interface User_repository {
  register(user_data: User): Promise<User>;
  find_by_email(email: String): Promise<User>;
}
