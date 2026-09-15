import React from 'react';
import {
  PortOperationsProvider,
  usePortOperations,
} from './context/PortOperationsContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { QuickSearchModal } from './components/layout/QuickSearchModal';
import { SettingsModal } from './components/layout/SettingsModal';
import { ToastContainer } from './components/common/Toast';
import { VesselDetailModal } from './components/vessels/VesselDetailModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { VesselsPage } from './pages/VesselsPage';
import { BerthsCranesPage } from './pages/BerthsCranesPage';
import { AiRecommendationsPage } from './pages/AiRecommendationsPage';
import { Plan72hPage } from './pages/Plan72hPage';
import { WhatIfSimulatorPage } from './pages/WhatIfSimulatorPage';

const MainAppContent: React.FC = () => {
  const { activeView } = usePortOperations();

  const getPageInfo = () => {
    switch (activeView) {
      case 'dashboard':
        return {
          title: 'Port Operations Intelligence Dashboard',
          subtitle:
            'Real-time congestion telemetry, queue dynamics, and terminal resource utilization.',
        };
      case 'vessels':
        return {
          title: 'Vessel Operations',
          subtitle:
            'Monitor incoming vessels, priorities and operational status.',
        };
      case 'berths':
        return {
          title: 'Resource Management: Berths & Cranes',
          subtitle:
            'Quayside berthing positions, draft clearance, and STS gantry crane allocations.',
        };
      case 'ai':
        return {
          title: 'AI Operations Recommendations',
          subtitle:
            'Data-driven recommendations for reducing congestion and improving port efficiency.',
        };
      case 'schedule':
        return {
          title: '72-Hour Operations Plan',
          subtitle: 'Optimized vessel, berth and crane schedule.',
        };
      case 'simulator':
        return {
          title: 'What-If Simulator',
          subtitle:
            'Simulate changing port conditions and understand operational impact before making decisions.',
        };
      default:
        return {
          title: 'Command Center',
          subtitle: 'Terminal Operations Overview',
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="app-layout">
      {/* Collapsible Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Region */}
      <div className="main-content-area">
        {/* Top Header */}
        <Header title={title} subtitle={subtitle} />

        {/* Active Page Body */}
        <main className="page-container">
          {activeView === 'dashboard' && <DashboardPage />}
          {activeView === 'vessels' && <VesselsPage />}
          {activeView === 'berths' && <BerthsCranesPage />}
          {activeView === 'ai' && <AiRecommendationsPage />}
          {activeView === 'schedule' && <Plan72hPage />}
          {activeView === 'simulator' && <WhatIfSimulatorPage />}
        </main>
      </div>

      {/* Global Overlays & Modals */}
      <VesselDetailModal />
      <QuickSearchModal />
      <SettingsModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PortOperationsProvider>
      <MainAppContent />
    </PortOperationsProvider>
  );
}
