export interface User {
  id: String;
  username: String;
  email: String;
  password: String;
  profile_picture?: Blob;
  created_at: Date;
  updated_at?: Date;
}
