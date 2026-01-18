export interface user_login_dto {
  email: string;
  password: string;
}

export interface register_dto {
  email: string;
  username: string;
  password: string;
  profile_picture?: string;
}

export interface update_user_dto {
  email?: string;
  username?: string;
  password?: string;
  profile_picture?: string;
}
