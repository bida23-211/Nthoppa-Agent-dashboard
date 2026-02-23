import React from 'react';
import { metrics, commissionHistory, commissionByCategory, activities, targets, leaderboard } from '@/data/dashboardData';

const MetricCard: React.FC<{
  title: string;
  value: string;
  growth: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, growth, icon, color }) => (
  <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/20">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${growth >= 0 ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
        {growth >= 0 ? '+' : ''}{growth}%
      </span>
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <p className="text-gray-500 text-sm">{title}</p>
  </div>
);

const CommissionChart: React.FC = () => {
  const maxAmount = Math.max(...commissionHistory.map(c => Math.max(c.amount, c.target)));
  
  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold">Commission Trend</h3>
          <p className="text-gray-500 text-sm">Last 12 months</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-orange-500"></div>
            <span className="text-gray-400">Earned</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-gray-600"></div>
            <span className="text-gray-400">Target</span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-2 h-40">
        {commissionHistory.map((entry, i) => (
          <div key={entry.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col items-center gap-0.5 relative" style={{ height: '140px' }}>
              <div
                className="w-full max-w-[20px] bg-gray-700/50 rounded-t absolute bottom-0"
                style={{ height: `${(entry.target / maxAmount) * 100}%` }}
              />
              <div
                className={`w-full max-w-[20px] rounded-t absolute bottom-0 z-10 ${i === commissionHistory.length - 1 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 'bg-orange-500/70'}`}
                style={{ height: `${(entry.amount / maxAmount) * 100}%` }}
              />
            </div>
            <span className="text-gray-500 text-[10px]">{entry.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryBreakdown: React.FC = () => (
  <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
    <h3 className="text-white font-semibold mb-4">Commission by Category</h3>
    <div className="flex items-center justify-center mb-4">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {commissionByCategory.reduce((acc, cat, i) => {
            const offset = acc.offset;
            acc.elements.push(
              <circle
                key={i}
                cx="18" cy="18" r="15.9155"
                fill="none"
                stroke={cat.color}
                strokeWidth="3"
                strokeDasharray={`${cat.percentage} ${100 - cat.percentage}`}
                strokeDashoffset={`${-offset}`}
              />
            );
            acc.offset += cat.percentage;
            return acc;
          }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-white font-bold text-lg">BWP</p>
          <p className="text-orange-400 font-bold text-sm">14,750</p>
        </div>
      </div>
    </div>
    <div className="space-y-2.5">
      {commissionByCategory.map((cat) => (
        <div key={cat.category} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></div>
            <span className="text-gray-400 text-sm">{cat.category}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-medium">BWP {cat.amount.toLocaleString()}</span>
            <span className="text-gray-500 text-xs w-10 text-right">{cat.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ActivityFeed: React.FC = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center"><svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>;
      case 'commission':
        return <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center"><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
      case 'activation':
        return <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center"><svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
      case 'inquiry':
        return <div className="w-8 h-8 rounded-full bg-purple-500/15 flex items-center justify-center"><svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></div>;
      case 'referral':
        return <div className="w-8 h-8 rounded-full bg-yellow-500/15 flex items-center justify-center"><svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>;
      case 'renewal':
        return <div className="w-8 h-8 rounded-full bg-cyan-500/15 flex items-center justify-center"><svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-gray-500/15 flex items-center justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2} /></svg></div>;
    }
  };

  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Recent Activity</h3>
        <button className="text-orange-400 text-sm hover:text-orange-300">View All</button>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {activities.slice(0, 8).map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
            {getActivityIcon(activity.type)}
            <div className="flex-1 min-w-0">
              <p className="text-gray-300 text-sm leading-snug">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600 text-xs">{activity.timestamp}</span>
                {activity.amount && (
                  <span className="text-green-400 text-xs font-medium">+BWP {activity.amount.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TargetProgress: React.FC = () => {
  const renderRing = (current: number, target: number, color: string, label: string, isPercentage?: boolean) => {
    const percentage = Math.min((current / target) * 100, 100);
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white font-bold text-sm">{Math.round(percentage)}%</span>
          </div>
        </div>
        <p className="text-gray-400 text-xs mt-2 text-center">{label}</p>
        <p className="text-white text-xs font-medium">
          {isPercentage ? `${current}%` : current.toLocaleString()} / {isPercentage ? `${target}%` : target.toLocaleString()}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Monthly Targets</h3>
        <span className="text-gray-500 text-sm">{targets.daysRemaining} days left</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {renderRing(targets.monthlyEnrollments.current, targets.monthlyEnrollments.target, '#F97316', 'Enrollments')}
        {renderRing(targets.revenueGoal.current, targets.revenueGoal.target, '#22C55E', 'Revenue')}
        {renderRing(targets.customerRetention.current, targets.customerRetention.target, '#3B82F6', 'Retention', true)}
      </div>
    </div>
  );
};

const Leaderboard: React.FC = () => (
  <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-white font-semibold">Agent Leaderboard</h3>
      <span className="text-gray-500 text-sm">Top 5</span>
    </div>
    <div className="space-y-2">
      {leaderboard.map((agent) => (
        <div key={agent.rank} className={`flex items-center gap-3 p-2.5 rounded-lg ${agent.rank === 3 ? 'bg-orange-500/10 border border-orange-500/20' : 'hover:bg-gray-800/30'} transition-colors`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            agent.rank === 1 ? 'bg-yellow-500 text-black' :
            agent.rank === 2 ? 'bg-gray-400 text-black' :
            agent.rank === 3 ? 'bg-orange-500 text-white' :
            'bg-gray-700 text-gray-400'
          }`}>
            {agent.rank}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${agent.rank === 3 ? 'text-orange-400' : 'text-white'}`}>{agent.name}</p>
            <p className="text-gray-500 text-xs">{agent.customers} customers</p>
          </div>
          <p className="text-white text-sm font-semibold">BWP {agent.commission.toLocaleString()}</p>
        </div>
      ))}
    </div>
  </div>
);

const OverviewSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Customers"
          value={metrics.totalCustomers.toString()}
          growth={metrics.customerGrowth}
          color="bg-blue-500/15"
          icon={<svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
        />
        <MetricCard
          title="Active Policies"
          value={metrics.activePolicies.toString()}
          growth={metrics.policyGrowth}
          color="bg-green-500/15"
          icon={<svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
        />
        <MetricCard
          title="Monthly Commission"
          value={`BWP ${metrics.monthlyCommission.toLocaleString()}`}
          growth={metrics.commissionGrowth}
          color="bg-orange-500/15"
          icon={<svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          growth={metrics.conversionGrowth}
          color="bg-purple-500/15"
          icon={<svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <MetricCard
          title="Pending Apps"
          value={metrics.pendingApplications.toString()}
          growth={metrics.pendingGrowth}
          color="bg-yellow-500/15"
          icon={<svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <MetricCard
          title="Leaderboard"
          value={`#${metrics.leaderboardPosition}`}
          growth={0}
          color="bg-cyan-500/15"
          icon={<svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CommissionChart />
        </div>
        <CategoryBreakdown />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TargetProgress />
        <ActivityFeed />
        <Leaderboard />
      </div>
    </div>
  );
};

export default OverviewSection;
