import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Topbar } from './Topbar';
import { NavBar } from './NavBar';
import { useState } from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';

export const AppLayout = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <div className="min-h-screen gradient-bg">
      <Topbar onProfileClick={() => setShowProfileModal(true)} />

      <div className="px-6 pt-4">
        <NavBar />
      </div>

      <main className="p-6 md:p-8">
        <Outlet />
      </main>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 max-w-sm mx-4 shadow-2xl border" style={{ borderColor: 'var(--card-border)' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
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

      <Toaster position="top-right" />
    </div>
  );
};