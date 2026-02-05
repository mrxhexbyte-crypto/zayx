export interface ChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  reactions?: string[];
}

export interface ConversationContext {
  userId: string;
  productId?: string;
  previousMessages: ChatMessage[];
  userPreferences?: Record<string, unknown>;
}

export interface AIResponse {
  reply: string;
  confidence?: number;
  suggestedProducts?: string[];
  actionRequired?: string;
}
