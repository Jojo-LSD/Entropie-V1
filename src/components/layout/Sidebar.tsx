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
    <div className="w-64 glass-strong h-screen flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/30"></div>
          <span className="text-lg font-bold text-slate-900">Entropie</span>
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
                  `flex items-center px-4 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30'
                      : 'text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm'
                  }`
                }
              >
                <item.icon className="mr-3 h-4 w-4" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Projects Section */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-4">
            Tableaux de bords
          </h3>
          <ul className="space-y-1">
            {projects.map((item) => (
              <li key={item.name}>
                {item.href ? (
                  <NavLink
                    to={item.href}
                    className="flex items-center px-4 py-2.5 text-sm text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm rounded-xl transition-all duration-200"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ) : (
                  <button className="flex items-center w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm rounded-xl transition-all duration-200">
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-4">
            Automatisation
          </h3>
          <ul className="space-y-1">
            {resources.map((item) => (
              <li key={item.name}>
                {item.name === 'Commande Vente' ? (
                  <div className="flex items-center px-4 py-2.5 text-sm text-slate-400 rounded-xl cursor-not-allowed relative group">
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-auto text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-lg font-medium">
                      Bientôt
                    </span>
                  </div>
                ) : item.href ? (
                  <NavLink
                    to={item.href}
                    className="flex items-center px-4 py-2.5 text-sm text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm rounded-xl transition-all duration-200"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ) : (
                  <button className="flex items-center w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm rounded-xl transition-all duration-200">
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-3 border-t border-white/20">
        {/* Reports Link */}
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center px-4 py-2.5 text-sm rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm'
            }`
          }
        >
          <BarChart3 className="mr-3 h-4 w-4" />
          <span className="font-medium">Rapports</span>
        </NavLink>

        {/* User Profile */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="flex items-center space-x-3 w-full hover:bg-white/60 rounded-xl p-3 transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center ring-2 ring-violet-100 group-hover:ring-violet-200 transition-all shadow-lg shadow-violet-500/30">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-slate-900 truncate">Prodal</p>
            <p className="text-xs text-slate-500 truncate">prodal@entropie.com</p>
          </div>
          <Settings className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </button>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-strong rounded-2xl p-6 w-80 max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Prodal</h3>
                <p className="text-sm text-slate-500">prodal@entropie.com</p>
              </div>
            </div>

            <div className="space-y-1">
              <button className="flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-white/60 rounded-xl transition-all duration-200">
                <Settings className="h-4 w-4 text-slate-600" />
                <span className="text-slate-700 font-medium">Paramètres</span>
              </button>

              <button className="flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-white/60 rounded-xl transition-all duration-200">
                <HelpCircle className="h-4 w-4 text-slate-600" />
                <span className="text-slate-700 font-medium">Aide</span>
              </button>

              <hr className="my-3 border-slate-200" />

              <button className="flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-red-50 rounded-xl transition-all duration-200 text-red-600">
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
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