import { NavLink } from 'react-router-dom';
import { Home, Grid3x3 as Grid3X3, Activity, Table, ShoppingCart, FileText, BarChart3, MessageSquare } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Chat Assistant', href: '/chat', icon: MessageSquare },
  { name: 'Dashboard Interactif', href: '/interactive-dashboard', icon: Activity },
  { name: 'Tables', href: '/tables', icon: Table },
  { name: 'Commande Achat', href: '/commande-achat', icon: ShoppingCart },
  { name: 'Rapports', href: '/reports', icon: BarChart3 },
];

export const NavBar = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl border shadow-sm" style={{ borderColor: 'var(--card-border)' }}>
      <div className="px-6">
        <nav className="flex items-center space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isChatAssistant = item.href === '/chat';
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 relative overflow-hidden ${
                    isActive
                      ? isChatAssistant
                        ? 'border-transparent bg-gradient-to-r from-violet-50/50 via-blue-50/50 to-cyan-50/50'
                        : 'border-blue-500 bg-blue-50/50'
                      : 'border-transparent hover:bg-gray-50'
                  }`
                }
                style={({ isActive }) =>
                  !isChatAssistant ? { color: isActive ? '#3B82F6' : 'var(--text-secondary)' } : {}
                }
              >
                {isChatAssistant && (
                  <div className="absolute inset-0 chat-gradient opacity-10 -z-10" />
                )}
                <Icon className={isChatAssistant ? "h-5 w-5 chat-text-gradient" : "h-5 w-5"} />
                <span className={isChatAssistant ? "chat-text-gradient font-semibold" : ""}>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Item "Commande Vente" disabled */}
          <div className="flex items-center space-x-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 border-transparent cursor-not-allowed opacity-50">
            <FileText className="h-5 w-5" />
            <span style={{ color: 'var(--text-light)' }}>Commande Vente</span>
            <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded font-medium" style={{ color: 'var(--text-muted)' }}>
              Bientôt
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
};
