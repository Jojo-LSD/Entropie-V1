import { ChatMessage } from '../types';
import { simulateAPIDelay } from '../mock/chat';

export class ChatService {
  // Future: Replace with actual API calls to backend/FastAPI
  async sendMessage(message: string): Promise<string> {
    // Mock API call - replace with actual endpoint later
    // return apiClient.post<{response: string}>('/chat', { message });
    return simulateAPIDelay();
  }

  async getChatHistory(): Promise<ChatMessage[]> {
    // Future: Fetch chat history from backend
    return [];
  }
}

export const chatService = new ChatService();