import { Search, ChevronDown, User, Settings } from 'lucide-react';
import { useState } from 'react';

interface TopbarProps {
  onProfileClick: () => void;
}

export const Topbar = ({ onProfileClick }: TopbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 animate-fade-in-up" style={{ borderColor: 'var(--card-border)' }}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo et nom */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md hover-glow transition-all duration-300">
            <div className="w-6 h-6 bg-white/30 rounded"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Entropie</h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Business Dashboard</p>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher dans le dashboard..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              style={{
                borderColor: 'var(--card-border)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* Switch Sites et Profil */}
        <div className="flex items-center space-x-4">
          {/* Switch Sites */}
          <button className="flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 border" style={{ borderColor: 'var(--card-border)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Switch Sites</span>
            <ChevronDown className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
          </button>

          {/* Profil utilisateur */}
          <button
            onClick={onProfileClick}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <div className="text-right">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Welcome back,</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Prodal</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <ChevronDown className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};
