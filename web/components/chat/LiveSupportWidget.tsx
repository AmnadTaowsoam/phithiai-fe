'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconMessage,
  IconX,
  IconSend,
  IconPhone,
  IconMail,
  IconClock,
  IconUser,
  IconAlertCircle,
  IconCheck,
  IconDots,
  IconChevronUp,
} from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface SupportMessage {
  id: string;
  sender: 'user' | 'support';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface LiveSupportWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  supportEmail?: string;
  supportPhone?: string;
  supportHours?: string;
  initialMessage?: string;
  onSendMessage?: (message: string) => Promise<void>;
  context?: 'payment' | 'general' | 'technical';
  variant?: 'full' | 'compact' | 'floating';
}

const DEFAULT_SUPPORT_HOURS = '24/7';
const DEFAULT_SUPPORT_EMAIL = 'support@phithiai.com';
const DEFAULT_SUPPORT_PHONE = '+66 2 123 4567';

export function LiveSupportWidget({
  isOpen,
  onClose,
  supportEmail = DEFAULT_SUPPORT_EMAIL,
  supportPhone = DEFAULT_SUPPORT_PHONE,
  supportHours = DEFAULT_SUPPORT_HOURS,
  initialMessage,
  onSendMessage,
  context = 'general',
  variant = 'floating',
}: LiveSupportWidgetProps) {
  const [message, setMessage] = useState(initialMessage || '');
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (isOpen && initialMessage) {
      setMessage(initialMessage);
    }
  }, [isOpen, initialMessage]);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    const userMessage: SupportMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);
    setMessage('');

    // Simulate support agent typing
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const supportMessage: SupportMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'support',
          content: getAutoResponse(message, context),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, supportMessage]);
        setIsSending(false);
      }, 1500);
    }, 500);

    if (onSendMessage) {
      try {
        await onSendMessage(message);
      } catch (err) {
        console.error('Failed to send message:', err);
        setIsSending(false);
      }
    }
  };

  const getAutoResponse = (userMessage: string, ctx: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (ctx === 'payment') {
      if (lowerMessage.includes('declined') || lowerMessage.includes('failed')) {
        return 'I understand your payment was declined. This could be due to insufficient funds, an expired card, or security measures from your bank. Would you like me to help you try a different payment method?';
      }
      if (lowerMessage.includes('error') || lowerMessage.includes('problem')) {
        return 'I apologize for the inconvenience. Let me help you resolve this issue. Could you please provide the error message you received?';
      }
      return 'I can help you with your payment. Is there anything specific about the payment process you need assistance with?';
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'I am here to help! What can I assist you with today?';
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'I can provide information about our pricing and any available discounts. Would you like to know more?';
    }
    if (lowerMessage.includes('subscription') || lowerMessage.includes('plan')) {
      return 'I can help you with subscription upgrades, downgrades, or plan changes. What would you like to do?';
    }

    return 'Thanks for reaching out! How can I assist you today?';
  };

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const renderFull = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <IconMessage className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Live Support</CardTitle>
                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <IconClock className="w-4 h-4" />
                  <span>{supportHours} support available</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <IconX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-[60vh] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl inline-block">
                  <IconMessage className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Start a conversation with our support team
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl rounded-bl-none'
                } p-4`}>
                  {msg.isTyping ? (
                    <div className="flex items-center gap-2">
                      <IconDots className="w-4 h-4 animate-pulse" />
                      <span className="text-sm">Support agent is typing...</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {msg.sender === 'support' ? (
                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                              <IconUser className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                          ) : (
                            <div className="p-1.5 bg-white dark:bg-gray-600 rounded-full">
                              <IconUser className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </div>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {msg.sender === 'user' ? 'You' : 'Support'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
            {/* Context Badge */}
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                {context === 'payment' ? 'Payment Support' : context === 'technical' ? 'Technical Support' : 'General Support'}
              </span>
              {isTyping && (
                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <IconDots className="w-4 h-4 animate-pulse" />
                  Support agent is typing...
                </span>
              )}
            </div>

            {/* Contact Options */}
            <div className="mb-3 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <a href={`mailto:${supportEmail}`} className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <IconMail className="w-4 h-4" />
                <span>{supportEmail}</span>
              </a>
              <a href={`tel:${supportPhone}`} className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <IconPhone className="w-4 h-4" />
                <span>{supportPhone}</span>
              </a>
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                disabled={isSending}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isSending}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isSending ? (
                  <>
                    <IconDots className="w-4 h-4 animate-pulse" />
                  </>
                ) : (
                  <>
                    <IconSend className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderCompact = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 w-80"
    >
      <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <IconMessage className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">Support</span>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <IconChevronUp className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
          </button>
        </CardHeader>
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="p-3">
                {/* Quick Contact Options */}
                <div className="space-y-2 mb-3">
                  <a
                    href={`mailto:${supportEmail}`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <IconMail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{supportEmail}</span>
                  </a>
                  <a
                    href={`tel:${supportPhone}`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <IconPhone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{supportPhone}</span>
                  </a>
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    disabled={isSending}
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isSending}
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    <IconSend className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );

  const renderFloating = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="relative">
            {/* Main Button */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <IconMessage className="w-5 h-5" />
              <span className="font-medium">Live Support</span>
              {messages.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {messages.length}
                </span>
              )}
            </button>

            {/* Minimized Panel */}
            <AnimatePresence>
              {isMinimized && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full right-0 mb-2 w-72"
                >
                  <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                    <CardHeader className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                          <IconMessage className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">Support</span>
                      </div>
                      <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <IconX className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </CardHeader>
                    <CardContent className="p-3">
                      {/* Quick Contact */}
                      <div className="flex gap-2 mb-3">
                        <a
                          href={`mailto:${supportEmail}`}
                          className="flex-1 items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                        >
                          <IconMail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </a>
                        <a
                          href={`tel:${supportPhone}`}
                          className="flex-1 items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                        >
                          <IconPhone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </a>
                      </div>
                      {/* Message Input */}
                      <div className="flex gap-2">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Type a message..."
                          disabled={isSending}
                          className="flex-1 text-sm"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim() || isSending}
                          className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
                        >
                          <IconSend className="w-4 h-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (variant === 'compact') return renderCompact();
  if (variant === 'floating') return renderFloating();
  return renderFull();
}
