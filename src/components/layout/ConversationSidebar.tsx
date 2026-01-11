import { MessageSquare, Plus } from 'lucide-react';
import { PageSidebar } from './PageSidebar';

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

interface ConversationSidebarProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onConversationSelect: (conversationId: string) => void;
  onNewConversation: () => void;
}

export const ConversationSidebar = ({
  conversations,
  selectedConversation,
  onConversationSelect,
  onNewConversation,
}: ConversationSidebarProps) => {
  return (
    <PageSidebar title="Conversations">
      <button
        onClick={onNewConversation}
        className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg transition-all duration-200 hover:from-orange-600 hover:to-red-600 shadow-md mb-4"
      >
        <Plus className="h-4 w-4" />
        <span className="text-sm font-semibold">Nouvelle conversation</span>
      </button>

      <div className="space-y-1">
        {conversations.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Aucune conversation
            </p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onConversationSelect(conversation.id)}
              className={`flex items-start space-x-3 w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                selectedConversation === conversation.id
                  ? 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--text-secondary)' }} />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{
                    color: selectedConversation === conversation.id ? 'var(--primary-orange)' : 'var(--text-primary)',
                  }}
                >
                  {conversation.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {new Date(conversation.timestamp).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </PageSidebar>
  );
};
