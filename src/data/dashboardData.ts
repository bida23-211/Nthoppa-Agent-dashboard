export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  products: string[];
  status: 'active' | 'pending' | 'expired';
  lastContact: string;
  enrolledDate: string;
  totalPremium: number;
}

export interface Product {
  id: string;
  name: string;
  provider: string;
  category: 'loans' | 'insurance' | 'investments' | 'health' | 'motor' | 'life';
  description: string;
  features: string[];
  rating: number;
  reviews: string;
  startingPrice: string;
  maxCoverage?: string;
  commissionRate: number;
  color: string;
  iconBg: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  product: string;
  stage: 'new' | 'contacted' | 'application' | 'pending' | 'enrolled';
  value: number;
  daysInStage: number;
}

export interface Activity {
  id: string;
  type: 'application' | 'activation' | 'commission' | 'inquiry' | 'renewal' | 'referral';
  message: string;
  timestamp: string;
  amount?: number;
}

export interface CommissionEntry {
  month: string;
  amount: number;
  target: number;
}

export interface RewardVoucher {
  id: string;
  category: 'airtime' | 'fuel' | 'cash' | 'ticket' | 'dstv' | 'insurance';
  title: string;
  subtitle: string;
  points: number;
  color: string;
}

export const metrics = {
  totalCustomers: 247,
  customerGrowth: 12.5,
  activePolicies: 189,
  policyGrowth: 8.3,
  monthlyCommission: 14750,
  commissionGrowth: 15.2,
  conversionRate: 68.5,
  conversionGrowth: 3.1,
  pendingApplications: 23,
  pendingGrowth: -5.2,
  leaderboardPosition: 3,
  totalAgents: 156,
  ytdCommission: 142800,
  nthoppaCoins: 4850,
};

export const customers: Customer[] = [
  { id: 'C001', name: 'Thabo Mokoena', phone: '+267 71 234 567', email: 'thabo@email.com', products: ['FNB Personal Loan', 'BIC Life Assurance'], status: 'active', lastContact: '2026-02-18', enrolledDate: '2025-08-15', totalPremium: 1600 },
  { id: 'C002', name: 'Kefilwe Motswana', phone: '+267 72 345 678', email: 'kefilwe@email.com', products: ['Metropolitan Health Cover'], status: 'active', lastContact: '2026-02-17', enrolledDate: '2025-09-20', totalPremium: 350 },
  { id: 'C003', name: 'Mpho Kgosana', phone: '+267 73 456 789', email: 'mpho@email.com', products: ['Hollard Comprehensive Car'], status: 'pending', lastContact: '2026-02-19', enrolledDate: '2026-01-10', totalPremium: 300 },
  { id: 'C004', name: 'Naledi Tsheko', phone: '+267 74 567 890', email: 'naledi@email.com', products: ['Allan Gray Balanced Fund', 'BOMAID Health Plan'], status: 'active', lastContact: '2026-02-15', enrolledDate: '2025-06-05', totalPremium: 900 },
  { id: 'C005', name: 'Kagiso Molefe', phone: '+267 75 678 901', email: 'kagiso@email.com', products: ['Standard Bank Loan'], status: 'expired', lastContact: '2026-01-20', enrolledDate: '2024-12-01', totalPremium: 0 },
  { id: 'C006', name: 'Boitumelo Seretse', phone: '+267 76 789 012', email: 'boitumelo@email.com', products: ['Investec Money Market'], status: 'active', lastContact: '2026-02-16', enrolledDate: '2025-10-12', totalPremium: 1000 },
  { id: 'C007', name: 'Lesego Phiri', phone: '+267 77 890 123', email: 'lesego@email.com', products: ['Metropolitan Motor Cover', 'BIC Life Assurance'], status: 'active', lastContact: '2026-02-14', enrolledDate: '2025-07-22', totalPremium: 380 },
  { id: 'C008', name: 'Tshepiso Moagi', phone: '+267 71 901 234', email: 'tshepiso@email.com', products: ['Guardrisk Motor Insurance'], status: 'active', lastContact: '2026-02-13', enrolledDate: '2025-11-08', totalPremium: 250 },
  { id: 'C009', name: 'Oratile Modise', phone: '+267 72 012 345', email: 'oratile@email.com', products: ['First Capital Home Cover'], status: 'pending', lastContact: '2026-02-19', enrolledDate: '2026-02-01', totalPremium: 200 },
  { id: 'C010', name: 'Katlego Nkwe', phone: '+267 73 123 456', email: 'katlego@email.com', products: ['FNB Personal Loan', 'Metropolitan Health Cover'], status: 'active', lastContact: '2026-02-12', enrolledDate: '2025-05-18', totalPremium: 850 },
  { id: 'C011', name: 'Dineo Rapula', phone: '+267 74 234 567', email: 'dineo@email.com', products: ['BIC Household Insurance'], status: 'active', lastContact: '2026-02-11', enrolledDate: '2025-09-01', totalPremium: 150 },
  { id: 'C012', name: 'Mothusi Kgari', phone: '+267 75 345 678', email: 'mothusi@email.com', products: ['Allan Gray Balanced Fund'], status: 'active', lastContact: '2026-02-10', enrolledDate: '2025-04-25', totalPremium: 500 },
  { id: 'C013', name: 'Amantle Tau', phone: '+267 76 456 789', email: 'amantle@email.com', products: ['BOMAID Health Plan'], status: 'expired', lastContact: '2026-01-05', enrolledDate: '2024-11-15', totalPremium: 0 },
  { id: 'C014', name: 'Phenyo Magang', phone: '+267 77 567 890', email: 'phenyo@email.com', products: ['Standard Bank Loan', 'Hollard Comprehensive Car'], status: 'active', lastContact: '2026-02-18', enrolledDate: '2025-08-30', totalPremium: 1300 },
  { id: 'C015', name: 'Goitseone Batsile', phone: '+267 71 678 901', email: 'goitseone@email.com', products: ['Investec Money Market', 'BIC Life Assurance'], status: 'active', lastContact: '2026-02-09', enrolledDate: '2025-03-14', totalPremium: 1100 },
];

export const products: Product[] = [
  {
    id: 'P001', name: 'FNB Personal Loan', provider: 'First National Bank', category: 'loans',
    description: 'Quick personal loans with competitive rates',
    features: ['Quick approval', 'Flexible terms', 'Competitive rates', 'Online application'],
    rating: 4.2, reviews: '4.2k', startingPrice: 'BWP 500/month', maxCoverage: 'BWP 200,000',
    commissionRate: 3.5, color: '#3B82F6', iconBg: 'bg-blue-900'
  },
  {
    id: 'P002', name: 'Standard Bank Loan', provider: 'Standard Bank Botswana', category: 'loans',
    description: 'Personal loans for various financial needs',
    features: ['Flexible repayment', 'No hidden fees', 'Quick processing', 'Debt consolidation'],
    rating: 4.0, reviews: '4.2k', startingPrice: 'BWP 1,000/month', maxCoverage: 'BWP 300,000',
    commissionRate: 3.2, color: '#3B82F6', iconBg: 'bg-blue-900'
  },
  {
    id: 'P003', name: 'Metropolitan Health Cover', provider: 'Metropolitan Health', category: 'health',
    description: 'Flexible health insurance with wellness benefits',
    features: ['Medical expenses', 'Wellness programs', 'Preventive care', 'Emergency cover'],
    rating: 3.9, reviews: '4.2k', startingPrice: 'BWP 350/month', maxCoverage: 'BWP 300,000',
    commissionRate: 5.0, color: '#EF4444', iconBg: 'bg-red-900'
  },
  {
    id: 'P004', name: 'BOMAID Health Plan', provider: 'Botswana Medical Aid Society', category: 'health',
    description: 'Comprehensive medical aid coverage',
    features: ['Hospital cover', 'Specialist consultations', 'Chronic medication', 'Emergency services'],
    rating: 4.1, reviews: '4.2k', startingPrice: 'BWP 400/month', maxCoverage: 'BWP 500,000',
    commissionRate: 4.8, color: '#EF4444', iconBg: 'bg-red-900'
  },
  {
    id: 'P005', name: 'BIC Household Insurance', provider: 'Botswana Insurance Company', category: 'insurance',
    description: 'Affordable home insurance for property owners',
    features: ['Fire & theft', 'Natural disasters', 'Contents cover', 'Public liability'],
    rating: 4.0, reviews: '4.2k', startingPrice: 'BWP 150/month', maxCoverage: 'BWP 2,000,000',
    commissionRate: 6.0, color: '#A855F7', iconBg: 'bg-purple-900'
  },
  {
    id: 'P006', name: 'First Capital Home Cover', provider: 'First Capital Insurance', category: 'insurance',
    description: 'Comprehensive home and contents insurance',
    features: ['Building cover', 'Contents protection', 'Liability cover', 'Alternative accommodation'],
    rating: 4.2, reviews: '4.2k', startingPrice: 'BWP 200/month', maxCoverage: 'BWP 3,000,000',
    commissionRate: 5.5, color: '#A855F7', iconBg: 'bg-purple-900'
  },
  {
    id: 'P007', name: 'Investec Money Market', provider: 'Investec Botswana', category: 'investments',
    description: 'Low-risk money market investment with competitive returns',
    features: ['Capital protection', 'Competitive returns', 'High liquidity', 'Professional management'],
    rating: 4.3, reviews: '4.2k', startingPrice: 'BWP 1,000/month',
    commissionRate: 2.0, color: '#F59E0B', iconBg: 'bg-amber-900'
  },
  {
    id: 'P008', name: 'Allan Gray Balanced Fund', provider: 'Allan Gray Botswana', category: 'investments',
    description: 'Diversified investment fund for long-term growth',
    features: ['Diversified portfolio', 'Professional management', 'Long-term growth', 'Regular reports'],
    rating: 4.6, reviews: '4.2k', startingPrice: 'BWP 500/month',
    commissionRate: 2.5, color: '#F59E0B', iconBg: 'bg-amber-900'
  },
  {
    id: 'P009', name: 'Metropolitan Motor Cover', provider: 'Metropolitan Life Botswana', category: 'motor',
    description: 'Reliable motor insurance with flexible payment options',
    features: ['Full comprehensive', 'Third party only', 'Flexible payments', '24/7 claims'],
    rating: 4.0, reviews: '4.2k', startingPrice: 'BWP 280/month', maxCoverage: 'BWP 1,200,000',
    commissionRate: 4.5, color: '#06B6D4', iconBg: 'bg-cyan-900'
  },
  {
    id: 'P010', name: 'Guardrisk Motor Insurance', provider: 'Guardrisk Insurance', category: 'motor',
    description: 'Competitive motor insurance with quick claims',
    features: ['Comprehensive cover', 'Third party', 'Fire & theft', 'Quick claims'],
    rating: 4.2, reviews: '4.2k', startingPrice: 'BWP 250/month', maxCoverage: 'BWP 800,000',
    commissionRate: 4.2, color: '#06B6D4', iconBg: 'bg-cyan-900'
  },
  {
    id: 'P011', name: 'Hollard Comprehensive Car', provider: 'Hollard Insurance Botswana', category: 'motor',
    description: 'Full comprehensive car insurance with roadside assistance',
    features: ['Accident cover', 'Theft protection', 'Third party', 'Roadside assistance'],
    rating: 4.4, reviews: '4.2k', startingPrice: 'BWP 300/month', maxCoverage: 'BWP 1,000,000',
    commissionRate: 4.8, color: '#06B6D4', iconBg: 'bg-cyan-900'
  },
  {
    id: 'P012', name: 'BIC Life Assurance', provider: 'Botswana Insurance Company', category: 'life',
    description: 'Affordable life insurance for all income levels',
    features: ['Basic life cover', 'Funeral benefit', 'Family protection', 'Low premiums'],
    rating: 4.1, reviews: '4.2k', startingPrice: 'BWP 100/month', maxCoverage: 'BWP 2,000,000',
    commissionRate: 7.0, color: '#22C55E', iconBg: 'bg-green-900'
  },
];

export const leads: Lead[] = [
  { id: 'L001', name: 'Tumelo Kgosi', phone: '+267 71 111 222', product: 'FNB Personal Loan', stage: 'new', value: 500, daysInStage: 1 },
  { id: 'L002', name: 'Refilwe Mabe', phone: '+267 72 222 333', product: 'BOMAID Health Plan', stage: 'new', value: 400, daysInStage: 2 },
  { id: 'L003', name: 'Tshepo Mogae', phone: '+267 73 333 444', product: 'Allan Gray Balanced Fund', stage: 'contacted', value: 500, daysInStage: 3 },
  { id: 'L004', name: 'Bontle Setlhare', phone: '+267 74 444 555', product: 'Metropolitan Motor Cover', stage: 'contacted', value: 280, daysInStage: 1 },
  { id: 'L005', name: 'Kabelo Mmusi', phone: '+267 75 555 666', product: 'BIC Life Assurance', stage: 'contacted', value: 100, daysInStage: 5 },
  { id: 'L006', name: 'Lorato Ditlhong', phone: '+267 76 666 777', product: 'Standard Bank Loan', stage: 'application', value: 1000, daysInStage: 2 },
  { id: 'L007', name: 'Onalenna Mosweu', phone: '+267 77 777 888', product: 'Hollard Comprehensive Car', stage: 'application', value: 300, daysInStage: 4 },
  { id: 'L008', name: 'Letsatsi Gabaake', phone: '+267 71 888 999', product: 'First Capital Home Cover', stage: 'pending', value: 200, daysInStage: 3 },
  { id: 'L009', name: 'Masego Tlhale', phone: '+267 72 999 000', product: 'Investec Money Market', stage: 'pending', value: 1000, daysInStage: 1 },
  { id: 'L010', name: 'Neo Ramotswe', phone: '+267 73 000 111', product: 'Metropolitan Health Cover', stage: 'enrolled', value: 350, daysInStage: 0 },
  { id: 'L011', name: 'Tiro Sekolokwane', phone: '+267 74 111 222', product: 'BIC Household Insurance', stage: 'enrolled', value: 150, daysInStage: 0 },
  { id: 'L012', name: 'Palesa Moeng', phone: '+267 75 222 333', product: 'Guardrisk Motor Insurance', stage: 'new', value: 250, daysInStage: 1 },
  { id: 'L013', name: 'Khumo Bakwena', phone: '+267 76 333 444', product: 'FNB Personal Loan', stage: 'application', value: 500, daysInStage: 1 },
  { id: 'L014', name: 'Sethunya Molebatsi', phone: '+267 77 444 555', product: 'BOMAID Health Plan', stage: 'pending', value: 400, daysInStage: 2 },
];

export const activities: Activity[] = [
  { id: 'A001', type: 'application', message: 'Tumelo Kgosi submitted application for FNB Personal Loan', timestamp: '2 min ago' },
  { id: 'A002', type: 'commission', message: 'Commission received for Thabo Mokoena - BIC Life Assurance', timestamp: '15 min ago', amount: 840 },
  { id: 'A003', type: 'activation', message: 'Policy activated: Lesego Phiri - Metropolitan Motor Cover', timestamp: '1 hour ago' },
  { id: 'A004', type: 'inquiry', message: 'New inquiry from Palesa Moeng about Guardrisk Motor Insurance', timestamp: '2 hours ago' },
  { id: 'A005', type: 'referral', message: 'Referral bonus earned from Naledi Tsheko', timestamp: '3 hours ago', amount: 150 },
  { id: 'A006', type: 'renewal', message: 'Policy renewal: Boitumelo Seretse - Investec Money Market', timestamp: '4 hours ago' },
  { id: 'A007', type: 'application', message: 'Onalenna Mosweu started application for Hollard Comprehensive Car', timestamp: '5 hours ago' },
  { id: 'A008', type: 'commission', message: 'Monthly commission payout processed - BWP 14,750', timestamp: '6 hours ago', amount: 14750 },
  { id: 'A009', type: 'activation', message: 'Policy activated: Neo Ramotswe - Metropolitan Health Cover', timestamp: '8 hours ago' },
  { id: 'A010', type: 'inquiry', message: 'Khumo Bakwena requested callback about FNB Personal Loan', timestamp: '10 hours ago' },
  { id: 'A011', type: 'application', message: 'Lorato Ditlhong completed application for Standard Bank Loan', timestamp: '12 hours ago' },
  { id: 'A012', type: 'commission', message: 'Commission received for Katlego Nkwe - FNB Personal Loan', timestamp: '1 day ago', amount: 525 },
  { id: 'A013', type: 'renewal', message: 'Policy renewal reminder: Dineo Rapula - BIC Household Insurance', timestamp: '1 day ago' },
  { id: 'A014', type: 'referral', message: 'New referral from Mothusi Kgari - potential investment client', timestamp: '1 day ago' },
  { id: 'A015', type: 'activation', message: 'Policy activated: Tiro Sekolokwane - BIC Household Insurance', timestamp: '2 days ago' },
];

export const commissionHistory: CommissionEntry[] = [
  { month: 'Mar', amount: 8200, target: 12000 },
  { month: 'Apr', amount: 9500, target: 12000 },
  { month: 'May', amount: 11200, target: 12000 },
  { month: 'Jun', amount: 10800, target: 13000 },
  { month: 'Jul', amount: 12400, target: 13000 },
  { month: 'Aug', amount: 13100, target: 14000 },
  { month: 'Sep', amount: 11900, target: 14000 },
  { month: 'Oct', amount: 14200, target: 15000 },
  { month: 'Nov', amount: 13800, target: 15000 },
  { month: 'Dec', amount: 15600, target: 16000 },
  { month: 'Jan', amount: 12900, target: 16000 },
  { month: 'Feb', amount: 14750, target: 16000 },
];

export const commissionByCategory = [
  { category: 'Life Insurance', amount: 4200, percentage: 28.5, color: '#22C55E' },
  { category: 'Health Insurance', amount: 3150, percentage: 21.4, color: '#EF4444' },
  { category: 'Motor Insurance', amount: 2800, percentage: 19.0, color: '#06B6D4' },
  { category: 'Personal Loans', amount: 2100, percentage: 14.2, color: '#3B82F6' },
  { category: 'Investments', amount: 1350, percentage: 9.2, color: '#F59E0B' },
  { category: 'Home Insurance', amount: 1150, percentage: 7.8, color: '#A855F7' },
];

export const rewardVouchers: RewardVoucher[] = [
  { id: 'R001', category: 'airtime', title: 'BWP 50', subtitle: 'All Networks', points: 500, color: '#22C55E' },
  { id: 'R002', category: 'airtime', title: 'BWP 100', subtitle: 'All Networks', points: 950, color: '#22C55E' },
  { id: 'R003', category: 'airtime', title: 'BWP 200', subtitle: 'All Networks', points: 1800, color: '#22C55E' },
  { id: 'R004', category: 'fuel', title: 'BWP 100', subtitle: 'All Fuel Stations', points: 1000, color: '#6B7280' },
  { id: 'R005', category: 'fuel', title: 'BWP 250', subtitle: 'All Fuel Stations', points: 2400, color: '#6B7280' },
  { id: 'R006', category: 'fuel', title: 'BWP 500', subtitle: 'All Fuel Stations', points: 4500, color: '#6B7280' },
  { id: 'R007', category: 'cash', title: 'BWP 200', subtitle: 'Major Retailers', points: 2000, color: '#F59E0B' },
  { id: 'R008', category: 'cash', title: 'BWP 500', subtitle: 'Major Retailers', points: 4800, color: '#F59E0B' },
  { id: 'R009', category: 'cash', title: 'BWP 1000', subtitle: 'Major Retailers', points: 9000, color: '#F59E0B' },
  { id: 'R010', category: 'dstv', title: '1 Month Compact', subtitle: 'DStv', points: 2000, color: '#A855F7' },
  { id: 'R011', category: 'dstv', title: '1 Month Compact Plus', subtitle: 'DStv', points: 3000, color: '#A855F7' },
  { id: 'R012', category: 'dstv', title: '1 Month Premium', subtitle: 'DStv', points: 5000, color: '#A855F7' },
  { id: 'R013', category: 'ticket', title: 'BWP 100', subtitle: 'Cinema, Events', points: 1000, color: '#3B82F6' },
  { id: 'R014', category: 'ticket', title: 'BWP 250', subtitle: 'Cinema, Events', points: 2400, color: '#3B82F6' },
  { id: 'R015', category: 'ticket', title: 'BWP 500', subtitle: 'Cinema, Events', points: 4500, color: '#3B82F6' },
  { id: 'R016', category: 'insurance', title: '10% Off', subtitle: 'Medical Aid', points: 800, color: '#F59E0B' },
  { id: 'R017', category: 'insurance', title: '15% Off', subtitle: 'Car Insurance', points: 1200, color: '#F59E0B' },
  { id: 'R018', category: 'insurance', title: '20% Off', subtitle: 'Life Insurance', points: 1500, color: '#F59E0B' },
];

export const targets = {
  monthlyEnrollments: { current: 18, target: 25, label: 'Monthly Enrollments' },
  revenueGoal: { current: 14750, target: 16000, label: 'Revenue Goal (BWP)' },
  customerRetention: { current: 92, target: 95, label: 'Customer Retention %' },
  daysRemaining: 8,
};

export const leaderboard = [
  { rank: 1, name: 'Modiri Keabetswe', commission: 18200, customers: 312 },
  { rank: 2, name: 'Tebogo Masire', commission: 16800, customers: 289 },
  { rank: 3, name: 'You (Agent)', commission: 14750, customers: 247 },
  { rank: 4, name: 'Kelebogile Otsile', commission: 13900, customers: 231 },
  { rank: 5, name: 'Onkabetse Tau', commission: 12500, customers: 218 },
];
