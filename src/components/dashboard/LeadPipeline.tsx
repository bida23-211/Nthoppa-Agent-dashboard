import React, { useState } from 'react';
import { leads as initialLeads, Lead } from '@/data/dashboardData';

const stages = [
  { id: 'new', label: 'New Leads', color: '#3B82F6', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  { id: 'contacted', label: 'Contacted', color: '#F59E0B', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' },
  { id: 'application', label: 'Application', color: '#A855F7', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30' },
  { id: 'pending', label: 'Pending', color: '#F97316', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' },
  { id: 'enrolled', label: 'Enrolled', color: '#22C55E', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
];

const LeadPipeline: React.FC = () => {
  const [allLeads, setAllLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const moveLeadForward = (leadId: string) => {
    setAllLeads(prev => prev.map(lead => {
      if (lead.id !== leadId) return lead;
      const stageOrder = stages.map(s => s.id);
      const currentIndex = stageOrder.indexOf(lead.stage);
      if (currentIndex < stageOrder.length - 1) {
        return { ...lead, stage: stageOrder[currentIndex + 1] as Lead['stage'], daysInStage: 0 };
      }
      return lead;
    }));
  };

  const moveLeadBack = (leadId: string) => {
    setAllLeads(prev => prev.map(lead => {
      if (lead.id !== leadId) return lead;
      const stageOrder = stages.map(s => s.id);
      const currentIndex = stageOrder.indexOf(lead.stage);
      if (currentIndex > 0) {
        return { ...lead, stage: stageOrder[currentIndex - 1] as Lead['stage'], daysInStage: 0 };
      }
      return lead;
    }));
  };

  const totalValue = allLeads.reduce((sum, l) => sum + l.value, 0);

  return (
    <div className="space-y-4">
      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stages.map(stage => {
          const stageLeads = allLeads.filter(l => l.stage === stage.id);
          const stageValue = stageLeads.reduce((sum, l) => sum + l.value, 0);
          return (
            <div key={stage.id} className={`${stage.bgColor} border ${stage.borderColor} rounded-xl p-3`}>
              <p className="text-xs font-medium" style={{ color: stage.color }}>{stage.label}</p>
              <p className="text-white font-bold text-lg">{stageLeads.length}</p>
              <p className="text-gray-500 text-xs">BWP {stageValue.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold">Pipeline Overview</h3>
            <p className="text-gray-500 text-sm">Total pipeline value: BWP {totalValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 min-h-[400px]">
          {stages.map(stage => {
            const stageLeads = allLeads.filter(l => l.stage === stage.id);
            return (
              <div key={stage.id} className="bg-gray-900/50 rounded-lg p-2">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }}></div>
                    <span className="text-gray-300 text-xs font-semibold uppercase">{stage.label}</span>
                  </div>
                  <span className="text-gray-600 text-xs bg-gray-800 px-1.5 py-0.5 rounded">{stageLeads.length}</span>
                </div>
                <div className="space-y-2">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="bg-[#161b22] border border-gray-800 rounded-lg p-3 hover:border-gray-700 transition-all cursor-pointer group"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                      </div>
                      <p className="text-gray-500 text-xs mb-2 truncate">{lead.product}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-xs font-medium">BWP {lead.value}</span>
                        <span className="text-gray-600 text-xs">{lead.daysInStage}d</span>
                      </div>
                      {/* Move buttons */}
                      <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {stage.id !== 'new' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); moveLeadBack(lead.id); }}
                            className="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 py-1 rounded transition-colors"
                          >
                            Back
                          </button>
                        )}
                        {stage.id !== 'enrolled' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); moveLeadForward(lead.id); }}
                            className="flex-1 text-xs text-white py-1 rounded transition-colors"
                            style={{ backgroundColor: stage.color }}
                          >
                            Advance
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-[#161b22] border border-gray-700 rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold text-lg">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                  {selectedLead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedLead.name}</p>
                  <p className="text-gray-500 text-sm">{selectedLead.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">Product</p>
                  <p className="text-white text-sm font-medium">{selectedLead.product}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">Value</p>
                  <p className="text-green-400 text-sm font-semibold">BWP {selectedLead.value}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">Stage</p>
                  <p className="text-white text-sm font-medium capitalize">{selectedLead.stage}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">Days in Stage</p>
                  <p className="text-white text-sm font-medium">{selectedLead.daysInStage}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">Call</button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">WhatsApp</button>
                {selectedLead.stage !== 'enrolled' && (
                  <button
                    onClick={() => { moveLeadForward(selectedLead.id); setSelectedLead(null); }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Advance
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadPipeline;
