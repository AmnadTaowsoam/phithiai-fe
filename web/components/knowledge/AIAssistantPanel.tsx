'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  referenceLinks?: { title: string; path: string }[];
  isTyping?: boolean;
}

interface QuickQuestion {
  id: string;
  question: string;
  category: string;
}

const QUICK_QUESTIONS: QuickQuestion[] = [
  { id: '1', question: 'How do I process a vendor payout?', category: 'Business' },
  { id: '2', question: 'What is the RAG architecture?', category: 'AI' },
  { id: '3', question: 'How does the commission calculation work?', category: 'Business' },
  { id: '4', question: 'What is the database schema for bookings?', category: 'Database' },
  { id: '5', question: 'How do I configure the API Gateway?', category: 'Ops' },
  { id: '6', question: 'What security measures are in place?', category: 'Security' },
];

const KNOWLEDGE_BASE: Record<string, { answer: string; referenceLinks?: { title: string; path: string }[] }> = {
  'How do I process a vendor payout?': {
    answer: 'To process a vendor payout, follow these steps:\n\n1. Navigate to the Payout Management section in the Admin Dashboard\n2. Select the pending payout request\n3. Verify the service completion status\n4. Review the payout amount (base amount minus processing fee)\n5. Click "Approve" to initiate the bank transfer\n\nThe payout will be processed within 1-2 business days. You can track the status in the Payout History.',
    referenceLinks: [
      { title: 'Payment Flow Documentation', path: '/admin/knowledge?category=business&section=payment-flow' },
      { title: 'Commission Calculation Guide', path: '/admin/knowledge?category=business&section=commission' }
    ]
  },
  'What is the RAG architecture?': {
    answer: 'RAG (Retrieval-Augmented Generation) is our AI architecture that combines:\n\n1. **Vector Database**: Stores vendor profiles and service descriptions as embeddings (1536 dimensions)\n2. **Embedding Model**: text-embedding-3-small converts user queries into vector representations\n3. **Similarity Search**: Finds the most relevant vendors based on semantic similarity\n4. **Generation**: Uses the retrieved context to provide accurate recommendations\n\nThis approach ensures our AI recommendations are always based on up-to-date vendor data.',
    referenceLinks: [
      { title: 'AI Logic Documentation', path: '/admin/knowledge?category=ai&section=rag-architecture' },
      { title: 'Vector Database Guide', path: '/admin/knowledge?category=ai&section=vector-db' }
    ]
  },
  'How does the commission calculation work?': {
    answer: 'The commission calculation follows this formula:\n\n**Platform Fee** = Base Amount × Platform Fee Rate (default 3%)\n\n**Net Amount** = Base Amount - Platform Fee\n\n**Vendor Payout** = Net Amount - Processing Fee (300 THB)\n\nExample:\n- User pays: 10,000 THB\n- Platform fee (3%): 300 THB\n- Net to escrow: 9,700 THB\n- Vendor payout: 9,400 THB\n\nAll transactions are recorded in the Commission Ledger for audit purposes.',
    referenceLinks: [
      { title: 'Commission Calculation Guide', path: '/admin/knowledge?category=business&section=commission' },
      { title: 'Ledger System Documentation', path: '/admin/knowledge?category=database&section=ledger' }
    ]
  },
  'What is the database schema for bookings?': {
    answer: 'The booking system uses several interconnected tables:\n\n**Core Tables:**\n- `bookings`: Main booking records (id, user_id, vendor_id, status, dates)\n- `booking_items`: Individual services within a booking\n- `booking_payments`: Payment transactions linked to bookings\n\n**Related Tables:**\n- `users`: Customer information\n- `vendors`: Service provider details\n- `services`: Available services catalog\n\nAll booking-related tables are partitioned by year for performance optimization.',
    referenceLinks: [
      { title: 'Database Schema Documentation', path: '/admin/knowledge?category=database&section=schema' },
      { title: 'Booking System Guide', path: '/admin/knowledge?category=business&section=bookings' }
    ]
  },
  'How do I configure the API Gateway?': {
    answer: 'The API Gateway configuration is managed through:\n\n1. **Route Definitions**: Located in `infra/api-gateway/config/routes.json`\n2. **Environment Variables**: Set in `.env` files for each environment\n3. **Rate Limiting**: Configured per service and endpoint\n\nTo update routes:\n1. Modify the routes.json file\n2. Push to the appropriate branch\n3. Deploy to the target environment\n\nThe gateway supports JWT authentication, request validation, and response caching.',
    referenceLinks: [
      { title: 'API Gateway Documentation', path: '/admin/knowledge?category=ops&section=api-gateway' },
      { title: 'Deployment Guide', path: '/admin/knowledge?category=ops&section=deployment' }
    ]
  },
  'What security measures are in place?': {
    answer: 'Our platform implements multiple security layers:\n\n**Authentication & Authorization:**\n- JWT-based authentication with refresh tokens\n- Role-based access control (RBAC)\n- Multi-factor authentication for admins\n\n**Data Security:**\n- Encryption at rest (AES-256)\n- Encryption in transit (TLS 1.3)\n- PII data masking in logs\n\n**API Security:**\n- Rate limiting per IP and user\n- Request validation and sanitization\n- SQL injection prevention via parameterized queries\n\n**Compliance:**\n- PDPA (Thailand) compliant\n- PCI DSS Level 1 for payments\n- Regular security audits',
    referenceLinks: [
      { title: 'Security Documentation', path: '/admin/knowledge?category=security&section=overview' },
      { title: 'Compliance Guide', path: '/admin/knowledge?category=security&section=compliance' }
    ]
  }
};

export function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m the Phithiai Knowledge Assistant. I can help you understand our platform\'s business logic, AI systems, database architecture, and operations. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const generateResponse = (query: string): { answer: string; referenceLinks?: { title: string; path: string }[] } => {
    // Check for exact match in knowledge base
    const exactMatch = KNOWLEDGE_BASE[query];
    if (exactMatch) {
      return exactMatch;
    }

    // Simple keyword matching for fallback
    const lowerQuery = query.toLowerCase();
    const matchingKey = Object.keys(KNOWLEDGE_BASE).find(key =>
      lowerQuery.includes(key.toLowerCase().split(' ').slice(0, 3).join(' ')) ||
      key.toLowerCase().includes(lowerQuery.split(' ').slice(0, 3).join(' '))
    );

    if (matchingKey) {
      return KNOWLEDGE_BASE[matchingKey];
    }

    // Default response
    return {
      answer: 'I\'m not sure about that specific topic. Here are some things I can help you with:\n\n• Vendor payout processing\n• RAG architecture and AI systems\n• Commission calculations\n• Database schema\n• API Gateway configuration\n• Security measures\n\nTry asking about one of these topics, or browse the Knowledge Portal for more information.',
      referenceLinks: [
        { title: 'Browse Knowledge Portal', path: '/admin/knowledge' }
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        referenceLinks: response.referenceLinks
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br /><br />')
      .replace(/\n/g, '<br />')
      .replace(/• /g, '<span class="text-brand-500">•</span> ');
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          title="Ask Phithiai Assistant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Side Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Card className="h-full border-0 rounded-none">
          <CardHeader className="border-b border-ivory-10 bg-gradient-to-r from-brand-500 to-brand-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Ask Phithiai</CardTitle>
                  <p className="text-brand-100 text-sm">Your Knowledge Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ivory-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-brand-500 text-white rounded-br-md'
                        : 'bg-white border border-ivory-10 text-ivory-900 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                    {message.referenceLinks && message.referenceLinks.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-ivory-20">
                        <p className="text-xs font-medium mb-2 opacity-80">Related Resources:</p>
                        <div className="space-y-1">
                          {message.referenceLinks.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.path}
                              className="block text-xs underline hover:no-underline opacity-90 hover:opacity-100"
                              onClick={(e) => {
                                e.preventDefault();
                                // Navigate to the knowledge page
                                window.location.href = link.path;
                              }}
                            >
                              📄 {link.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="text-xs mt-2 opacity-60">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-ivory-10 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-ivory-40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-ivory-40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-ivory-40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-ivory-10 bg-white">
                <p className="text-xs text-ivory-60 mb-2">Quick Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.slice(0, 4).map((qq) => (
                    <button
                      key={qq.id}
                      onClick={() => handleQuickQuestion(qq.question)}
                      className="px-3 py-1.5 text-xs bg-ivory-10 hover:bg-ivory-20 text-ivory-90 rounded-full transition-colors"
                    >
                      {qq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-ivory-10 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about business logic, AI, database, or operations..."
                  className="flex-1 px-4 py-3 bg-ivory-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-12 h-12 bg-brand-500 hover:bg-brand-600 disabled:bg-ivory-30 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-ivory-40 mt-2 text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
