import React, { useState } from 'react';
import { commissionHistory, commissionByCategory, metrics } from '@/data/dashboardData';

const CommissionTracker: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'6m' | '12m'>('12m');
  
  const displayedHistory = timeRange === '6m' ? commissionHistory.slice(-6) : commissionHistory;
  const maxVal = Math.max(...displayedHistory.map(c => Math.max(c.amount, c.target)));
  const totalEarned = displayedHistory.reduce((sum, c) => sum + c.amount, 0);
  const totalTarget = displayedHistory.reduce((sum, c) => sum + c.target, 0);
  const avgMonthly = Math.round(totalEarned / displayedHistory.length);

  const projectedAnnual = avgMonthly * 12;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-500 text-sm mb-1">This Month</p>
          <p className="text-2xl font-bold text-white">BWP {metrics.monthlyCommission.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-1">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            <span className="text-green-400 text-sm">+{metrics.commissionGrowth}%</span>
          </div>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-500 text-sm mb-1">Year to Date</p>
          <p className="text-2xl font-bold text-white">BWP {metrics.ytdCommission.toLocaleString()}</p>
          <p className="text-gray-500 text-sm mt-1">Since Jan 2026</p>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-500 text-sm mb-1">Monthly Average</p>
          <p className="text-2xl font-bold text-white">BWP {avgMonthly.toLocaleString()}</p>
          <p className="text-gray-500 text-sm mt-1">Last {displayedHistory.length} months</p>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-500 text-sm mb-1">Projected Annual</p>
          <p className="text-2xl font-bold text-orange-400">BWP {projectedAnnual.toLocaleString()}</p>
          <p className="text-gray-500 text-sm mt-1">Based on avg</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">Commission History</h3>
            <div className="flex gap-1 bg-gray-800 rounded-lg p-0.5">
              <button
                onClick={() => setTimeRange('6m')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${timeRange === '6m' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                6M
              </button>
              <button
                onClick={() => setTimeRange('12m')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${timeRange === '12m' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                12M
              </button>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-3 h-48 mb-2">
            {displayedHistory.map((entry, i) => (
              <div key={entry.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center gap-0.5" style={{ height: '180px' }}>
                  <div
                    className="w-[40%] bg-gray-700/40 rounded-t"
                    style={{ height: `${(entry.target / maxVal) * 100}%` }}
                    title={`Target: BWP ${entry.target.toLocaleString()}`}
                  />
                  <div
                    className={`w-[40%] rounded-t transition-all duration-500 ${entry.amount >= entry.target ? 'bg-gradient-to-t from-green-600 to-green-400' : 'bg-gradient-to-t from-orange-600 to-orange-400'}`}
                    style={{ height: `${(entry.amount / maxVal) * 100}%` }}
                    title={`Earned: BWP ${entry.amount.toLocaleString()}`}
                  />
                </div>
                <span className="text-gray-500 text-xs">{entry.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 text-xs pt-3 border-t border-gray-800">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-sm bg-gradient-to-r from-orange-600 to-orange-400"></div>
              <span className="text-gray-400">Earned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-sm bg-gray-700/40"></div>
              <span className="text-gray-400">Target</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-sm bg-gradient-to-r from-green-600 to-green-400"></div>
              <span className="text-gray-400">Target Met</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">By Category</h3>
          <div className="space-y-4">
            {commissionByCategory.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gray-400 text-sm">{cat.category}</span>
                  <span className="text-white text-sm font-medium">BWP {cat.amount.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
                <p className="text-gray-600 text-xs mt-0.5">{cat.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <h3 className="text-white font-semibold">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium uppercase">Month</th>
                <th className="text-right px-5 py-3 text-gray-500 text-xs font-medium uppercase">Target</th>
                <th className="text-right px-5 py-3 text-gray-500 text-xs font-medium uppercase">Earned</th>
                <th className="text-right px-5 py-3 text-gray-500 text-xs font-medium uppercase">Achievement</th>
                <th className="text-right px-5 py-3 text-gray-500 text-xs font-medium uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...displayedHistory].reverse().map((entry) => {
                const achievement = Math.round((entry.amount / entry.target) * 100);
                const met = entry.amount >= entry.target;
                return (
                  <tr key={entry.month} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-5 py-3 text-white text-sm font-medium">{entry.month} 2025</td>
                    <td className="px-5 py-3 text-right text-gray-400 text-sm">BWP {entry.target.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-white text-sm font-medium">BWP {entry.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`text-sm font-medium ${met ? 'text-green-400' : 'text-orange-400'}`}>{achievement}%</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${met ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                        {met ? 'Target Met' : 'Below Target'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommissionTracker;
