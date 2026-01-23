export interface create_chat_dto {
  target_user: string;
}

export interface create_group_dto {
  users: string[];
  group_name: string;
}
