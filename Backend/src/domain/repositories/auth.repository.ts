import type {
  register_dto,
  update_user_dto,
} from "../../application/dto/auth.dto";
import type { User } from "../entities/user.entity";

export interface auth_repository {
  register(user_data: register_dto): Promise<User>;
  update_user(user_id: string, user_data: update_user_dto): Promise<User>;
  delete_account(user_id: string): Promise<null>;
}
