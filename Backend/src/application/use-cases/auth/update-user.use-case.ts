import type { auth_repository } from "../../../domain/repositories/auth.repository";
import type { user_repository } from "../../../domain/repositories/user.repository";
import { failure, success } from "../../../domain/result/result-pattern";
import type { update_user_dto } from "../../dto/auth.dto";
import { decode_token_service } from "../../services/auth/decode-token.service";

export class update_user_use_case {
  private readonly auth_repository: auth_repository;
  private readonly user_repository: user_repository;
  private readonly decode_token_service: decode_token_service;

  constructor(
    auth_repository: auth_repository,
    user_repository: user_repository,
  ) {
    this.auth_repository = auth_repository;
    this.user_repository = user_repository;
    this.decode_token_service = new decode_token_service();
  }

  async run(token: string, update_user_data: update_user_dto) {
    try {
      const decoded_token = this.decode_token_service.run(token);
      const user = await this.user_repository.find_by_id(decoded_token.user_id);
      if (!user) {
        let fail = {
          status: 404,
          message: "User not found",
          error: "User not found",
        };
        return failure(fail);
      }
      const updated_user = await this.auth_repository.update_user(
        decoded_token.user_id,
        update_user_data,
      );
      return success(updated_user);
    } catch (error) {
      throw error;
    }
  }
}
