import { useEffect, useRef, useState } from 'react';
import { Paperclip, Send, Zap } from 'lucide-react';
import { ChatMessage } from '../types';
import { MessageBubble } from '../components/chat/MessageBubble';
import { ConversationSidebar } from '../components/layout/ConversationSidebar';

const suggestions = [
  "Commandes incohérentes",
  "Risque de rupture (7)",
  "Marge par client (30)",
  "Retards de paiement"
];

const LLM_BASE_URL = import.meta.env.VITE_LM_STUDIO_URL || 'http://192.168.1.162:1234';
const LLM_MODEL = import.meta.env.VITE_LM_STUDIO_MODEL || 'local-model';
const SYSTEM_PROMPT =
  "Tu es l'assistant IA d'Entropie. Réponds en français, de manière claire et concise.";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

export const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const streamChatCompletion = async (prompt: string, assistantId: string) => {
    const history = messages.map((message) => ({
      role: message.type === 'user' ? 'user' : 'assistant',
      content: message.content
    }));

    const response = await fetch(`${LLM_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        stream: true,
        temperature: 0.2,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(detail || response.statusText);
    }

    if (!response.body) {
      throw new Error('Flux de réponse indisponible.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const data = trimmed.replace(/^data:\s*/, '');

        if (data === '[DONE]') {
          return;
        }

        try {
          const json = JSON.parse(data);
          const delta = json?.choices?.[0]?.delta?.content;
          if (delta) {
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantId
                  ? { ...message, content: message.content + delta }
                  : message
              )
            );
          }
        } catch {
          // Ignore malformed SSE chunks
        }
      }
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setSelectedConversation(null);
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleSubmit = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: trimmed,
      type: 'user',
      timestamp: new Date()
    };

    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      content: '',
      type: 'assistant',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);

    if (!selectedConversation && messages.length === 0) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: trimmed.substring(0, 30) + (trimmed.length > 30 ? '...' : ''),
        timestamp: new Date(),
      };
      setConversations((prev) => [newConversation, ...prev]);
      setSelectedConversation(newConversation.id);
    }

    try {
      await streamChatCompletion(trimmed, assistantId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la réponse du LLM.';
      setError(message);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: 'Désolé, une erreur est survenue.' }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-180px)]">
      <ConversationSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onConversationSelect={handleConversationSelect}
        onNewConversation={handleNewConversation}
      />

      <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl border shadow-sm relative overflow-hidden" style={{ borderColor: 'var(--card-border)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-red-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-full px-8 py-10 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Assistant Entropie
          </h1>
          <p className="text-sm text-gray-500">Votre LLM local en streaming, directement dans l’app.</p>
        </div>

        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex-1 min-h-[280px] max-h-[520px] overflow-y-auto rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-sm shadow-lg p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-400">
                Démarrez une conversation avec votre assistant.
              </div>
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                <Paperclip className="h-5 w-5" />
              </button>

              <div className="flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Posez votre question..."
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base"
                  disabled={isStreaming}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isStreaming || !inputValue.trim()}
                className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-3 transition-all shadow-lg hover:shadow-xl flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {error ? (
            <p className="text-xs text-red-600 text-center">{error}</p>
          ) : isStreaming ? (
            <p className="text-xs text-gray-500 text-center">L’assistant est en train de répondre…</p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputValue(suggestion)}
              className="bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 px-5 py-2.5 rounded-full transition-all hover:shadow-md flex items-center space-x-2"
            >
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};
