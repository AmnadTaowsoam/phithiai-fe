'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  IconCreditCard,
  IconMapPin,
  IconShieldCheck,
  IconInfoCircle,
  IconChevronRight,
  IconCheck,
  IconLock,
  IconWorld,
  IconReceipt,
  IconTruck
} from '@tabler/icons-react';
import { useCurrency, CURRENCIES } from '../../contexts/CurrencyContext';

export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  vatRate: number;
  addressFormat: 'street-city-zip' | 'street-city-state-zip' | 'street-district-city-zip';
  requiresState: boolean;
};

export type AddressField = {
  label: string;
  placeholder: string;
  required: boolean;
};

const COUNTRIES: Country[] = [
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    currency: 'THB',
    vatRate: 7,
    addressFormat: 'street-district-city-zip',
    requiresState: false
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    vatRate: 0,
    addressFormat: 'street-city-state-zip',
    requiresState: true
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    vatRate: 20,
    addressFormat: 'street-city-zip',
    requiresState: false
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    vatRate: 8,
    addressFormat: 'street-city-zip',
    requiresState: false
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    currency: 'MYR',
    vatRate: 6,
    addressFormat: 'street-city-zip',
    requiresState: false
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    vatRate: 10,
    addressFormat: 'street-city-state-zip',
    requiresState: true
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    vatRate: 10,
    addressFormat: 'street-city-zip',
    requiresState: false
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    currency: 'CNY',
    vatRate: 13,
    addressFormat: 'street-city-zip',
    requiresState: false
  }
];

const ADDRESS_FIELDS: Record<Country['addressFormat'], AddressField[]> = {
  'street-city-zip': [
    { label: 'Street Address', placeholder: '123 Main Street', required: true },
    { label: 'City', placeholder: 'Bangkok', required: true },
    { label: 'Postal Code', placeholder: '10110', required: true }
  ],
  'street-city-state-zip': [
    { label: 'Street Address', placeholder: '123 Main Street', required: true },
    { label: 'City', placeholder: 'New York', required: true },
    { label: 'State/Province', placeholder: 'NY', required: true },
    { label: 'Postal Code', placeholder: '10001', required: true }
  ],
  'street-district-city-zip': [
    { label: 'Street Address', placeholder: '123 Sukhumvit Road', required: true },
    { label: 'District', placeholder: 'Watthana', required: true },
    { label: 'City', placeholder: 'Bangkok', required: true },
    { label: 'Postal Code', placeholder: '10110', required: true }
  ]
};

export default function InternationalCheckoutPage() {
  const { currency, setCurrency, formatPrice, convertPrice } = useCurrency();
  const [step, setStep] = useState<'location' | 'details' | 'payment' | 'review'>('location');
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [address, setAddress] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order data
  const order = {
    items: [
      { name: 'Premium Wedding Package', price: 85000, currency: 'THB' as const },
      { name: 'Photography Add-on', price: 15000, currency: 'THB' as const },
      { name: 'Floral Arrangement', price: 8000, currency: 'THB' as const }
    ],
    shipping: 0,
    discount: 0
  };

  const subtotal = order.items.reduce((sum, item) => sum + convertPrice(item.price, item.currency), 0);
  const vatAmount = subtotal * (selectedCountry.vatRate / 100);
  const total = subtotal + vatAmount + order.shipping - order.discount;

  // Update currency when country changes
  useEffect(() => {
    const targetCurrency = selectedCountry.currency as keyof typeof CURRENCIES;
    if (CURRENCIES[targetCurrency]) {
      setCurrency(targetCurrency);
    }
  }, [selectedCountry, setCurrency]);

  // Reset address when country changes
  useEffect(() => {
    setAddress({});
  }, [selectedCountry]);

  const addressFields = ADDRESS_FIELDS[selectedCountry.addressFormat];

  const handleAddressChange = (field: string, value: string) => {
    setAddress({ ...address, [field]: value });
  };

  const isAddressComplete = addressFields.every(field => !field.required || address[field.label]);

  const handleProceed = () => {
    if (step === 'location' && isAddressComplete) {
      setStep('details');
    } else if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('review');
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                International Checkout
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Secure checkout for global customers
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <IconLock className="w-4 h-4" />
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                {['location', 'details', 'payment', 'review'].map((s, index) => (
                  <div key={s} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                      step === s
                        ? 'bg-purple-600 text-white'
                        : ['location', 'details', 'payment', 'review'].indexOf(step) > index
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        : 'bg-green-500 text-white'
                    }`}>
                      {['location', 'details', 'payment', 'review'].indexOf(step) > index ? (
                        <IconCheck className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < 3 && (
                      <div className={`w-16 h-1 mx-2 rounded ${
                        ['location', 'details', 'payment', 'review'].indexOf(step) > index
                          ? 'bg-green-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-xs text-gray-600 dark:text-gray-400">
                <span>Location</span>
                <span>Details</span>
                <span>Payment</span>
                <span>Review</span>
              </div>
            </div>

            {/* Step 1: Location */}
            {step === 'location' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <IconMapPin className="w-6 h-6 text-purple-600" />
                  Delivery Location
                </h2>

                {/* Country Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => setSelectedCountry(country)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          selectedCountry.code === country.code
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{country.flag}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {country.code}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {country.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address Form */}
                <div className="space-y-4">
                  {addressFields.map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <input
                        type="text"
                        value={address[field.label] || ''}
                        onChange={(e) => handleAddressChange(field.label, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>

                {/* Currency Notice */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <IconWorld className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-medium">
                        Currency automatically updated
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Prices are now displayed in {CURRENCIES[selectedCountry.currency as keyof typeof CURRENCIES]?.name}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProceed}
                  disabled={!isAddressComplete}
                  className="mt-6 w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue to Details
                  <IconChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 'details' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <IconReceipt className="w-6 h-6 text-purple-600" />
                  Order Details
                </h2>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Original: {formatPrice(item.price, item.currency)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatPrice(item.price, item.currency)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep('location')}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProceed}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <IconChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <IconCreditCard className="w-6 h-6 text-purple-600" />
                  Payment Method
                </h2>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                        <IconCreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900 dark:text-white">Credit Card</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Visa, Mastercard, Amex
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <IconCreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900 dark:text-white">PayPal</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Fast and secure
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Card Form (simplified) */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep('details')}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProceed}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Review Order
                    <IconChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === 'review' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <IconShieldCheck className="w-6 h-6 text-purple-600" />
                  Review Your Order
                </h2>

                {/* Order Summary */}
                <div className="space-y-3 mb-6">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-gray-900 dark:text-white">{item.name}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrice(item.price, item.currency)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-6">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Delivery Address
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {Object.entries(address).map(([key, value]) => `${key}: ${value}`).join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {selectedCountry.flag} {selectedCountry.name}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep('payment')}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <IconCheck className="w-5 h-5" />
                        <span>Place Order</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>

              <div className="space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(subtotal, 'THB')}
                  </span>
                </div>

                {/* VAT/Tax */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      VAT/Tax ({selectedCountry.vatRate}%)
                    </span>
                    <button className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline mt-1">
                      <IconInfoCircle className="w-3 h-3" />
                      <span>Why this amount?</span>
                    </button>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(vatAmount, 'THB')}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconTruck className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  </div>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
                  </span>
                </div>

                {/* Discount */}
                {order.discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Discount</span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      -{formatPrice(order.discount)}
                    </span>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatPrice(total, 'THB')}
                  </span>
                </div>

                {/* Currency Notice */}
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    Prices displayed in {CURRENCIES[currency]?.name} ({currency})
                  </p>
                </div>
              </div>

              {/* VAT Breakdown Tooltip */}
              {selectedCountry.vatRate > 0 && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <IconInfoCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        VAT/Tax Breakdown
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {selectedCountry.name} charges a {selectedCountry.vatRate}% VAT on all services.
                        This amount is collected on behalf of local tax authorities.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
