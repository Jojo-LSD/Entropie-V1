import {
  Plus,
  MessageSquare,
  FolderKanban,
  Clock,
  BookOpen,
  Folder,
  Settings,
  Globe,
  ChevronRight
} from 'lucide-react';

interface ChatAssistantSidebarProps {
  onNewChat: () => void;
}

export const ChatAssistantSidebar = ({ onNewChat }: ChatAssistantSidebarProps) => {
  return (
    <div className="w-72 bg-white/90 backdrop-blur-sm rounded-2xl border shadow-sm flex flex-col h-full" style={{ borderColor: 'var(--card-border)' }}>
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white border-2 border-gray-200 hover:bg-gray-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
        >
          <Plus className="h-4 w-4 text-gray-700" />
          <span className="text-sm font-semibold text-gray-700">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-2">Features</h3>
          <div className="space-y-1">
            <button className="flex items-center space-x-3 w-full px-3 py-2.5 text-left rounded-lg hover:bg-gray-50 transition-all duration-150">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Historique</span>
            </button>
            <button className="flex items-center space-x-3 w-full px-3 py-2.5 text-left rounded-lg hover:bg-gray-50 transition-all duration-150">
              <FolderKanban className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Projet</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-150">
          <div className="h-10 w-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">MN</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Maxim Nuel</p>
            <p className="text-xs text-gray-500 truncate">hey@agency.com</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
