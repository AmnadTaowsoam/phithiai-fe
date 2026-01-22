'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessFlowChart } from '@/components/knowledge/BusinessFlowChart';
import { AIAssistantPanel } from '@/components/knowledge/AIAssistantPanel';

export default function KnowledgePortalPage() {
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  // Static documentation content for Phase 14
  const API_GUIDE_CONTENT = `# API Reference Guide

## Overview

The Phithiai Platform uses a microservices architecture with each service exposing RESTful APIs.

## Base URLs

| Environment | Base URL |
|-------------|-----------|
| Production | https://api.phithiai.com |
| Staging | https://staging-api.phithiai.com |
| Development | http://localhost:3000 |

## Authentication

All protected endpoints require authentication via JWT Bearer token:

Authorization: Bearer <token>

## Common Response Format

### Success Response

\`\`\`json
{
  "data": { ... },
  "meta": {
    "requestId": "req-123456",
    "timestamp": "2026-01-21T12:00:00Z"
  }
}
\`\`\`

### Error Response

\`\`\`json
{
  "error": {
    "type": "https://api.phithiai.com/errors/validation-error",
    "title": "Validation Error",
    "status": 400,
    "detail": "Invalid request parameters"
  }
}
\`\`\`

## Services

### Matching Service

**Base Path**: \`/api/matches\`

#### Find Matching Vendors

\`\`\`
POST /api/matches
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventType": "WEDDING_THAI",
  "categories": ["VENUE", "CATERING"],
  "budget": 500000
}
\`\`\`

### Quote Service

**Base Path**: \`/api/quotes\`

#### Create Quote

\`\`\`
POST /api/quotes
Authorization: Bearer <token>
Content-Type: application/json

{
  "buyerId": "cm1buyer123",
  "vendorId": "cm1vendor123",
  "items": [
    {
      "name": "Venue Rental",
      "quantity": 1,
      "unitPrice": 150000
    }
  ]
}
\`\`\`

### Payment Service

**Base Path**: \`/api/payments\`

#### Create Escrow Account

\`\`\`
POST /api/payments/escrow
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookingId": "cm1booking123",
  "vendorId": "cm1vendor123",
  "currency": "THB"
}
\`\`\`

### AI Service

**Base Path**: \`/api/ai\`

#### Query Knowledge Base (RAG)

\`\`\`
POST /api/ai/rag/query
Authorization: Bearer <token>
Content-Type: application/json

{
  "question": "What are the steps in a Thai wedding ceremony?"
}
\`\`\`

## Rate Limiting

| Endpoint | Rate Limit | Time Window |
|----------|-------------|
| /api/matches | 100 requests | 1 hour |
| /api/quotes | 200 requests | 1 hour |
| /api/ai/rag/query | 30 requests | 1 hour |
| /api/vision/analyze | 20 requests | 1 hour |
`;

const AI_LOGIC_CONTENT = `# AI Logic "Under the Hood" Guide

## Overview

The Phithiai Platform uses multiple AI-powered services to provide intelligent features.

## Semantic Search (RAG)

### How It Works

RAG (Retrieval-Augmented Generation) combines vector similarity search with LLM generation to provide accurate, contextual answers about Thai ceremonies.

User Question → Generate Embedding → Vector Search → Retrieve Context → LLM Generation → Answer

### Architecture

1. **Embedding Generation**: OpenAI text-embedding-ada-002 (1536 dimensions)
2. **Vector Search**: PostgreSQL pgvector for O(log n) similarity queries
3. **Context Building**: Retrieved documents joined with separators
4. **LLM Generation**: GPT-4 with Thai system prompts

### Similarity Threshold

0.7 (cosine distance < 0.3)

## Token Guard

### Token Budget Configuration

| Tier | Daily Budget | Hourly Limit |
|-------|--------------|-----------------|
| Free | 50,000 tokens | 20,000 tokens |
| Premium | 500,000 tokens | 200,000 tokens |
| Enterprise | Custom |

### Cost Monitoring

- GPT-4: ~$0.045 per 1K tokens
- GPT-3.5-turbo: ~$0.00175 per 1K tokens
- Embeddings: ~$0.0001 per 1K tokens

## Matching Algorithm

### Multi-Factor Scoring

| Factor | Default Weight | Description |
|--------|---------------|-------------|
| Category Match | 30% | Exact or related vendor category |
| Price | 25% | Budget alignment |
| Rating | 25% | Average rating with confidence penalty |
| Location | 15% | Province/zone proximity |
| Availability | 15% | Available on event date |
| Vector Similarity | 20% | Semantic match (optional) |

### Boosts

- Verified vendor: +10%
- High rating (≥4.5, ≥10 reviews): +5%

## Vision AI - Ceremony Recognition

### Thai Wedding Phases

| Phase | Thai Name | English | Description |
|-------|-----------|----------|-------------|
| Khan Maak | ขันหมาก | Groom's procession |
| Rod Nam Sang | พิธีรดน้ำสังข์ | Water pouring ceremony |
| Sai Monkhon | พิธีสาดมนต์ | White thread ceremony |

### Emotion Detection

| Emotion | Thai Name | Description |
|---------|-----------|-------------|
| Joy | ยินดี | Happy/joyful |
| Solemn | เคร่งขรัม | Serious/dignified |
| Reverent | เคารพ | Respectful |
| Celebratory | เฉลิมฉลอง | Celebrating |
| Serene | สงบ | Peaceful/calm |
| Emotional | อารมณ์ | Touching/emotional |
`;

const DATABASE_SCHEMA_CONTENT = `# Database Schema Visual Map

## Overview

The Phithiai Platform uses PostgreSQL with microservices architecture. Each service has its own database schema.

## Key Design Principles

1. **Microservice Isolation**: Each service owns its schema
2. **Horizontal Scaling**: Partitioned tables for high-volume data
3. **Vector Search**: pgvector for AI/RAG
4. **Double-Entry Bookkeeping**: Ledger + AccountBalance for financial integrity
5. **Idempotency**: IdempotencyKey table for safe retries

## Core Tables

### User Service

\`\`\`
User (users)
├── id: String (CUID, PK)
├── email: String (unique, indexed)
├── role: Role (BUYER | VENDOR | ADMIN)
├── status: UserStatus (ACTIVE | SUSPENDED | DELETED)
└── totalCredits: Int (default: 0)
\`\`\`

### Booking Service

\`\`\`
Booking (bookings)
├── id: String (CUID, PK)
├── bookingNumber: String (unique)
├── buyerId: String (FK → User.id)
├── vendorId: String (FK → Vendor.id)
├── status: BookingStatus (indexed)
└── total: Float (default: 0)
\`\`\`

### Payment Service

\`\`\`
AccountBalance (account_balances)
├── id: String (CUID, PK)
├── entityType: String (USER | VENDOR | ESCROW | PLATFORM)
├── entityId: String
├── balance: Decimal (20, 8 precision)
└── UNIQUE: (entityType, entityId, currency)
\`\`\`

## Cross-Service Relationships

\`\`\`
User.id → Booking.buyerId
Vendor.id → Booking.vendorId
User.id → MatchingRequest.userId
\`\`\`

## Partitioning Strategy

Transaction logs are partitioned by date for performance:

\`\`\`sql
-- Booking History partitioning
CREATE TABLE booking_history (
    id VARCHAR(25) PRIMARY KEY,
    booking_id VARCHAR(25) NOT NULL,
    action VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at);
\`\`\`

## Indexing Strategy

Critical indexes for query performance:

- \`users(email, role, status)\`
- \`bookings(buyer_id, vendor_id, status, event_date)\`
- \`account_balances(entity_type, entity_id, currency)\`
`;

const BUSINESS_FLOW_CONTENT = `# Business Flow Documentation

## Payment Flow

The payment process follows a secure escrow-based model:

1. **Payment Received**: User pays via PromptPay or Card
2. **Calculate Commission**: Platform fee (3%) is calculated
3. **Transfer to Escrow**: Net amount is held in escrow for 24 hours
4. **Vendor Payout**: After service completion, funds are released to vendor

### Example Transaction

- User pays: 10,000 THB
- Platform fee (3%): 300 THB
- Net to escrow: 9,700 THB
- Vendor payout: 9,400 THB (after 300 THB processing fee)

## Search & Match Flow

The vendor recommendation process:

1. **User Searches**: User enters query with filters
2. **AI Recommendation**: RAG retrieves top matching vendors
3. **Match Score**: Multi-factor scoring determines relevance

### Scoring Factors

- Category Match: 30%
- Price Alignment: 25%
- Rating: 25%
- Location: 15%
- Availability: 15%
- Vector Similarity: 20%
`;

const OPS_CONTENT = `# Operations Guide

## API Gateway Configuration

The API Gateway routes requests to appropriate microservices:

### Route Definitions

Routes are defined in \`infra/api-gateway/config/routes.json\`

### Rate Limiting

Per-service rate limits protect against abuse:
- Matching: 100 requests/hour
- Quotes: 200 requests/hour
- AI RAG: 30 requests/hour

## Deployment

### CI/CD Pipeline

1. Code pushed to main branch
2. Automated tests run
3. Docker images built and pushed
4. Kubernetes deployment updated
5. Health checks verified

### Environment Variables

Critical environment variables:
- \`DATABASE_URL\`: PostgreSQL connection string
- \`JWT_SECRET\`: JWT signing key
- \`OPENAI_API_KEY\`: OpenAI API access
- \`STRIPE_SECRET_KEY\`: Payment processing
`;

const SECURITY_CONTENT = `# Security & Compliance

## Authentication & Authorization

### JWT-Based Authentication

- Access tokens: 15 minutes expiration
- Refresh tokens: 7 days expiration
- Secure storage: HttpOnly cookies

### Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| BUYER | Book services, view bookings |
| VENDOR | Manage services, view payouts |
| ADMIN | Full system access |

## Data Security

### Encryption

- At rest: AES-256
- In transit: TLS 1.3
- PII masking in logs

### PCI DSS Compliance

- Level 1 compliant for payment processing
- Tokenized card data
- Regular security audits

## PDPA Compliance (Thailand)

- Explicit consent for data collection
- Data subject rights implementation
- Breach notification procedures
- Data retention policies
`;

  const allSections = [
    {
      id: 'identity-api',
      title: 'API Reference Guide',
      category: 'identity',
      content: API_GUIDE_CONTENT,
      tags: ['api', 'rest', 'endpoints', 'documentation'],
    },
    {
      id: 'ai-rag',
      title: 'Semantic Search (RAG)',
      category: 'ai',
      content: AI_LOGIC_CONTENT,
      tags: ['ai', 'rag', 'vector', 'search'],
    },
    {
      id: 'ai-matching',
      title: 'Matching Algorithm',
      category: 'ai',
      content: AI_LOGIC_CONTENT,
      tags: ['ai', 'matching', 'algorithm', 'scoring'],
    },
    {
      id: 'ai-vision',
      title: 'Vision AI - Ceremony Recognition',
      category: 'ai',
      content: AI_LOGIC_CONTENT,
      tags: ['ai', 'vision', 'ceremony', 'recognition'],
    },
    {
      id: 'ai-token-guard',
      title: 'Token Guard - Cost Protection',
      category: 'ai',
      content: AI_LOGIC_CONTENT,
      tags: ['ai', 'cost', 'protection', 'budgeting'],
    },
    {
      id: 'business-flows',
      title: 'Business Flow Documentation',
      category: 'business',
      content: BUSINESS_FLOW_CONTENT,
      tags: ['business', 'flow', 'payment', 'search'],
    },
    {
      id: 'database-users',
      title: 'User Service Schema',
      category: 'database',
      content: DATABASE_SCHEMA_CONTENT,
      tags: ['database', 'users', 'schema'],
    },
    {
      id: 'database-bookings',
      title: 'Booking Service Schema',
      category: 'database',
      content: DATABASE_SCHEMA_CONTENT,
      tags: ['database', 'bookings', 'schema'],
    },
    {
      id: 'database-payments',
      title: 'Payment Service Schema',
      category: 'database',
      content: DATABASE_SCHEMA_CONTENT,
      tags: ['database', 'payments', 'schema', 'financial'],
    },
    {
      id: 'database-ledger',
      title: 'Ledger & Account Balance',
      category: 'database',
      content: DATABASE_SCHEMA_CONTENT,
      tags: ['database', 'ledger', 'accounting', 'financial'],
    },
    {
      id: 'database-indexing',
      title: 'Indexing & Partitioning Strategy',
      category: 'database',
      content: DATABASE_SCHEMA_CONTENT,
      tags: ['database', 'indexing', 'partitioning', 'performance'],
    },
    {
      id: 'ops-gateway',
      title: 'API Gateway Configuration',
      category: 'ops',
      content: OPS_CONTENT,
      tags: ['ops', 'gateway', 'routing', 'configuration'],
    },
    {
      id: 'ops-deployment',
      title: 'Deployment Guide',
      category: 'ops',
      content: OPS_CONTENT,
      tags: ['ops', 'deployment', 'cicd', 'kubernetes'],
    },
    {
      id: 'security-auth',
      title: 'Authentication & Authorization',
      category: 'security',
      content: SECURITY_CONTENT,
      tags: ['security', 'auth', 'jwt', 'rbac'],
    },
    {
      id: 'security-data',
      title: 'Data Security & Encryption',
      category: 'security',
      content: SECURITY_CONTENT,
      tags: ['security', 'encryption', 'pci-dss', 'pdpa'],
    },
  ];

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSections = searchQuery
    ? allSections.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allSections;

  const activeSection = allSections.find(s => s.id === activeSectionId);

  // Scroll to active section on change
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Format markdown content to HTML
  const formatMarkdown = (content: string) => {
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-ivory-900 mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-ivory-900 mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-ivory-900 mt-6 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-ivory-10 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-ivory-10 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="min-h-screen bg-background/60">
      {/* AI Assistant Panel */}
      <AIAssistantPanel />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ivory mb-2">
            Knowledge Portal
          </h1>
          <p className="text-lg text-ivory-70 mb-6">
            Comprehensive documentation for Phithiai Platform architecture, APIs, AI systems, and database.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-ivory-20 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 bg-white"
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Interactive Business Flow Chart */}
        <div className="mb-8">
          <BusinessFlowChart />
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ivory-900 mb-3">
                Documentation
              </h3>
              <div className="space-y-2">
                {allSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSectionId(section.id);
                      scrollToSection(section.id);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSectionId === section.id
                        ? 'bg-brand-500 text-white'
                        : 'bg-ivory-5 text-ivory-90 hover:bg-brand-500/5'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeSection ? (
              <Card className="mb-6" id={`section-${activeSection.id}`}>
                <CardHeader>
                  <CardTitle>{activeSection.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {activeSection.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-brand-500/10 text-brand-200 text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="prose prose-slate max-w-none text-ivory-700 p-6">
                    <div dangerouslySetInnerHTML={{ __html: formatMarkdown(activeSection.content) }} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6">
                <CardContent className="p-8 text-center text-ivory-60">
                  <p className="text-lg mb-4">Select a section to view</p>
                  <p className="text-sm">
                    Use the sidebar to browse documentation by category.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
