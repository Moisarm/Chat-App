export interface Message {
  id: string;
  chat_id: string;
  content: string;
  type?: string;
  file_url?: string;
  created_at: Date;
  updated_at?: Date;
  sender_id: string;
  is_readed: boolean;
}
