'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FlowNode {
  id: string;
  title: string;
  description: string;
  details?: string[];
  icon?: string;
}

interface FlowData {
  id: string;
  title: string;
  nodes: FlowNode[];
  connections: { from: number; to: number; label?: string }[];
}

const paymentFlow: FlowData = {
  id: 'payment',
  title: 'Payment to Commission to Payout',
  nodes: [
    {
      id: 'payment-received',
      title: 'Payment Received',
      description: 'User pays 10,000 THB via PromptPay/Card',
      details: [
        'Payment Gateway: PromptPay/Stripe',
        'Transaction ID: TXN-2026-001234',
        'Status: Completed',
        'Processing Time: ~2 seconds'
      ],
      icon: '💳'
    },
    {
      id: 'calculate-commission',
      title: 'Calculate Commission',
      description: 'Platform fee: 3% = 300 THB',
      details: [
        'Base Amount: 10,000 THB',
        'Platform Fee: 3% (300 THB)',
        'Net Amount: 9,700 THB',
        'Commission Ledger Entry Created'
      ],
      icon: '🧮'
    },
    {
      id: 'transfer-escrow',
      title: 'Transfer to Escrow',
      description: '9,700 THB to escrow account',
      details: [
        'Escrow Account: ESC-TH-001',
        'Hold Period: 24 hours',
        'Release Condition: Service completion',
        'Security: Double-entry bookkeeping'
      ],
      icon: '🔒'
    },
    {
      id: 'vendor-payout',
      title: 'Vendor Payout',
      description: '9,400 THB to vendor bank account',
      details: [
        'Payout Method: Bank Transfer',
        'Processing Fee: 300 THB',
        'Vendor Bank: KBANK',
        'Estimated Arrival: 1-2 business days'
      ],
      icon: '💰'
    }
  ],
  connections: [
    { from: 0, to: 1, label: 'Process' },
    { from: 1, to: 2, label: 'Hold' },
    { from: 2, to: 3, label: 'Release' }
  ]
};

const searchFlow: FlowData = {
  id: 'search',
  title: 'User Search to AI Recommendation to Match Score',
  nodes: [
    {
      id: 'user-search',
      title: 'User Searches',
      description: 'User enters: "Thai wedding venue in Bangkok"',
      details: [
        'Query: "Thai wedding venue in Bangkok"',
        'Filters: Budget 50k-100k, Date: Dec 2026',
        'Search Type: Semantic + Keyword',
        'Response Time: <500ms'
      ],
      icon: '🔍'
    },
    {
      id: 'ai-recommendation',
      title: 'AI Recommendation',
      description: 'RAG retrieves top 5 matching vendors',
      details: [
        'Embedding Model: text-embedding-3-small',
        'Vector DB: Pinecone (1536 dimensions)',
        'Results: 5 vendors retrieved',
        'Reranking: Cross-encoder applied'
      ],
      icon: '🤖'
    },
    {
      id: 'match-score',
      title: 'Match Score Calculation',
      description: 'Category: 100%, Price: 80%, Location: 90%, Rating: 85%',
      details: [
        'Category Match: 100% (Thai Wedding)',
        'Price Match: 80% (within budget)',
        'Location Match: 90% (Bangkok)',
        'Rating Match: 85% (4.2/5.0)',
        'Final Score: 88.75%'
      ],
      icon: '📊'
    }
  ],
  connections: [
    { from: 0, to: 1, label: 'Retrieve' },
    { from: 1, to: 2, label: 'Score' }
  ]
};

export function BusinessFlowChart() {
  const [activeFlow, setActiveFlow] = useState<'payment' | 'search'>('payment');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState<number>(0);

  const currentFlowData = activeFlow === 'payment' ? paymentFlow : searchFlow;

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const nextStep = () => {
    if (currentStep < currentFlowData.nodes.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setExpandedNodes(new Set());
  };

  return (
    <Card className="border-r border-ivory-15 bg-background/70">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Interactive Business Flows</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFlow('payment')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFlow === 'payment'
                  ? 'bg-brand-500 text-white'
                  : 'bg-ivory-10 text-ivory-90 hover:bg-ivory-20'
              }`}
            >
              Payment Flow
            </button>
            <button
              onClick={() => setActiveFlow('search')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFlow === 'search'
                  ? 'bg-brand-500 text-white'
                  : 'bg-ivory-10 text-ivory-90 hover:bg-ivory-20'
              }`}
            >
              Search Flow
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Flow Controls */}
        <div className="px-6 pb-4 flex items-center justify-between border-b border-ivory-10">
          <div className="flex items-center gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-lg bg-ivory-10 text-ivory-90 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ivory-20 transition-all text-sm font-medium"
            >
              ← Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === currentFlowData.nodes.length - 1}
              className="px-4 py-2 rounded-lg bg-brand-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-600 transition-all text-sm font-medium"
            >
              Next →
            </button>
            <button
              onClick={resetFlow}
              className="px-4 py-2 rounded-lg bg-ivory-10 text-ivory-90 hover:bg-ivory-20 transition-all text-sm font-medium"
            >
              Reset
            </button>
          </div>
          <div className="text-sm text-ivory-60">
            Step {currentStep + 1} of {currentFlowData.nodes.length}
          </div>
        </div>

        {/* Flow Visualization */}
        <div className="p-6">
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-ivory-10 -translate-y-1/2 hidden md:block" />
            
            {/* Flow Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
              {currentFlowData.nodes.map((node, index) => {
                const isActive = index === currentStep;
                const isPast = index < currentStep;
                const isFuture = index > currentStep;
                const isExpanded = expandedNodes.has(node.id);

                return (
                  <div key={node.id} className="relative">
                    {/* Node Card */}
                    <div
                      onClick={() => toggleNode(node.id)}
                      className={`
                        relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                        ${isActive 
                          ? 'border-brand-500 bg-brand-50 shadow-lg scale-105' 
                          : isPast 
                            ? 'border-green-500 bg-green-50 opacity-75' 
                            : isFuture 
                              ? 'border-ivory-20 bg-white opacity-50' 
                              : 'border-ivory-20 bg-white'
                        }
                      `}
                    >
                      {/* Status Indicator */}
                      <div className={`
                        absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${isActive 
                          ? 'bg-brand-500 text-white' 
                          : isPast 
                            ? 'bg-green-500 text-white' 
                            : 'bg-ivory-30 text-ivory-60'
                        }
                      `}>
                        {isPast ? '✓' : index + 1}
                      </div>

                      {/* Icon */}
                      <div className="text-3xl mb-2 text-center">
                        {node.icon}
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-semibold text-ivory-900 text-center mb-1">
                        {node.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-ivory-60 text-center">
                        {node.description}
                      </p>

                      {/* Expand Indicator */}
                      <div className="mt-2 text-center">
                        <span className={`text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && node.details && (
                        <div className="mt-3 pt-3 border-t border-ivory-10">
                          <ul className="space-y-1">
                            {node.details.map((detail, idx) => (
                              <li key={idx} className="text-xs text-ivory-70 flex items-start gap-1">
                                <span className="text-brand-500">•</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Connection Arrow (between nodes) */}
                    {index < currentFlowData.nodes.length - 1 && (
                      <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs
                          ${index < currentStep ? 'bg-green-500 text-white' : 'bg-ivory-20 text-ivory-60'}
                        `}>
                          →
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flow Progress Bar */}
          <div className="mt-8">
            <div className="h-2 bg-ivory-10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / currentFlowData.nodes.length) * 100}%`
                }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-ivory-60">
              <span>Start</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Connection Labels */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentFlowData.connections.map((conn, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-ivory-10 rounded-full">
                  <div className={`w-2 h-2 rounded-full ${conn.from < currentStep ? 'bg-green-500' : 'bg-ivory-30'}`} />
                  <span className="text-xs text-ivory-70">{conn.label}</span>
                  <div className={`w-2 h-2 rounded-full ${conn.to <= currentStep ? 'bg-green-500' : 'bg-ivory-30'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
