export interface Message {
  text: string;
  chat: chat;
  message_id: string;
}
export interface ApiResponse {
  data: any;
  success: boolean;
  message: string;
}
export interface chat {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}
