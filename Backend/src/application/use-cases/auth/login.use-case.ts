import type { user_repository } from "../../../domain/repositories/user.repository";
import { failure, success } from "../../../domain/result/result-pattern";
import type { user_login_dto } from "../../dto/auth.dto";
import { compare_password_service } from "../../services/auth/compare-passwords.service";
import { generate_token_service } from "../../services/auth/create-token.service";

export class login_use_case {
  private readonly user_repository;
  private readonly generate_token_service: generate_token_service;
  private readonly compare_password_service: compare_password_service;

  constructor(user_repository: user_repository) {
    this.user_repository = user_repository;
    this.generate_token_service = new generate_token_service();
    this.compare_password_service = new compare_password_service();
  }

  async run(user_data: user_login_dto) {
    const user = await this.user_repository.find_by_email(user_data.email);

    if (!user) {
      return failure("User not found");
    }

    const pass = await this.compare_password_service.run(
      user_data.password,
      user.password,
    );

    if (!pass.succes) {
      return pass;
    }

    const token = this.generate_token_service.run(user);

    if (!token.succes) {
      return token;
    }

    let response = {
      user: user,
      token: token.data,
    };

    return success(response);
  }
}
