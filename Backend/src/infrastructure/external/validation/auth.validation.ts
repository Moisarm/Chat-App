import { IsEmail, IsNotEmpty, IsString, min, MinLength } from "class-validator";
import type {
  register_dto,
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
