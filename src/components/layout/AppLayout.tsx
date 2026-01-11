import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';

export const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex h-screen gradient-bg">
      <Sidebar />
      <main className={`flex-1 overflow-auto ${isHomePage ? '' : 'p-6 md:p-8'}`}>
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
};