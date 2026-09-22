import React, { useState } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

  return (
    <div className="constructiq-app">
      {currentView === 'landing' ? (
        <Landing onLaunchDashboard={() => setCurrentView('dashboard')} />
      ) : (
        <Dashboard onGoHome={() => setCurrentView('landing')} />
      )}
    </div>
  );
}
