import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { CommandeAchat } from './pages/CommandeAchat';
import { InteractiveDashboard } from './pages/InteractiveDashboard';
import { Tables } from './pages/Tables';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="chat" element={<Home />} />
            <Route path="interactive-dashboard" element={<InteractiveDashboard />} />
            <Route path="tables" element={<Tables />} />
            <Route path="reports" element={<Reports />} />
            <Route path="commande-achat" element={<CommandeAchat />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;