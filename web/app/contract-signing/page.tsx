'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconFileText, IconSignature, IconCheck, IconAlertCircle, IconChevronRight } from '@tabler/icons-react';
import { LegalReader } from '../../components/contract-signing/LegalReader';
import { SignatureCanvas } from '../../components/contract-signing/SignatureCanvas';
import { SigningProgress } from '../../components/contract-signing/SigningProgress';
import { ContractReview } from '../../components/contract-signing/ContractReview';
import { Contract } from '../../components/contract-signing/types';
import type { SigningMarker, ContractParty } from '../../components/contract-signing/types';

export default function ContractSigningPage() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
  const [isSigning, setIsSigning] = useState(false);
  const [signatures, setSignatures] = useState<Record<string, string>>({});
  const [showReview, setShowReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load contract data
  useEffect(() => {
    // Mock data - replace with API call
    setContract({
      id: 'CTR-2024-001',
      title: 'Thai Wedding Ceremony Service Agreement',
      content: `
        <h1>THAI WEDDING CEREMONY SERVICE AGREEMENT</h1>
        <p><strong>Date:</strong> January 20, 2026</p>
        
        <h2>1. PARTIES TO THE AGREEMENT</h2>
        <p>This Agreement is entered into between:</p>
        <p><strong>Client:</strong> [Client Name] (hereinafter referred to as "Client")</p>
        <p><strong>Vendor:</strong> [Vendor Name] (hereinafter referred to as "Vendor")</p>
        
        <h2>2. SERVICES TO BE PROVIDED</h2>
        <p>The Vendor agrees to provide the following services:</p>
        <ul>
          <li>Traditional Thai wedding ceremony consultation</li>
          <li>Officiant services for the main ceremony</li>
          <li>Cultural ritual guidance and preparation</li>
          <li>Traditional music arrangement</li>
          <li>Photography and videography services</li>
        </ul>
        
        <h2>3. PAYMENT TERMS</h2>
        <p><strong>Total Amount:</strong> THB 150,000</p>
        <p><strong>Payment Schedule:</strong></p>
        <ul>
          <li>Deposit (30%): THB 45,000 - Due upon signing</li>
          <li>Second Payment (40%): THB 60,000 - Due 30 days before ceremony</li>
          <li>Final Payment (30%): THB 45,000 - Due on ceremony day</li>
        </ul>
        
        <h2>4. CANCELLATION POLICY</h2>
        <p>Cancellations made more than 60 days before the ceremony will receive a 80% refund of the deposit.</p>
        <p>Cancellations made between 30-60 days before the ceremony will receive a 50% refund.</p>
        <p>Cancellations made less than 30 days before the ceremony are non-refundable.</p>
        
        <h2>5. LIABILITY AND INDEMNIFICATION</h2>
        <p>The Vendor shall not be liable for any delays or failures caused by circumstances beyond their control.</p>
        <p>The Client agrees to indemnify the Vendor against any claims arising from the Client's actions.</p>
        
        <h2>6. MODIFICATIONS TO THE AGREEMENT</h2>
        <p>Any modifications to this Agreement must be made in writing and signed by both parties.</p>
        
        <h2>7. GOVERNING LAW</h2>
        <p>This Agreement shall be governed by and construed in accordance with the laws of the Kingdom of Thailand.</p>
        
        <h2>8. ENTIRE AGREEMENT</h2>
        <p>This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements.</p>
        
        <div class="signature-section">
          <h3>SIGNATURES</h3>
          <p>By signing below, both parties acknowledge that they have read, understood, and agreed to all terms and conditions outlined in this Agreement.</p>
        </div>
      `,
      parties: [
        { id: 'party-1', name: 'Client', role: 'user', status: 'pending' },
        { id: 'party-2', name: 'Vendor', role: 'vendor', status: 'signed', signedAt: new Date('2026-01-18') },
        { id: 'party-3', name: 'Witness 1', role: 'witness', status: 'pending' },
      ],
      markers: [
        { id: 'marker-1', type: 'signature', partyId: 'party-1', position: 15, label: 'Client Initial', required: true },
        { id: 'marker-2', type: 'signature', partyId: 'party-1', position: 100, label: 'Client Signature', required: true },
        { id: 'marker-3', type: 'date', partyId: 'party-1', position: 100, label: 'Date', required: true },
        { id: 'marker-4', type: 'signature', partyId: 'party-3', position: 100, label: 'Witness Signature', required: false },
      ],
      createdAt: new Date('2026-01-15'),
      expiresAt: new Date('2026-02-15'),
    });
  }, []);

  const handleScrollToMarker = (index: number) => {
    setCurrentMarkerIndex(index);
  };

  const handleSignatureComplete = (markerId: string, signatureData: string) => {
    setSignatures(prev => ({ ...prev, [markerId]: signatureData }));
    
    // Move to next marker
    if (currentMarkerIndex < (contract?.markers.length || 0) - 1) {
      setCurrentMarkerIndex(prev => prev + 1);
    } else {
      setShowReview(true);
    }
  };

  const handleSubmitContract = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit contract. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!contract) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading contract...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Contract Signed Successfully!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your contract has been submitted and is now being processed. You will receive a confirmation email shortly.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <IconFileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Contract Signing
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {contract.title}
                </p>
              </div>
            </div>
            <SigningProgress
              contract={contract}
              signatures={signatures}
              currentMarkerIndex={currentMarkerIndex}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contract Reader */}
          <div className="lg:col-span-2">
            {!showReview ? (
              <LegalReader
                contract={contract}
                currentMarkerIndex={currentMarkerIndex}
                onMarkerClick={handleScrollToMarker}
              />
            ) : (
              <ContractReview
                contract={contract}
                signatures={signatures}
                onBack={() => setShowReview(false)}
                onSubmit={handleSubmitContract}
                isSubmitting={isSubmitting}
                error={error}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <IconSignature className="w-5 h-5 text-purple-600" />
                Signing Checklist
              </h2>

              <div className="space-y-3">
                {contract.markers.map((marker, index) => {
                  const isCompleted = !!signatures[marker.id];
                  const isCurrent = index === currentMarkerIndex && !showReview;
                  const party = contract.parties.find(p => p.id === marker.partyId);

                  return (
                    <motion.button
                      key={marker.id}
                      onClick={() => {
                        if (!showReview) {
                          handleScrollToMarker(index);
                        }
                      }}
                      disabled={showReview}
                      whileHover={{ scale: !showReview ? 1.02 : 1 }}
                      whileTap={{ scale: !showReview ? 0.98 : 1 }}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-500'
                          : isCompleted
                          ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                          : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500'
                          : isCurrent
                          ? 'bg-purple-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        {isCompleted ? (
                          <IconCheck className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`font-medium ${
                          isCurrent ? 'text-purple-700 dark:text-purple-300' : 'text-gray-900 dark:text-white'
                        }`}>
                          {marker.label}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {party?.name} - {marker.type}
                        </p>
                      </div>
                      {marker.required && (
                        <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Party Status */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Party Status
                </h3>
                <div className="space-y-2">
                  {contract.parties.map((party) => (
                    <div key={party.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{party.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        party.status === 'signed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : party.status === 'rejected'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {party.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-2">
                  <IconAlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Please review all terms carefully before signing. By signing, you agree to all conditions outlined in this contract.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Signature Modal */}
      <AnimatePresence>
        {isSigning && (
          <SignatureCanvas
            marker={contract.markers[currentMarkerIndex]}
            party={contract.parties.find(p => p.id === contract.markers[currentMarkerIndex].partyId)!}
            onComplete={(data) => handleSignatureComplete(contract.markers[currentMarkerIndex].id, data)}
            onCancel={() => setIsSigning(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
