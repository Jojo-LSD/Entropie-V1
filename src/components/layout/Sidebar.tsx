import { NavLink } from 'react-router-dom';
import { Home, BarChart3, FileText, ShoppingCart, User, Grid3x3 as Grid3X3, Settings, LogOut, HelpCircle, Activity, Table } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
];

const projects = [
  { name: 'Tous les tableaux de bords', href: '/dashboard', icon: Grid3X3 },
  { name: 'Dashboard Interactif', href: '/interactive-dashboard', icon: Activity },
  { name: 'Tables', href: '/tables', icon: Table },
];

const resources = [
  { name: 'Commande Achat', href: '/commande-achat', icon: ShoppingCart },
  { name: 'Commande Vente', href: '/dashboard', icon: FileText },
];

export const Sidebar = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
    <div className="w-64 bg-white h-screen flex flex-col border-r border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
          <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Entropie</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1 mb-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gray-100 font-semibold'
                      : 'hover:bg-gray-50'
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                })}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Projects Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-4" style={{ color: 'var(--text-muted)' }}>
            Tableaux de bords
          </h3>
          <ul className="space-y-1">
            {projects.map((item) => (
              <li key={item.name}>
                {item.href ? (
                  <NavLink
                    to={item.href}
                    className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 rounded-lg transition-all duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ) : (
                  <button className="flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 rounded-lg transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-4" style={{ color: 'var(--text-muted)' }}>
            Automatisation
          </h3>
          <ul className="space-y-1">
            {resources.map((item) => (
              <li key={item.name}>
                {item.name === 'Commande Vente' ? (
                  <div className="flex items-center px-4 py-2.5 text-sm rounded-lg cursor-not-allowed relative group" style={{ color: 'var(--text-light)' }}>
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                    <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded font-medium" style={{ color: 'var(--text-muted)' }}>
                      Bientôt
                    </span>
                  </div>
                ) : item.href ? (
                  <NavLink
                    to={item.href}
                    className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 rounded-lg transition-all duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ) : (
                  <button className="flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 rounded-lg transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-3 border-t" style={{ borderColor: 'var(--card-border)' }}>
        {/* Reports Link */}
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-blue-500 text-white font-semibold shadow-md'
                : 'hover:bg-gray-50'
            }`
          }
          style={({ isActive }) => ({
            color: isActive ? '#FFFFFF' : 'var(--text-secondary)'
          })}
        >
          <BarChart3 className="mr-3 h-5 w-5" />
          <span>Rapports</span>
        </NavLink>

        {/* User Profile */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="flex items-center space-x-3 w-full hover:bg-gray-50 rounded-lg p-3 transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>Prodal</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>prodal@entropie.com</p>
          </div>
          <Settings className="h-4 w-4 transition-colors" style={{ color: 'var(--text-light)' }} />
        </button>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 max-w-sm mx-4 shadow-2xl border" style={{ borderColor: 'var(--card-border)' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Prodal</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>prodal@entropie.com</p>
              </div>
            </div>

            <div className="space-y-1">
              <button className="flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-gray-50 rounded-lg transition-all duration-200">
                <Settings className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Paramètres</span>
              </button>

              <button className="flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-gray-50 rounded-lg transition-all duration-200">
                <HelpCircle className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Aide</span>
              </button>

              <hr className="my-3" style={{ borderColor: 'var(--card-border)' }} />

              <button className="flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-red-50 rounded-lg transition-all duration-200" style={{ color: 'var(--danger)' }}>
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 rounded-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};