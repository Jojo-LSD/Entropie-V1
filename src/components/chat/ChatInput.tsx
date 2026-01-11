import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-end space-x-4">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question sur BoucheriePro..."
            className="w-full rounded-2xl border border-gray-300 px-6 py-4 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none shadow-sm"
            rows={1}
            disabled={disabled}
            style={{ minHeight: '56px', maxHeight: '200px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 200) + 'px';
            }}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
          className="shrink-0 h-14 w-14 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};