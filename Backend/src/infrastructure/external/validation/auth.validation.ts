import { IsEmail, IsNotEmpty, IsString, min, MinLength } from "class-validator";
import type {
  register_dto,
  update_user_dto,
  user_login_dto,
} from "../../../application/dto/auth.dto";

export class user_login_validation implements user_login_dto {
  @IsNotEmpty({ message: "Email is Required" })
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: "Password is Required" })
  @IsString()
  password!: string;
}

export class register_validation implements register_dto {
  @IsNotEmpty({ message: "Email is Required" })
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  @IsNotEmpty({ message: "Username is Required" })
  username!: string;

  profile_picture?: string | undefined;
}

export class update_user_validation implements update_user_dto {
  @IsString()
  username?: string | undefined;

  @IsString()
  @IsEmail()
  email?: string | undefined;

  @IsString()
  @MinLength(8)
  password?: string | undefined;

  @IsString()
  profile_picture?: string | undefined;
}
