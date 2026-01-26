import type { auth_repository } from "../../../domain/repositories/auth.repository";
import type { user_repository } from "../../../domain/repositories/user.repository";
import { failure, success } from "../../../domain/result/result-pattern";
import { decode_token_service } from "../../services/auth/decode-token.service";

export class delete_user_use_case {
  private readonly auth_repository: auth_repository;
  private readonly user_repository: user_repository;
  private readonly decode_token_service: decode_token_service;

  constructor(
    auth_repository: auth_repository,
    user_repository: user_repository,
  ) {
    ((this.auth_repository = auth_repository),
      (this.user_repository = user_repository));
    this.decode_token_service = new decode_token_service();
  }

  async run(token: string) {
    const decoded = this.decode_token_service.run(token);

    try {
      const user = await this.user_repository.find_by_id(decoded.user_id);
      if (!user) {
        return failure("Fail finding the user somehow");
      }
      await this.auth_repository.delete_account(user.id);
      return success("User Has been deleted");
    } catch (error) {
      throw error;
    }
  }
}
