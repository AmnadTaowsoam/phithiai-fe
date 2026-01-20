'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown, IconWorld, IconCheck } from '@tabler/icons-react';
import { useCurrency, CURRENCIES, Currency } from '../../contexts/CurrencyContext';

interface CurrencySwitcherProps {
  showLabel?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
}

export default function CurrencySwitcher({ showLabel = false, variant = 'default' }: CurrencySwitcherProps) {
  const { currency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currentCurrency = CURRENCIES[currency];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
          variant === 'compact' ? 'px-2 py-1.5 text-sm' :
          variant === 'minimal' ? 'px-2 py-1 text-xs' :
          'px-4 py-2'
        }`}
      >
        {variant !== 'minimal' && <IconWorld className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
        <span className="text-lg">{currentCurrency.flag}</span>
        <span className={`font-medium text-gray-900 dark:text-white ${
          variant === 'minimal' ? 'text-xs' : 'text-sm'
        }`}>
          {currency}
        </span>
        {showLabel && (
          <span className={`text-gray-600 dark:text-gray-400 ${
            variant === 'compact' ? 'text-xs hidden sm:inline' :
            variant === 'minimal' ? 'hidden' :
            'text-sm'
          }`}>
            {currentCurrency.name}
          </span>
        )}
        <IconChevronDown
          className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            >
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                  Select Currency
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {currencies.map((code) => {
                    const currencyInfo = CURRENCIES[code];
                    const isSelected = code === currency;

                    return (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{currencyInfo.flag}</span>
                          <div className="text-left">
                            <div className="font-medium">{code}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {currencyInfo.name}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <IconCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  Exchange rates updated in real-time
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
