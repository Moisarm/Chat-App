import { response } from "express";
import type {
  register_dto,
  user_login_dto,
} from "../../application/dto/auth.dto";
import { login_use_case } from "../../application/use-cases/auth/login.use-case";
import { register_use_case } from "../../application/use-cases/auth/register.use-case";
import { auth_repository_implemented } from "../../infrastructure/repositories/auth.repository";
import { user_repository_implemented } from "../../infrastructure/repositories/user.repository";
import type { User } from "../../domain/entities/user.entity";

export class auth_controller {
  private readonly auth_repository = new auth_repository_implemented();
  private readonly user_repository = new user_repository_implemented();

  async register(user_data: register_dto) {
    const register = new register_use_case(
      this.auth_repository,
      this.user_repository,
    );

    try {
      const new_user = await register.run(user_data);

      if (!new_user.succes) {
        return {
          status: 400,
          message: new_user.error,
          error: new_user.error,
        };
      }

      return {
        status: 201,
        message: "User Registered",
        data: new_user.data,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(login_data: user_login_dto) {
    const login = new login_use_case(this.user_repository);

    try {
      const response = await login.run(login_data);

      if (!response.succes) {
        return {
          status: 400,
          message: response.error,
          error: response.error,
        };
      }

      const public_user: Partial<User> = {
        username: response.data.user.username,
        email: response.data.user.email,
      };

      let data = {
        user: public_user,
        token: response.data.token,
      };
      return {
        status: 200,
        message: `Welcome ${response.data.user.username}`,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
