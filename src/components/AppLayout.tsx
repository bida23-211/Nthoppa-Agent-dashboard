import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import OverviewSection from '@/components/dashboard/OverviewSection';
import CustomerTable from '@/components/dashboard/CustomerTable';
import ProductCatalog from '@/components/dashboard/ProductCatalog';
import LeadPipeline from '@/components/dashboard/LeadPipeline';
import CommissionTracker from '@/components/dashboard/CommissionTracker';
import RewardsSection from '@/components/dashboard/RewardsSection';
import MarketingTools from '@/components/dashboard/MarketingTools';
import TrainingSection from '@/components/dashboard/TrainingSection';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Force dark mode for the Nthoppa dashboard
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection />;
      case 'customers':
        return <CustomerTable />;
      case 'products':
        return <ProductCatalog />;
      case 'pipeline':
        return <LeadPipeline />;
      case 'commissions':
        return <CommissionTracker />;
      case 'rewards':
        return <RewardsSection />;
      case 'marketing':
        return <MarketingTools />;
      case 'training':
        return <TrainingSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        <TopBar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          activeTab={activeTab}
        />
        <main className="p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
