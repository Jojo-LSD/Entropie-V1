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
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded"></div>
          <span className="text-lg font-semibold text-gray-900">Entropie</span>
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
                  `flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Projects Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Tableaux de bords
          </h3>
          <ul className="space-y-1">
            {projects.map((item) => (
              <li key={item.name}>
                {item.href ? (
                  <NavLink
                    to={item.href}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </NavLink>
                ) : (
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Automatisation
          </h3>
          <ul className="space-y-1">
            {resources.map((item) => (
              <li key={item.name}>
                {item.name === 'Commande Vente' ? (
                  <div className="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg cursor-not-allowed relative group">
                    <item.icon className="mr-3 h-4 w-4" />
                    <span>{item.name}</span>
                    <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      Bientôt
                    </span>
                  </div>
                ) : item.href ? (
                  <NavLink
                    to={item.href}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </NavLink>
                ) : (
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-3 border-t border-gray-200">
        {/* Reports Link */}
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-sm rounded-lg transition-all ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-violet-700 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
            }`
          }
        >
          <BarChart3 className="mr-3 h-4 w-4" />
          <span className="font-medium">Rapports</span>
        </NavLink>

        {/* User Profile */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="flex items-center space-x-3 w-full hover:bg-gray-50 rounded-lg p-3 transition-all group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center ring-2 ring-purple-100 group-hover:ring-purple-300 transition-all">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-gray-900 truncate">Prodal</p>
            <p className="text-xs text-gray-500 truncate">prodal@entropie.com</p>
          </div>
          <Settings className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-sm mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Prodal</h3>
                <p className="text-sm text-gray-500">prodal@entropie.com</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Paramètres</span>
              </button>
              
              <button className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors">
                <HelpCircle className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Aide</span>
              </button>
              
              <hr className="my-2" />
              
              <button className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600">
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
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