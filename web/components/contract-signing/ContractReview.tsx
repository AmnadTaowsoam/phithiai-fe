'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconFileText, IconCheck, IconAlertTriangle, IconDownload } from '@tabler/icons-react';
import type { Contract } from './types';

interface ContractReviewProps {
  contract: Contract;
  signatures: Record<string, string>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string | null;
}

export function ContractReview({ contract, signatures, onBack, onSubmit, isSubmitting, error }: ContractReviewProps) {
  const completedMarkers = Object.keys(signatures).length;
  const totalRequiredMarkers = contract.markers.filter(m => m.required).length;
  const allRequiredSigned = completedMarkers >= totalRequiredMarkers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <IconFileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Review & Submit</h1>
            <p className="text-purple-100 text-sm">
              {completedMarkers} of {totalRequiredMarkers} required signatures
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Status Banner */}
        <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
          allRequiredSigned
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
        }`}>
          {allRequiredSigned ? (
            <IconCheck className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <IconAlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h3 className={`font-semibold ${
              allRequiredSigned
                ? 'text-green-900 dark:text-green-300'
                : 'text-yellow-900 dark:text-yellow-300'
            }`}>
              {allRequiredSigned ? 'Ready to Submit' : 'Incomplete Signatures'}
            </h3>
            <p className={`text-sm ${
              allRequiredSigned
                ? 'text-green-700 dark:text-green-400'
                : 'text-yellow-700 dark:text-yellow-400'
            }`}>
              {allRequiredSigned
                ? 'All required signatures have been collected. You can now submit the contract.'
                : `${totalRequiredMarkers - completedMarkers} more signature(s) required before submission.`}
            </p>
          </div>
        </div>

        {/* Signatures Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Collected Signatures
          </h2>
          <div className="space-y-3">
            {contract.markers.map((marker) => {
              const isSigned = !!signatures[marker.id];
              const party = contract.parties.find(p => p.id === marker.partyId);

              return (
                <div
                  key={marker.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSigned
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSigned
                          ? 'bg-green-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        {isSigned ? (
                          <IconCheck className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white text-sm">•</span>
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${
                          isSigned
                            ? 'text-green-900 dark:text-green-300'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {marker.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {party?.name} • {marker.type}
                        </p>
                      </div>
                    </div>
                    {marker.required && (
                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  {isSigned && (
                    <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                      <img
                        src={signatures[marker.id]}
                        alt={`Signature for ${marker.label}`}
                        className="h-16"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contract Details */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Contract Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Contract ID:</span>
              <span className="text-gray-900 dark:text-white font-medium">{contract.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Title:</span>
              <span className="text-gray-900 dark:text-white font-medium">{contract.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Created:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {contract.createdAt.toLocaleDateString('th-TH')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Expires:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {contract.expiresAt.toLocaleDateString('th-TH')}
              </span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <IconAlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                Legal Notice
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                By submitting this contract, you acknowledge that all signatures provided are authentic and that you have read, understood, and agreed to all terms and conditions. This submission is legally binding.
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <IconArrowLeft className="w-5 h-5" />
            Back to Signing
          </button>
          <button
            onClick={onSubmit}
            disabled={!allRequiredSigned || isSubmitting}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              allRequiredSigned && !isSubmitting
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <IconCheck className="w-5 h-5" />
                Submit Contract
              </>
            )}
          </button>
        </div>

        {/* Download Option */}
        <div className="mt-4 text-center">
          <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center justify-center gap-2 mx-auto">
            <IconDownload className="w-4 h-4" />
            Download PDF for your records
          </button>
        </div>
      </div>
    </motion.div>
  );
}
