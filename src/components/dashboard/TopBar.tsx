import React, { useState } from 'react';

interface TopBarProps {
  onMenuToggle: () => void;
  activeTab: string;
}

const tabTitles: Record<string, string> = {
  overview: 'Dashboard Overview',
  customers: 'Customer Management',
  products: 'Product Catalog',
  pipeline: 'Lead Pipeline',
  commissions: 'Commission Tracker',
  rewards: 'Nthoppa Rewards',
  marketing: 'Marketing Tools',
  training: 'Training Resources',
};

const TopBar: React.FC<TopBarProps> = ({ onMenuToggle, activeTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New lead assigned: Tumelo Kgosi', time: '2 min ago', unread: true },
    { id: 2, text: 'Commission of BWP 840 received', time: '15 min ago', unread: true },
    { id: 3, text: 'Policy activated for Lesego Phiri', time: '1 hour ago', unread: false },
    { id: 4, text: 'Monthly target: 72% achieved', time: '3 hours ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0d1117]/95 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left: Menu + Title */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuToggle} className="lg:hidden text-gray-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-white font-semibold text-lg">{tabTitles[activeTab] || 'Dashboard'}</h2>
            <p className="text-gray-500 text-xs">Friday, February 20, 2026</p>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search customers, products, leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#161b22] border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm">Notifications</h3>
                  <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">2 new</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer ${n.unread ? 'bg-orange-500/5' : ''}`}>
                      <div className="flex items-start gap-3">
                        {n.unread && <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>}
                        <div className={n.unread ? '' : 'ml-5'}>
                          <p className="text-gray-300 text-sm">{n.text}</p>
                          <p className="text-gray-600 text-xs mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center">
                  <button className="text-orange-400 text-sm hover:text-orange-300 font-medium">View All Notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Add */}
          <button className="hidden sm:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Lead
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
