# 🎨 Phithiai Platform

Phithiai Platform's client-facing applications for ceremony planning, vendor discovery, and booking management.

## 📁 Applications

### 🌐 Web App (`web/`)
Main customer-facing web application built with Next.js

**Features:**
- 🏠 Landing page with hero section and platform overview
- 📅 **Planning Tools** (`/plan`) - AI-powered ceremony planning with:
  - ฤกษ์ยาม (Auspicious date calculator)
  - งบประมาณ (Budget estimator with location-based pricing)
  - เช็กลิสต์ (Checklist generator)
- 🔍 Vendor discovery and filtering (`/vendors`, `/vendors/[slug]`)
- 📖 Lookbook and inspiration gallery (`/lookbook`, `/lookbook/[slug]`)
- 🎭 Signature experiences showcase (`/experiences`)
- 🤖 AI-powered insights and recommendations (`/intelligence`)
- 📞 Help center and support (`/help`)
- 💎 Trust and compliance information (`/trust`)
- 📰 Press and media resources (`/press`, `/media`)

**Tech Stack:**
- Next.js 14.2.3 (App Router)
- React 18.3.1
- TypeScript 5.4.5
- Tailwind CSS 3.4.3
- Framer Motion 11.0.10
- Zod 3.23.8 (validation)

**Quick Start:**
```bash
cd frontend/web
npm install
npm run dev
# Visit http://localhost:3000
```

**Build:**
```bash
npm run build
npm start
```

**Recent Updates:**
- ✅ Enhanced `/plan` page with comprehensive planning tools
- ✅ Added location-based budget calculations (province/district/subdistrict)
- ✅ Integrated 13 event types, 5 planning modes, 4 event levels, 13 venue types
- ✅ Dynamic dropdowns for Thailand locations
- ✅ API integration ready (currently using mock data)
- ✅ Persistent navbar and footer across all pages
- ✅ Fixed all TypeScript and ESLint errors
- ✅ Build successful with no errors

---

### 🎛️ Admin Dashboard (`admin/`)
Operational console for internal teams and administrators

**Features:**
- 📊 Dashboard with key metrics and KPIs
- 👥 User management
- 🏢 Vendor management and approval
- 📋 Booking oversight
- 💰 Payment tracking
- 🔔 Notification management
- ⚙️ System settings and configuration

**Tech Stack:**
- Next.js 14.2.3
- React 18.3.1
- TypeScript
- Tailwind CSS
- Custom admin components

**Quick Start:**
```bash
cd frontend/admin
npm install
npm run dev
# Visit http://localhost:3001
```

---

### 💬 LINE LIFF App (`liff/`)
LINE mini-app for chat-based interactions and quick access

**Features:**
- Quick inquiry submission
- Booking status check
- Vendor recommendations
- Payment shortcuts
- Event reminders

**Status:** 🚧 In Development

**Quick Start:**
```bash
cd frontend/liff
npm install
npm run dev
```

---

### 📱 Mobile App (`mobile/`)
Native mobile application (React Native / Expo)

**Status:** 📋 Planned (Placeholder)

---

## 🎨 Design System

### Color Palette
- **Brand Colors:** Amber gradients with emerald accents
- **Background:** Dark-first with `ink-950` base
- **Text:** Ivory (`text-ivory`) for primary content
- **Glassmorphism:** Subtle backdrop blur with border overlays

### Typography
- **Primary Font:** Sarabun (Thai)
- **Secondary Font:** Inter Variable (English)
- **Display Font:** Playfair Display, Charm

### Components
- Dark-themed UI with glassmorphism effects
- Gradient buttons with hover animations (Framer Motion)
- Badge system for tags and labels
- Card layouts with subtle borders
- Responsive design (mobile-first)

---

## 🔌 API Integration

### Current Status
- ✅ Frontend UI complete
- ✅ Mock API layer implemented (`lib/api/planning-api.ts`)
- ⏳ Ready to connect to Backend APIs

### Backend Endpoints
The web app is ready to integrate with the following Planning Service APIs:

**Basic Data:**
- `GET /api/event-types` - Event types
- `GET /api/planning-modes` - Planning modes
- `GET /api/event-levels` - Event levels
- `GET /api/venue-types` - Venue types

**Locations:**
- `GET /api/locations/provinces` - Provinces
- `GET /api/locations/districts?province=xxx` - Districts
- `GET /api/locations/subdistricts?district=xxx` - Subdistricts

**Tools:**
- `POST /api/tools/auspicious` - Calculate auspicious dates
- `POST /api/tools/budget` - Estimate budget
- `POST /api/tools/checklist` - Generate checklist

### How to Connect
Replace mock API calls in `lib/api/planning-api.ts`:

```typescript
// Before (Mock)
static async getEventTypes() {
  return Promise.resolve([...mockData]);
}

// After (Real API)
static async getEventTypes() {
  const response = await fetch(`${API_BASE_URL}/api/event-types`);
  const data = await response.json();
  return data.eventTypes;
}
```

---

## 🚀 Development Guide

### Prerequisites
- Node.js >= 18.17.0
- npm or yarn

### Environment Variables
Create `.env.local` in each app directory:

```bash
# Web App
NEXT_PUBLIC_API_URL=http://localhost:3005
NEXT_PUBLIC_GATEWAY_URL=http://localhost:3000

# Admin Dashboard
NEXT_PUBLIC_API_URL=http://localhost:3005
NEXT_PUBLIC_ADMIN_API_URL=http://localhost:3006
```

### Common Commands

**Development:**
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

**Testing:**
```bash
npm test          # Run tests
npm run test:e2e  # Run E2E tests
```

---

## 📂 Directory Structure

```
frontend/
├── web/                    # Main web app
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Homepage
│   │   ├── plan/           # Planning tools ⭐
│   │   ├── vendors/        # Vendor discovery
│   │   ├── lookbook/       # Inspiration gallery
│   │   ├── experiences/    # Signature experiences
│   │   ├── intelligence/   # AI insights
│   │   └── ...
│   ├── components/         # Reusable components
│   │   ├── layout/         # Layout components
│   │   ├── sections/       # Page sections
│   │   └── ui/             # UI components
│   ├── lib/                # Utilities and helpers
│   │   ├── api/            # API clients
│   │   └── utils.ts        # Utility functions
│   ├── styles/             # Global styles
│   └── public/             # Static assets
│
├── admin/                  # Admin dashboard
│   ├── app/                # Admin pages
│   ├── components/         # Admin components
│   └── ...
│
├── liff/                   # LINE LIFF app
├── mobile/                 # Mobile app (placeholder)
└── README.md              # This file
```

---

## 🎯 Key Features

### Planning Tools (`/plan`)
The crown jewel of the platform! 👑

**3 Powerful Tabs:**
1. **ฤกษ์ยาม (Auspicious Time)**
   - Calculate lucky dates for ceremonies
   - 5 planning modes (astrology, moderate, simple, convenience, custom)
   - Birth date/time/place input for accuracy
   - Partner birth information support

2. **งบประมาณ (Budget)**
   - Location-based budget estimation
   - Province/district/subdistrict selection
   - 4 event levels (budget, standard, premium, luxury)
   - 13 venue types
   - Detailed cost breakdown

3. **เช็กลิสต์ (Checklist)**
   - Custom checklist generation
   - Timeline planning
   - Task categorization
   - Priority management

---

## 🔧 Technical Decisions

- **Framework:** Next.js 14 with App Router for optimal performance
- **Styling:** Tailwind CSS with custom design tokens
- **Animation:** Framer Motion for smooth transitions
- **Validation:** Zod for runtime type safety
- **State Management:** React hooks + local state
- **API Layer:** Custom API client with mock data support
- **Type Safety:** Full TypeScript coverage

---

## 📝 Recent Changes

### Latest Updates (2024)
- ✅ Planning page (`/plan`) complete with all features
- ✅ Location-based planning (provinces/districts/subdistricts)
- ✅ 13 event types, 5 planning modes, 4 event levels, 13 venue types
- ✅ Dynamic dropdowns with cascading selection
- ✅ Backend API integration wired to every service (planning v1, bookings, payments, guests, notifications, media, AI, compliance)
- ✅ Fixed all build errors and TypeScript issues
- ✅ Persistent navbar and footer
- ✅ Improved accessibility and UX
- ✅ Added LIFF (`/liff`) and Mobile (`/mobile`) preview screens that exercise guest RSVP/check-in and booking/payment flows using the shared API clients

---

## 🐛 Known Issues

- ⚠️ Some `<img>` tags should be replaced with Next.js `<Image />` component
- ⚠️ Mock data needs to be replaced with real API calls
- ⚠️ E2E tests need to be added

---

## 📚 Documentation

- **Architecture:** `../docs/architecture.md`
- **Feature Specs:** `../docs/feature-specs.md`
- **Development Guide:** `../docs/development-guide.md`
- **API Design:** `../docs/api-design.md`
- **Tech Stack:** `../docs/tech-stack.md`

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test thoroughly
3. Run linter: `npm run lint`
4. Build to verify: `npm run build`
5. Commit with meaningful message
6. Create pull request

---

## 📄 License

Copyright © 2024 Phithiai Platform. All rights reserved.

---

## 💬 Support

For questions or issues:
- 📧 Email: support@phithiai.com
- 💬 Slack: #frontend-dev
- 📖 Docs: https://docs.phithiai.com

---

**Made with ❤️ by the Phithiai Team**
