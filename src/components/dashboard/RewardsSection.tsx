import React, { useState } from 'react';
import { rewardVouchers, metrics } from '@/data/dashboardData';

const categoryConfig: Record<string, { label: string; icon: string; iconBg: string }> = {
  airtime: { label: 'Airtime', icon: 'phone', iconBg: 'bg-green-600' },
  fuel: { label: 'Fuel Vouchers', icon: 'car', iconBg: 'bg-gray-600' },
  cash: { label: 'Cash Vouchers', icon: 'cash', iconBg: 'bg-orange-500' },
  dstv: { label: 'DStv Subscriptions', icon: 'tv', iconBg: 'bg-purple-600' },
  ticket: { label: 'Ticket Vouchers', icon: 'ticket', iconBg: 'bg-blue-600' },
  insurance: { label: 'Insurance Discounts', icon: 'shield', iconBg: 'bg-yellow-500' },
};

const CategoryIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = 'w-5 h-5 text-white' }) => {
  switch (icon) {
    case 'phone':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    case 'car':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 0a2 2 0 110-4h8a2 2 0 110 4m-8 0v10m8-10v10m-8 0h8m-8 0a2 2 0 110 4h8a2 2 0 110-4" /></svg>;
    case 'cash':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case 'tv':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'ticket':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>;
    case 'shield':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    default:
      return null;
  }
};

const RewardsSection: React.FC = () => {
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [userCoins, setUserCoins] = useState(metrics.nthoppaCoins);
  const [redeemed, setRedeemed] = useState<string[]>([]);

  const handleRedeem = (voucher: typeof rewardVouchers[0]) => {
    if (userCoins < voucher.points) return;
    setRedeemingId(voucher.id);
    setTimeout(() => {
      setUserCoins(prev => prev - voucher.points);
      setRedeemed(prev => [...prev, voucher.id]);
      setRedeemingId(null);
    }, 1500);
  };

  const categories = Object.keys(categoryConfig);

  return (
    <div className="space-y-6">
      {/* Coins Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-orange-400/40 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-8 h-8 text-yellow-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <p className="text-white/80 text-sm mb-1">Your Nthoppa Coins</p>
        <p className="text-white text-5xl font-bold mb-2">{userCoins.toLocaleString()}</p>
        <p className="text-white/60 text-sm">Redeem for amazing rewards below</p>
      </div>

      {/* How to Earn */}
      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3">How to Earn Coins</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: 'book', label: 'Complete education modules', coins: 25, color: '#22C55E' },
            { icon: 'check', label: 'Complete quizzes', coins: 10, color: '#3B82F6' },
            { icon: 'user', label: 'Complete profile', coins: 10, color: '#A855F7' },
            { icon: 'calendar', label: 'Daily login', coins: 2, color: '#F59E0B' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800/30 rounded-lg p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                <svg className="w-4 h-4" style={{ color: item.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {item.icon === 'book' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                  {item.icon === 'check' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  {item.icon === 'user' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                  {item.icon === 'calendar' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                </svg>
              </div>
              <div>
                <p className="text-gray-300 text-sm">{item.label}</p>
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.coins} coins</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redeem Vouchers */}
      <h3 className="text-white font-bold text-xl">Redeem Your Coins</h3>

      {categories.map(catKey => {
        const config = categoryConfig[catKey];
        const vouchers = rewardVouchers.filter(v => v.category === catKey);
        if (vouchers.length === 0) return null;

        return (
          <div key={catKey} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${config.iconBg} flex items-center justify-center`}>
                <CategoryIcon icon={config.icon} />
              </div>
              <h4 className="text-white font-semibold text-lg">{config.label}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {vouchers.map(voucher => {
                const canAfford = userCoins >= voucher.points;
                const isRedeemed = redeemed.includes(voucher.id);
                const isRedeeming = redeemingId === voucher.id;

                return (
                  <div key={voucher.id} className="bg-[#161b22] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-bold text-lg">{voucher.title}</h5>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${voucher.color}20`, color: voucher.color }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                        {voucher.points.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{voucher.subtitle}</p>
                    <button
                      onClick={() => !isRedeemed && !isRedeeming && handleRedeem(voucher)}
                      disabled={!canAfford || isRedeemed || isRedeeming}
                      className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        isRedeemed
                          ? 'bg-green-600/20 text-green-400 border border-green-500/20 cursor-default'
                          : isRedeeming
                          ? 'bg-orange-500/50 text-white cursor-wait'
                          : canAfford
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
                      }`}
                    >
                      {isRedeemed ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Redeemed
                        </>
                      ) : isRedeeming ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Redeeming...
                        </>
                      ) : canAfford ? (
                        <>
                          Redeem Now
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </>
                      ) : (
                        'Not Enough Coins'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RewardsSection;
