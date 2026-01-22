'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconClock, IconCheck, IconAlertTriangle, IconX, IconDownload, IconRefresh } from '@tabler/icons-react';

type PayoutStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'DISPUTED';
type Payout = {
  id: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  currency: 'THB';
  status: PayoutStatus;
  createdAt: Date;
  processedAt?: Date;
  expectedArrival: Date;
  description?: string;
};

type Dispute = {
  id: string;
  payoutId: string;
  reason: string;
  status: 'open' | 'investigating' | 'resolved';
  createdAt: Date;
  resolvedAt?: Date;
};

export default function VendorPayoutPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [disputeReason, setDisputeReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPayouts([
      {
        id: 'p1',
        vendorId: 'v3',
        vendorName: 'Royal Thai Cuisine',
        amount: 45000,
        currency: 'THB',
        status: 'PAID',
        createdAt: new Date('2024-01-10'),
        processedAt: new Date('2024-01-10'),
        expectedArrival: new Date('2024-01-10'),
      },
      {
        id: 'p2',
        vendorId: 'v1',
        vendorName: 'Siam Wedding Planner',
        amount: 85000,
        currency: 'THB',
        status: 'PROCESSING',
        createdAt: new Date('2024-01-12'),
        processedAt: new Date('2024-01-12'),
        expectedArrival: new Date('2024-01-14'),
      },
      {
        id: 'p3',
        vendorId: 'v4',
        vendorName: 'Grand Ballroom Venue',
        amount: 80000,
        currency: 'THB',
        status: 'PENDING',
        createdAt: new Date('2024-01-15'),
        processedAt: new Date('2024-01-15'),
        expectedArrival: new Date('2024-01-17'),
      },
      {
        id: 'p4',
        vendorId: 'v5',
        vendorName: 'Elegant Photography',
        amount: 35000,
        currency: 'THB',
        status: 'DISPUTED',
        createdAt: new Date('2024-01-08'),
        processedAt: new Date('2024-01-10'),
        expectedArrival: new Date('2024-01-10'),
        description: 'Payment returned due to insufficient funds',
      },
    ]);

    setDisputes([
      {
        id: 'd1',
        payoutId: 'p2',
        reason: 'Incorrect amount calculated',
        status: 'resolved',
        createdAt: new Date('2024-01-13'),
        resolvedAt: new Date('2024-01-14'),
      },
    ]);
  }, []);

  const totalPending = payouts.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0);
  const totalProcessing = payouts.filter(p => p.status === 'PROCESSING').reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payouts.filter(p => p.status === 'PAID' || p.status === 'DISPUTED').reduce((sum, p) => sum + p.amount, 0);
  const totalDisputed = disputes.filter(d => d.status === 'resolved').reduce((sum, d) => sum + (payouts.find(p => p.id === d.payoutId)?.amount || 0), 0);

  const getStatusColor = (status: PayoutStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'PROCESSING':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'PAID':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'DISPUTED':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: PayoutStatus) => {
    switch (status) {
      case 'PENDING':
        return <IconClock className="w-4 h-4" />;
      case 'PROCESSING':
        return <IconRefresh className="w-4 h-4 animate-spin" />;
      case 'PAID':
        return <IconCheck className="w-4 h-4" />;
      case 'DISPUTED':
        return <IconAlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleDisputeSubmit = () => {
    if (!disputeReason.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setDisputes([...disputes, {
        id: `d${disputes.length + 1}`,
        payoutId: selectedPayout?.id || '',
        reason: disputeReason,
        status: 'open',
        createdAt: new Date(),
      }]);
      setShowDisputeModal(false);
      setDisputeReason('');
      setIsSubmitting(false);
    }, 1000);
  };

  const getExpectedArrivalText = (payout: Payout) => {
    if (!payout.expectedArrival) return 'Calculating...';
    const now = new Date();
    const diff = payout.expectedArrival.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Arriving today';
    if (days === 1) return 'Arriving tomorrow';
    if (days <= 7) return `Arriving in ${days} days`;
    return `Arriving in ${days} days`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Vendor Payout Portal
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your incoming payments and manage disputes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vendor Balance
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  THB 125,000.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Pending
              </h2>
              <div className="flex items-center gap-2">
                {getStatusIcon('PENDING')}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {payouts.filter(p => p.status === 'PENDING').length} payouts
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
              {totalPending.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
            </div>
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <IconClock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Processing
              </h2>
              <div className="flex items-center gap-2">
                {getStatusIcon('PROCESSING')}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {payouts.filter(p => p.status === 'PROCESSING').length} payouts
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {totalProcessing.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
            </div>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <IconRefresh className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Paid
              </h2>
              <div className="flex items-center gap-2">
                {getStatusIcon('PAID')}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {payouts.filter(p => p.status === 'PAID' || p.status === 'DISPUTED').length} payouts
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              {totalPaid.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
            </div>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <IconCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>

          {disputes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-red-200 dark:border-red-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                  Disputed
                </h2>
                <div className="flex items-center gap-2">
                  <IconAlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {disputes.filter(d => d.status === 'open').length} open
                  </span>
                </div>
              </div>
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                {totalDisputed.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Payout Ledger
            </h2>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Payouts</option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="PAID">Paid</option>
                <option value="DISPUTED">Disputed</option>
              </select>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[500px]">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout) => (
                  <tr key={payout.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {payout.vendorName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {payout.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {payout.amount.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium">
                        {getStatusIcon(payout.status)}
                        <span className="ml-2">{payout.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {payout.createdAt.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {payout.processedAt ? payout.processedAt.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">
                        {getExpectedArrivalText(payout)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {payout.description && (
                        <span className="text-xs text-red-600 dark:text-red-400" title={payout.description}>
                          Note
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {payout.status === 'PENDING' && (
                        <button
                          onClick={() => setSelectedPayout(payout)}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                        >
                          View Details
                        </button>
                      )}
                      {payout.status === 'PAID' && (
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = `/vendor-payout/${payout.id}`;
                            link.download = '';
                            link.click();
                          }}
                          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                        >
                          <IconDownload className="w-4 h-4" />
                        </button>
                      )}
                      {payout.status === 'DISPUTED' && (
                        <button
                          onClick={() => setSelectedPayout(payout)}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-500 font-medium"
                        >
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPayout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPayout(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Payout Details
                  </h2>
                  <button
                    onClick={() => setSelectedPayout(null)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <IconX className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎊</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-lg">
                      {selectedPayout.vendorName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedPayout.id}
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-right">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {selectedPayout.amount.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full">
                    {getStatusIcon(selectedPayout.status)}
                    <span className="ml-2">{selectedPayout.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 p-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full">
                    {getStatusIcon(selectedPayout.status)}
                    <span className="ml-2">{selectedPayout.status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Processed Date</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedPayout.processedAt ? selectedPayout.processedAt.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Processing...'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Expected Arrival</p>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">
                    {getExpectedArrivalText(selectedPayout)}
                  </div>
                </div>
              </div>

              {selectedPayout.description && (
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> {selectedPayout.description}
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = `/vendor-payout/${selectedPayout.id}`;
                    link.download = '';
                    link.click();
                  }}
                  className="w-full py-3 px-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <IconDownload className="w-5 h-5" />
                  Download Receipt
                </button>
              </div>

              {selectedPayout.status === 'PAID' && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowDisputeModal(true)}
                    className="w-full py-3 px-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    <IconAlertTriangle className="w-5 h-5" />
                    Raise Dispute
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDisputeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full"
            >
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Raise Dispute
                  </h2>
                  <button
                    onClick={() => setShowDisputeModal(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <IconX className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Reason for Dispute
                </label>
                <textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="Please explain why you're disputing this payout..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDisputeModal(false)}
                  disabled={isSubmitting || !disputeReason.trim()}
                  className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisputeSubmit}
                  disabled={isSubmitting || !disputeReason.trim()}
                  className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <IconAlertTriangle className="w-5 h-5" />
                      <span>Submit Dispute</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
