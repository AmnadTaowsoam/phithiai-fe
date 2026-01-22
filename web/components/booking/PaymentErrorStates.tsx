'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  IconAlertTriangle,
  IconCreditCard,
  IconRefresh,
  IconWorld,
  IconShield,
  IconClock,
  IconLock,
  IconX,
  IconAlertCircle,
  IconInfoCircle,
  IconPhone,
} from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export type PaymentErrorType =
  | 'bank_declined'
  | 'insufficient_funds'
  | 'card_expired'
  | 'invalid_cvv'
  | 'invalid_zip'
  | 'fx_timeout'
  | 'fx_rate_unavailable'
  | '3ds_failed'
  | '3ds_timeout'
  | 'network_error'
  | 'payment_gateway_down'
  | 'payment_method_invalid'
  | 'currency_not_supported'
  | 'amount_invalid'
  | 'generic_error';

export interface PaymentError {
  type: PaymentErrorType;
  code?: string;
  message: string;
  details?: string;
  retryable: boolean;
  suggestedAction?: string;
  provider?: string;
}

export interface PaymentErrorStatesProps {
  error: PaymentError | null;
  onRetry?: () => void;
  onTryAlternative?: () => void;
  onContactSupport?: () => void;
  showLiveSupport?: boolean;
  variant?: 'full' | 'compact' | 'inline';
}

// Error configurations
const ERROR_CONFIGS: Record<PaymentErrorType, {
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  suggestedAction: string;
  retryable: boolean;
}> = {
  bank_declined: {
    title: 'Payment Declined',
    icon: <IconCreditCard className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    description: 'Your bank declined this transaction. Please check your account or try a different payment method.',
    suggestedAction: 'Try a different card or contact your bank',
    retryable: true,
  },
  insufficient_funds: {
    title: 'Insufficient Funds',
    icon: <IconAlertTriangle className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    description: 'Your payment method has insufficient funds for this transaction.',
    suggestedAction: 'Add funds to your account or use a different payment method',
    retryable: true,
  },
  card_expired: {
    title: 'Card Expired',
    icon: <IconCreditCard className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'Your payment card has expired. Please update your payment information.',
    suggestedAction: 'Update your payment method with a new card',
    retryable: false,
  },
  invalid_cvv: {
    title: 'Invalid Security Code',
    icon: <IconShield className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'The CVV/CVC code you entered is invalid.',
    suggestedAction: 'Check your card and enter the correct security code',
    retryable: true,
  },
  invalid_zip: {
    title: 'Invalid Postal Code',
    icon: <IconAlertCircle className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    description: 'The postal code you entered does not match your billing address.',
    suggestedAction: 'Verify your billing information and try again',
    retryable: true,
  },
  fx_timeout: {
    title: 'Currency Exchange Timeout',
    icon: <IconClock className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    description: 'We could not get the current exchange rate. Please try again.',
    suggestedAction: 'Try again or proceed with base currency',
    retryable: true,
  },
  fx_rate_unavailable: {
    title: 'Exchange Rate Unavailable',
    icon: <IconWorld className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    description: 'Exchange rates for this currency are temporarily unavailable.',
    suggestedAction: 'Try a different currency or contact support',
    retryable: true,
  },
  '3ds_failed': {
    title: '3D Secure Verification Failed',
    icon: <IconLock className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    description: 'Your bank declined the 3D Secure verification.',
    suggestedAction: 'Contact your bank or try a different payment method',
    retryable: true,
  },
  '3ds_timeout': {
    title: 'Verification Timeout',
    icon: <IconClock className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    description: 'The 3D Secure verification process timed out.',
    suggestedAction: 'Try again or complete verification in your banking app',
    retryable: true,
  },
  network_error: {
    title: 'Network Error',
    icon: <IconAlertTriangle className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'A network error occurred while processing your payment.',
    suggestedAction: 'Check your connection and try again',
    retryable: true,
  },
  payment_gateway_down: {
    title: 'Payment Service Unavailable',
    icon: <IconX className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    description: 'Our payment service is temporarily unavailable.',
    suggestedAction: 'Please try again in a few minutes',
    retryable: true,
  },
  payment_method_invalid: {
    title: 'Invalid Payment Method',
    icon: <IconCreditCard className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    description: 'The payment method you selected is not valid for this transaction.',
    suggestedAction: 'Choose a different payment method',
    retryable: false,
  },
  currency_not_supported: {
    title: 'Currency Not Supported',
    icon: <IconWorld className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'This currency is not supported for the selected payment method.',
    suggestedAction: 'Choose a different currency or payment method',
    retryable: false,
  },
  amount_invalid: {
    title: 'Invalid Amount',
    icon: <IconAlertCircle className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    description: 'The payment amount is invalid or outside allowed limits.',
    suggestedAction: 'Enter a valid amount within the allowed range',
    retryable: true,
  },
  generic_error: {
    title: 'Payment Error',
    icon: <IconAlertTriangle className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    description: 'An error occurred while processing your payment.',
    suggestedAction: 'Please try again or contact support',
    retryable: true,
  },
};

export function PaymentErrorStates({
  error,
  onRetry,
  onTryAlternative,
  onContactSupport,
  showLiveSupport = true,
  variant = 'full',
}: PaymentErrorStatesProps) {
  if (!error) return null;

  const config = ERROR_CONFIGS[error.type] || ERROR_CONFIGS.generic_error;

  const renderFull = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <Card className="border-ivory/10 bg-background/70 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-xl ${config.bgColor}`}>
              <div className={config.color}>{config.icon}</div>
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                {config.title}
              </CardTitle>
              {error.code && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Error Code: {error.code}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Description */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
            <p className="text-gray-700 dark:text-gray-300">
              {error.details || config.description}
            </p>
          </div>

          {/* Suggested Action */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <IconInfoCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                Suggested Action
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {error.suggestedAction || config.suggestedAction}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {config.retryable && onRetry && (
              <Button
                onClick={onRetry}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <IconRefresh className="w-4 h-4 mr-2" />
                Retry Payment
              </Button>
            )}
            {onTryAlternative && (
              <Button
                onClick={onTryAlternative}
                variant="outline"
                className="flex-1"
              >
                <IconCreditCard className="w-4 h-4 mr-2" />
                Try Alternative Method
              </Button>
            )}
          </div>

          {/* Support Section */}
          {(showLiveSupport || onContactSupport) && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <IconPhone className="w-4 h-4" />
                  <span>Need help? Our support team is available 24/7</span>
                </div>
                {onContactSupport && (
                  <Button
                    onClick={onContactSupport}
                    variant="outline"
                  >
                    Contact Support
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Provider Info */}
          {error.provider && (
            <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
              Payment processed via {error.provider}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderCompact = () => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-xl border-2 ${config.bgColor} border-${config.color.replace('text-', '')}`}
    >
      <div className="flex items-start gap-3">
        <div className={config.color}>{config.icon}</div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 dark:text-white">
            {config.title}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {error.details || config.description}
          </p>
          {config.retryable && onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderInline = () => (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${config.bgColor}`}>
      <div className={config.color}>{config.icon}</div>
      <span className="text-gray-700 dark:text-gray-300">
        {config.title}
      </span>
      {config.retryable && onRetry && (
        <button
          onClick={onRetry}
          className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
        >
          Retry
        </button>
      )}
    </div>
  );

  if (variant === 'compact') return renderCompact();
  if (variant === 'inline') return renderInline();
  return renderFull();
}

// Helper function to determine error type from API response
export function getPaymentErrorFromResponse(response: any): PaymentError | null {
  if (!response) return null;

  // Map common error codes to our error types
  const errorMap: Record<string, PaymentErrorType> = {
    'card_declined': 'bank_declined',
    'insufficient_funds': 'insufficient_funds',
    'expired_card': 'card_expired',
    'invalid_cvc': 'invalid_cvv',
    'invalid_zip': 'invalid_zip',
    'fx_timeout': 'fx_timeout',
    'fx_unavailable': 'fx_rate_unavailable',
    '3ds_failed': '3ds_failed',
    '3ds_timeout': '3ds_timeout',
    'network_error': 'network_error',
    'gateway_down': 'payment_gateway_down',
    'invalid_payment_method': 'payment_method_invalid',
    'unsupported_currency': 'currency_not_supported',
    'invalid_amount': 'amount_invalid',
  };

  const errorCode = response.code || response.error_code || response.type;
  const errorType = errorMap[errorCode] || 'generic_error';

  return {
    type: errorType,
    code: errorCode,
    message: response.message || response.error_message || 'An error occurred',
    details: response.details,
    retryable: ERROR_CONFIGS[errorType].retryable,
    suggestedAction: ERROR_CONFIGS[errorType].suggestedAction,
    provider: response.provider,
  };
}

// Hook for handling payment errors
export function usePaymentErrorHandler() {
  const [error, setError] = React.useState<PaymentError | null>(null);

  const handleError = (errorResponse: any) => {
    const paymentError = getPaymentErrorFromResponse(errorResponse);
    setError(paymentError);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError,
  };
}
