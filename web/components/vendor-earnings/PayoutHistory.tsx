'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconReceipt,
  IconCalendar,
  IconCircleCheck,
  IconClock,
  IconAlertCircle,
  IconDownload,
  IconFilter,
  IconSearch,
  IconEye,
  IconFileText,
  IconCurrencyBaht
} from '@tabler/icons-react';
import type { PayoutRecord, LedgerEntry } from './types';

// Mock payout records
const PAYOUT_RECORDS: PayoutRecord[] = [
  {
    id: 'PAYOUT-001',
    period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
    grossRevenue: 185000,
    commissionRate: 10,
    commissionAmount: 18500,
    platformFee: 3700,
    processingFee: 2775,
    netPayout: 160025,
    status: 'completed',
    paidDate: new Date('2026-02-05'),
    transactionId: 'TXN-20260205-001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'PAYOUT-002',
    period: { start: new Date('2025-12-01'), end: new Date('2025-12-31') },
    grossRevenue: 165000,
    commissionRate: 10,
    commissionAmount: 16500,
    platformFee: 3300,
    processingFee: 2475,
    netPayout: 142725,
    status: 'completed',
    paidDate: new Date('2026-01-05'),
    transactionId: 'TXN-20260105-001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'PAYOUT-003',
    period: { start: new Date('2025-11-01'), end: new Date('2025-11-30') },
    grossRevenue: 142000,
    commissionRate: 12,
    commissionAmount: 17040,
    platformFee: 2840,
    processingFee: 2130,
    netPayout: 119990,
    status: 'completed',
    paidDate: new Date('2026-01-02'),
    transactionId: 'TXN-20260102-001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'PAYOUT-004',
    period: { start: new Date('2025-10-01'), end: new Date('2025-10-31') },
    grossRevenue: 158000,
    commissionRate: 12,
    commissionAmount: 18960,
    platformFee: 3160,
    processingFee: 2370,
    netPayout: 133510,
    status: 'completed',
    paidDate: new Date('2025-12-05'),
    transactionId: 'TXN-20251205-001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'PAYOUT-005',
    period: { start: new Date('2025-09-01'), end: new Date('2025-09-30') },
    grossRevenue: 135000,
    commissionRate: 12,
    commissionAmount: 16200,
    platformFee: 2700,
    processingFee: 2025,
    netPayout: 114075,
    status: 'completed',
    paidDate: new Date('2025-11-05'),
    transactionId: 'TXN-20251105-001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'PAYOUT-006',
    period: { start: new Date('2025-08-01'), end: new Date('2025-08-31') },
    grossRevenue: 148000,
    commissionRate: 12,
    commissionAmount: 17760,
    platformFee: 2960,
    processingFee: 2220,
    netPayout: 125060,
    status: 'completed',
    paidDate: new Date('2025-10-05'),
    transactionId: 'TXN-20251005-001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'PAYOUT-007',
    period: { start: new Date('2025-07-01'), end: new Date('2025-07-31') },
    grossRevenue: 162000,
    commissionRate: 12,
    commissionAmount: 19440,
    platformFee: 3240,
    processingFee: 2430,
    netPayout: 136890,
    status: 'completed',
    paidDate: new Date('2025-09-05'),
    transactionId: 'TXN-20250905-001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'PAYOUT-008',
    period: { start: new Date('2025-06-01'), end: new Date('2025-06-30') },
    grossRevenue: 175000,
    commissionRate: 10,
    commissionAmount: 17500,
    platformFee: 3500,
    processingFee: 2625,
    netPayout: 151375,
    status: 'completed',
    paidDate: new Date('2025-08-05'),
    transactionId: 'TXN-20250805-001',
    paymentMethod: 'Bank Transfer'
  },
];

// Mock ledger entries
const LEDGER_ENTRIES: LedgerEntry[] = [
  { id: '1', date: new Date('2026-01-28'), type: 'booking', description: 'Wedding Ceremony - Smith Family', amount: 85000, balance: 85000, category: 'Wedding', reference: 'BK-2026-001' },
  { id: '2', date: new Date('2026-01-25'), type: 'booking', description: 'Ordination Ceremony - Johnson', amount: 45000, balance: 130000, category: 'Ordination', reference: 'BK-2026-002' },
  { id: '3', date: new Date('2026-01-22'), type: 'booking', description: 'Merit Making - Temple Event', amount: 25000, balance: 155000, category: 'Merit', reference: 'BK-2026-003' },
  { id: '4', date: new Date('2026-01-20'), type: 'booking', description: 'Wedding Ceremony - Davis', amount: 30000, balance: 185000, category: 'Wedding', reference: 'BK-2026-004' },
  { id: '5', date: new Date('2026-01-18'), type: 'refund', description: 'Refund - Cancelled Booking', amount: -15000, balance: 170000, category: 'Refund', reference: 'RF-2026-001' },
  { id: '6', date: new Date('2026-01-15'), type: 'booking', description: 'Funeral Service - Memorial', amount: 35000, balance: 205000, category: 'Funeral', reference: 'BK-2026-005' },
  { id: '7', date: new Date('2026-01-12'), type: 'bonus', description: 'Performance Bonus - Q4 2025', amount: 5000, balance: 210000, category: 'Bonus', reference: 'BN-2026-001' },
  { id: '8', date: new Date('2026-01-10'), type: 'booking', description: 'Wedding Ceremony - Wilson', amount: 40000, balance: 214000, category: 'Wedding', reference: 'BK-2026-006' },
];

export function PayoutHistory() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'processing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayout, setSelectedPayout] = useState<PayoutRecord | null>(null);

  const filteredPayouts = PAYOUT_RECORDS.filter(payout => {
    if (filter !== 'all' && payout.status !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payout.id.toLowerCase().includes(query) ||
        payout.transactionId?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <IconCircleCheck className="w-5 h-5 text-green-600" />;
      case 'processing': return <IconClock className="w-5 h-5 text-blue-600" />;
      case 'pending': return <IconClock className="w-5 h-5 text-yellow-600" />;
      case 'failed': return <IconAlertCircle className="w-5 h-5 text-red-600" />;
      default: return <IconClock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking': return <IconReceipt className="w-4 h-4 text-green-600" />;
      case 'refund': return <IconReceipt className="w-4 h-4 text-red-600" />;
      case 'bonus': return <IconFileText className="w-4 h-4 text-purple-600" />;
      case 'adjustment': return <IconFileText className="w-4 h-4 text-blue-600" />;
      default: return <IconReceipt className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('th-TH')} THB`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const totalPayouts = filteredPayouts.reduce((sum, p) => sum + p.netPayout, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <IconReceipt className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Payout History</h2>
            <p className="text-sm text-gray-500">Track your earnings and payouts</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
          <IconDownload className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Payouts</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayouts)}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <IconCurrencyBaht className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{filteredPayouts.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <IconFileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg Payout</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(filteredPayouts.length > 0 ? totalPayouts / filteredPayouts.length : 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <IconCalendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by payout ID or transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <IconFilter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payout List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payout ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gross Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Net Payout</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayouts.map((payout, index) => (
                <motion.tr
                  key={payout.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedPayout(payout)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{payout.id}</span>
                    </div>
                    {payout.transactionId && (
                      <div className="text-xs text-gray-500">{payout.transactionId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{formatDate(payout.period.start)} - {formatDate(payout.period.end)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(payout.grossRevenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{formatCurrency(payout.commissionAmount)}</div>
                    <div className="text-xs text-gray-500">{payout.commissionRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    {formatCurrency(payout.netPayout)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payout.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payout.status)}`}>
                        {payout.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700">
                      <IconEye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Detail Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPayout(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPayout.id}</h3>
                  <p className="text-sm text-gray-500">{selectedPayout.transactionId}</p>
                </div>
                <button
                  onClick={() => setSelectedPayout(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {getStatusIcon(selectedPayout.status)}
                <div>
                  <p className="font-medium text-gray-900 capitalize">{selectedPayout.status}</p>
                  {selectedPayout.paidDate && (
                    <p className="text-sm text-gray-500">Paid on {formatDate(selectedPayout.paidDate)}</p>
                  )}
                </div>
              </div>

              {/* Period */}
              <div className="flex items-center gap-3">
                <IconCalendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Payout Period</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(selectedPayout.period.start)} - {formatDate(selectedPayout.period.end)}
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Payout Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Gross Revenue</span>
                    <span className="font-medium text-gray-900">{formatCurrency(selectedPayout.grossRevenue)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Platform Commission ({selectedPayout.commissionRate}%)</span>
                    <span className="font-medium text-red-600">-{formatCurrency(selectedPayout.commissionAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Platform Fee (2%)</span>
                    <span className="font-medium text-red-600">-{formatCurrency(selectedPayout.platformFee)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Processing Fee (1.5%)</span>
                    <span className="font-medium text-red-600">-{formatCurrency(selectedPayout.processingFee)}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="font-semibold text-gray-900">Net Payout</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency(selectedPayout.netPayout)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center gap-3">
                <IconCurrencyBaht className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">{selectedPayout.paymentMethod}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPayout(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                <IconDownload className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Recent Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Ledger Entries</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {LEDGER_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(entry.type)}
                  <div>
                    <p className="font-medium text-gray-900">{entry.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{formatDate(entry.date)}</span>
                      <span>•</span>
                      <span>{entry.category}</span>
                      {entry.reference && (
                        <>
                          <span>•</span>
                          <span className="text-purple-600">{entry.reference}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${entry.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {entry.amount >= 0 ? '+' : ''}{formatCurrency(entry.amount)}
                  </p>
                  <p className="text-sm text-gray-500">Balance: {formatCurrency(entry.balance)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
