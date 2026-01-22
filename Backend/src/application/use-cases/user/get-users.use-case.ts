import type { user_repository } from "../../../domain/repositories/user.repository";
import { failure, success } from "../../../domain/result/result-pattern";

//This use case is for backend uses only, for now at least
export class get_users_use_case {
  private readonly user_repository: user_repository;

  constructor(user_repository: user_repository) {
    this.user_repository = user_repository;
  }

  async run() {
    const users = await this.user_repository.get_users();

    if (users.length == 0) {
      let fail = {
        status: 200,
        message: "No users found",
        error: "No content",
      };
      return failure(fail);
    }
    return success(users);
  }
}
