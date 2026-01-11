import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../../types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { chatService } from '../../api/chatApi';
import { Card } from '../ui/Card';
import { Loader } from 'lucide-react';

export const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message on component mount
    const welcomeMessage: ChatMessage = {
      id: '1',
      content: 'Bonjour ! Je suis votre assistant IA pour BoucheriePro. Comment puis-je vous aider aujourd\'hui ?',
      type: 'assistant',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        type: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] max-w-4xl mx-auto">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Assistant IA - BoucheriePro</h2>
        <p className="text-sm text-gray-500">Posez vos questions sur votre activité</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center space-x-3 max-w-xl">
              <div className="flex-shrink-0 h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Loader className="h-4 w-4 text-white animate-spin" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <p className="text-sm text-gray-500">L'assistant réfléchit...</p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </Card>
  );
};