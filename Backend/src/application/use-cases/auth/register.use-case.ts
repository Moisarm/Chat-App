import type { auth_repository } from "../../../domain/repositories/auth.repository";
import type { user_repository } from "../../../domain/repositories/user.repository";
import { failure, success } from "../../../domain/result/result-pattern";
import type { register_dto } from "../../dto/auth.dto";
import { generate_token_service } from "../../services/auth/create-token.service";
import { hash_password_service } from "../../services/auth/hash-password.service";

export class register_use_case {
  private readonly auth_repository: auth_repository;
  private readonly user_repository: user_repository;
  private readonly generate_token_service: generate_token_service;
  private readonly hash_password_service: hash_password_service;

  constructor(
    auth_repository: auth_repository,
    user_repository: user_repository,
  ) {
    this.auth_repository = auth_repository;
    this.user_repository = user_repository;
    this.generate_token_service = new generate_token_service();
    this.hash_password_service = new hash_password_service();
  }

  async run(user_data: register_dto) {
    const user_exist = await this.user_repository.find_by_email(
      user_data.email,
    );

    if (user_exist) {
      return failure("User Already exist");
    }

    const hashed_password = await this.hash_password_service.run(
      user_data.password,
    );

    if (!hashed_password.succes) {
      return hashed_password;
    }

    const new_user = await this.auth_repository.register({
      ...user_data,
      password: hashed_password.data,
    });

    const token = this.generate_token_service.run(new_user);

    if (!token.succes) {
      return token;
    }

    let response = {
      user: new_user,
      token: token,
    };
    return success(response);
  }
}
