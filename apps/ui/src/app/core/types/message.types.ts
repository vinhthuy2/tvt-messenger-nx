export interface ChatMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isDelivered: boolean;
}
