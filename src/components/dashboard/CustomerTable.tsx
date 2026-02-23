import React, { useState, useMemo } from 'react';
import { customers, Customer } from '@/data/dashboardData';

const CustomerTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'enrolledDate' | 'totalPremium'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    let result = [...customers];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.products.some(p => p.toLowerCase().includes(q)));
    }
    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'enrolledDate') cmp = a.enrolledDate.localeCompare(b.enrolledDate);
      else cmp = a.totalPremium - b.totalPremium;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [search, statusFilter, sortBy, sortDir]);

  const handleSort = (col: 'name' | 'enrolledDate' | 'totalPremium') => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-500/15 text-green-400 border-green-500/20',
      pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
      expired: 'bg-red-500/15 text-red-400 border-red-500/20',
    };
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status] || ''}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const SortIcon = ({ col }: { col: string }) => (
    <svg className={`w-3.5 h-3.5 inline ml-1 ${sortBy === col ? 'text-orange-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDir === 'asc' && sortBy === col ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
    </svg>
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, phone, or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161b22] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'expired'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#161b22] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm">
        <span className="text-gray-500">Showing <span className="text-white font-medium">{filtered.length}</span> customers</span>
        <span className="text-gray-700">|</span>
        <span className="text-green-400">{customers.filter(c => c.status === 'active').length} active</span>
        <span className="text-yellow-400">{customers.filter(c => c.status === 'pending').length} pending</span>
        <span className="text-red-400">{customers.filter(c => c.status === 'expired').length} expired</span>
      </div>

      {/* Table */}
      <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-gray-300" onClick={() => handleSort('name')}>
                  Customer <SortIcon col="name" />
                </th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider hidden md:table-cell">Phone</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Products</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider hidden md:table-cell cursor-pointer hover:text-gray-300" onClick={() => handleSort('enrolledDate')}>
                  Enrolled <SortIcon col="enrolledDate" />
                </th>
                <th className="text-right px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-gray-300" onClick={() => handleSort('totalPremium')}>
                  Premium <SortIcon col="totalPremium" />
                </th>
                <th className="text-right px-4 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{customer.name}</p>
                        <p className="text-gray-500 text-xs">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm hidden md:table-cell">{customer.phone}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {customer.products.map((p, i) => (
                        <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">{statusBadge(customer.status)}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm hidden md:table-cell">{customer.enrolledDate}</td>
                  <td className="px-4 py-3 text-right text-white text-sm font-medium">
                    {customer.totalPremium > 0 ? `BWP ${customer.totalPremium.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelectedCustomer(customer)} className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors" title="View Details">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Call">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors" title="Message">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCustomer(null)}>
          <div className="bg-[#161b22] border border-gray-700 rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Customer Details</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-lg font-bold">
                {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{selectedCustomer.name}</p>
                <p className="text-gray-500 text-sm">{selectedCustomer.id} | {selectedCustomer.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Phone</p>
                <p className="text-white text-sm">{selectedCustomer.phone}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Status</p>
                {statusBadge(selectedCustomer.status)}
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Enrolled</p>
                <p className="text-white text-sm">{selectedCustomer.enrolledDate}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">Monthly Premium</p>
                <p className="text-white text-sm font-semibold">BWP {selectedCustomer.totalPremium.toLocaleString()}</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-500 text-xs mb-2">Products</p>
              <div className="flex flex-wrap gap-2">
                {selectedCustomer.products.map((p, i) => (
                  <span key={i} className="text-sm bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-lg">{p}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Message
              </button>
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
