import { useEffect, useRef, useState } from 'react';
import { Paperclip, Send, ChevronDown, MoreVertical, Mic, FileText, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { MessageBubble } from '../components/chat/MessageBubble';
import { ChatAssistantSidebar } from '../components/layout/ChatAssistantSidebar';

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
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      <div className="flex-shrink-0">
        <ChatAssistantSidebar onNewChat={handleNewConversation} />
      </div>

      <div className="flex-1 bg-gradient-to-br from-lime-50/30 via-white/90 to-green-50/30 backdrop-blur-sm rounded-2xl border shadow-sm relative overflow-hidden" style={{ borderColor: 'var(--card-border)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
          <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-all">
            <span className="text-sm font-semibold text-gray-700">LLM v5</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-[calc(100%-5rem)] px-8 py-6 relative z-10">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              {/* Logo */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome Text */}
              <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold text-gray-900">Welcome, how can I help you</h1>
                <p className="text-base text-gray-600 max-w-lg">
                  Start by scripting a task, and let the chat take over.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto mb-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
              <div className="flex items-center px-5 py-4 space-x-3">
                <Sparkles className="h-5 w-5 text-lime-500 flex-shrink-0" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Start your request, and let orion handle everything"
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm"
                  disabled={isStreaming}
                />
              </div>

              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-all">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-all">
                    <FileText className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
                    <Sparkles className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-medium">Reasoning</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
                    <span className="text-sm text-gray-700 font-medium">Writing Style</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-all">
                    <Mic className="h-5 w-5 text-gray-500" />
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isStreaming || !inputValue.trim()}
                    className="bg-lime-500 hover:bg-lime-600 text-white rounded-full p-3 transition-all shadow-md hover:shadow-lg flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {error ? (
              <p className="text-xs text-red-600 text-center mt-3">{error}</p>
            ) : (
              <p className="text-xs text-gray-500 text-center mt-3">
                {isStreaming ? "L'assistant est en train de répondre…" : "LLM may make errors. Check important information."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
