import React, { useState } from 'react';

const MarketingTools: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const referralLink = 'https://nthoppa.co.bw/ref/NTH-0847';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const whatsappTemplates = [
    {
      title: 'General Introduction',
      message: `Hi! I'm a certified Nthoppa financial advisor. I can help you find the best insurance, loans, and investment products in Botswana. Would you like a free consultation? Visit ${referralLink} to learn more!`,
    },
    {
      title: 'Insurance Offer',
      message: `Looking for affordable insurance? Nthoppa offers motor, health, life, and home insurance from top providers in Botswana. Get a free quote today! ${referralLink}`,
    },
    {
      title: 'Investment Opportunity',
      message: `Start growing your money today! Nthoppa partners with Investec and Allan Gray to offer you the best investment options. Minimum BWP 500/month. Learn more: ${referralLink}`,
    },
    {
      title: 'Loan Assistance',
      message: `Need a personal loan? Compare rates from FNB and Standard Bank through Nthoppa. Quick approval, competitive rates. Apply now: ${referralLink}`,
    },
  ];

  const brochures = [
    { name: 'Motor Insurance Guide', size: '2.4 MB', type: 'PDF' },
    { name: 'Health Insurance Comparison', size: '1.8 MB', type: 'PDF' },
    { name: 'Investment Products Overview', size: '3.1 MB', type: 'PDF' },
    { name: 'Personal Loans Guide', size: '1.5 MB', type: 'PDF' },
    { name: 'Life Insurance Benefits', size: '2.0 MB', type: 'PDF' },
    { name: 'Home Insurance Brochure', size: '1.9 MB', type: 'PDF' },
  ];

  const socialTemplates = [
    { platform: 'Facebook', color: '#1877F2', posts: 8 },
    { platform: 'Instagram', color: '#E4405F', posts: 12 },
    { platform: 'Twitter/X', color: '#1DA1F2', posts: 6 },
    { platform: 'LinkedIn', color: '#0A66C2', posts: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Referral Link */}
      <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-1">Your Referral Link</h3>
            <p className="text-gray-400 text-sm mb-3">Share this link to earn referral bonuses. Earn BWP 150 for every successful referral!</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 text-sm truncate">
                {referralLink}
              </div>
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  copiedLink ? 'bg-green-600 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {copiedLink ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WhatsApp Templates */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </div>
            <h3 className="text-white font-semibold">WhatsApp Templates</h3>
          </div>
          <div className="space-y-3">
            {whatsappTemplates.map((template, i) => (
              <div key={i} className="bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white text-sm font-medium">{template.title}</p>
                  <button
                    onClick={() => setSelectedTemplate(selectedTemplate === i ? null : i)}
                    className="text-orange-400 text-xs hover:text-orange-300"
                  >
                    {selectedTemplate === i ? 'Hide' : 'Preview'}
                  </button>
                </div>
                {selectedTemplate === i && (
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-400 text-sm bg-gray-900/50 rounded-lg p-3">{template.message}</p>
                    <button
                      onClick={() => {
                        const url = `https://wa.me/?text=${encodeURIComponent(template.message)}`;
                        window.open(url, '_blank');
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      Send via WhatsApp
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Templates */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Social Media Templates</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {socialTemplates.map((platform) => (
              <button key={platform.platform} className="bg-gray-800/30 hover:bg-gray-800/60 rounded-lg p-4 text-left transition-colors group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${platform.color}20` }}>
                  <svg className="w-5 h-5" style={{ color: platform.color }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">{platform.platform}</p>
                <p className="text-gray-500 text-xs">{platform.posts} templates</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Downloadable Brochures */}
      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Product Brochures</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {brochures.map((brochure, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/50 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{brochure.name}</p>
                <p className="text-gray-500 text-xs">{brochure.type} - {brochure.size}</p>
              </div>
              <button className="text-gray-500 hover:text-orange-400 transition-colors opacity-0 group-hover:opacity-100">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingTools;
