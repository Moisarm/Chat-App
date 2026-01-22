import { get_users_use_case } from "../../application/use-cases/user/get-users.use-case";
import { user_repository_implemented } from "../../infrastructure/repositories/user.repository";

export class user_controller {
  private readonly user_repository = new user_repository_implemented();
  async get_users() {
    const use_case = new get_users_use_case(this.user_repository);

    try {
      const users = await use_case.run();

      if (!users.succes) {
        return users.error;
      }

      return {
        status: 200,
        message: "Users retrieved successfully",
        data: users.data,
      };
    } catch (error) {
      throw error;
    }
  }
}
