'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconRefresh,
  IconCreditCard,
  IconBrandStripe,
  IconArrowRight,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconClock,
  IconLock,
} from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PaymentError } from './PaymentErrorStates';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'promptpay' | 'paypal';
  provider: string;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface PaymentRetryFlowProps {
  error: PaymentError | null;
  savedPaymentMethods: PaymentMethod[];
  availableProviders: Array<{ id: string; name: string; icon: React.ReactNode }>;
  onRetry: (paymentMethodId: string) => Promise<void>;
  onTryAlternative?: (providerId: string) => Promise<void>;
  onAddNewPaymentMethod?: () => void;
  onCancel?: () => void;
  variant?: 'full' | 'compact' | 'inline';
}

export function PaymentRetryFlow({
  error,
  savedPaymentMethods,
  availableProviders,
  onRetry,
  onTryAlternative,
  onAddNewPaymentMethod,
  onCancel,
  variant = 'full',
}: PaymentRetryFlowProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retrySuccess, setRetrySuccess] = useState(false);

  const handleRetry = async (paymentMethodId: string) => {
    setIsRetrying(true);
    try {
      await onRetry(paymentMethodId);
      setRetrySuccess(true);
      setTimeout(() => setRetrySuccess(false), 3000);
    } catch (err) {
      console.error('Retry failed:', err);
    } finally {
      setIsRetrying(false);
    }
  };

  const handleTryAlternative = async (providerId: string) => {
    if (!onTryAlternative) return;
    setIsRetrying(true);
    try {
      await onTryAlternative(providerId);
      setRetrySuccess(true);
      setTimeout(() => setRetrySuccess(false), 3000);
    } catch (err) {
      console.error('Alternative payment failed:', err);
    } finally {
      setIsRetrying(false);
    }
  };

  const getProviderIcon = (provider: string) => {
    const providerConfig = availableProviders.find((p) => p.id === provider);
    return providerConfig?.icon || <IconCreditCard className="w-5 h-5" />;
  };

  const renderFull = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <Card className="border-ivory/10 bg-background/70 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 dark:text-white">
            Payment Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Message */}
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <IconAlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  {error?.message || 'Payment could not be processed'}
                </h3>
                {error?.details && (
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {error.details}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {retrySuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <IconCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100">
                      Payment Successful!
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your payment has been processed successfully.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Retry with Saved Payment Method */}
          {savedPaymentMethods.length > 0 && !retrySuccess && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <IconRefresh className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Retry with Saved Payment Method
              </h4>
              <div className="grid gap-3">
                {savedPaymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleRetry(method.id)}
                    disabled={isRetrying}
                    className={`
                      flex items-center justify-between p-4 rounded-xl border-2 transition-all
                      ${selectedPaymentMethod === method.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-700'
                      }
                      ${isRetrying ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        {method.type === 'card' ? (
                          <IconCreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : method.type === 'bank' ? (
                          <IconBrandStripe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                          <IconLock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {method.provider}
                        </div>
                        {method.last4 && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            **** {method.last4}
                          </div>
                        )}
                        {method.expiryMonth && method.expiryYear && (
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            Expires {String(method.expiryMonth).padStart(2, '0')}/{method.expiryYear}
                          </div>
                        )}
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded">
                        Default
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Try Alternative Provider */}
          {availableProviders.length > 0 && onTryAlternative && !retrySuccess && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <IconCreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Try Alternative Payment Method
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => handleTryAlternative(provider.id)}
                    disabled={isRetrying}
                    className={`
                      flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                      ${selectedProvider === provider.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                      }
                      ${isRetrying ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {provider.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {provider.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        Secure payment processing
                      </div>
                    </div>
                    <IconArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add New Payment Method */}
          {onAddNewPaymentMethod && !retrySuccess && (
            <button
              onClick={onAddNewPaymentMethod}
              className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                <IconCreditCard className="w-5 h-5" />
                <span className="font-medium">Add New Payment Method</span>
              </div>
            </button>
          )}

          {/* Cancel Button */}
          {onCancel && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onCancel}
                className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel and Return to Checkout
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderCompact = () => (
    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
        <IconAlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
          {error?.message || 'Payment Failed'}
        </h3>
        <p className="text-sm text-red-700 dark:text-red-300 mb-3">
          {error?.details || 'Please try again or use a different payment method'}
        </p>
        <div className="flex gap-2">
          {savedPaymentMethods.length > 0 && (
            <button
              onClick={() => {
                const defaultMethod = savedPaymentMethods.find((m) => m.isDefault);
                if (defaultMethod) handleRetry(defaultMethod.id);
              }}
              disabled={isRetrying}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              <IconRefresh className="w-4 h-4" />
              {isRetrying ? 'Retrying...' : 'Retry Now'}
            </button>
          )}
          {onTryAlternative && (
            <button
              onClick={() => {
                const alternativeProvider = availableProviders.find((p) => p.id !== 'stripe');
                if (alternativeProvider) handleTryAlternative(alternativeProvider.id);
              }}
              disabled={isRetrying}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors disabled:opacity-50"
            >
              <IconCreditCard className="w-4 h-4" />
              {isRetrying ? 'Trying...' : 'Try Alternative'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderInline = () => (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
        <IconAlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
      </div>
      <span className="text-sm text-red-700 dark:text-red-300">
        {error?.message || 'Payment failed'}
      </span>
      {savedPaymentMethods.length > 0 && (
        <button
          onClick={() => {
            const defaultMethod = savedPaymentMethods.find((m) => m.isDefault);
            if (defaultMethod) handleRetry(defaultMethod.id);
          }}
          disabled={isRetrying}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
        >
          <IconRefresh className="w-3 h-3" />
          {isRetrying ? '...' : 'Retry'}
        </button>
      )}
    </div>
  );

  if (variant === 'compact') return renderCompact();
  if (variant === 'inline') return renderInline();
  return renderFull();
}
