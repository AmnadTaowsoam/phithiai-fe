# Getting Started with malAI Admin Portal

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- Yarn package manager
- Access to malAI Admin Service API

### Installation

1. **Navigate to admin directory**
   ```bash
   cd D:\Malai\frontend\admin
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Create environment file**
   ```bash
   # Create .env.local from example
   copy .env.local.example .env.local
   ```

4. **Configure environment variables**
   
   Edit `.env.local` and update the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_ADMIN_API_URL=http://localhost:3014/admin
   NEXT_PUBLIC_WS_URL=ws://localhost:3000
   ```

5. **Run development server**
   ```bash
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to: `http://localhost:4000`

## 🎨 Features Overview

### ✅ Implemented

- ✅ Modern, responsive dashboard with metrics
- ✅ User management (list, search, suspend/activate)
- ✅ Vendor management (approve, reject, verify)
- ✅ Booking monitoring
- ✅ Dispute resolution interface
- ✅ Pricing rules management
- ✅ Feature flags control
- ✅ Analytics with charts
- ✅ Settings page
- ✅ Beautiful UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ API client setup
- ✅ Responsive design

### 🎯 Mock Data

Currently, all pages use mock data for demonstration. To connect to real API:

1. Update `lib/api-client.ts` with your authentication logic
2. Replace mock data in each page with API calls
3. Update types in `types/index.ts` to match your API

Example:
```typescript
// Current (mock data)
const mockUsers = [...];

// Replace with API call
const { data } = await apiClient.get('/admin/users');
const users = data;
```

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Platform metrics, charts, recent bookings |
| Users | `/users` | User management and search |
| Vendors | `/vendors` | Vendor approval and management |
| Bookings | `/bookings` | All bookings monitoring |
| Disputes | `/disputes` | Dispute resolution |
| Pricing | `/pricing` | Take-rate and pricing rules |
| Feature Flags | `/feature-flags` | Feature rollout control |
| Analytics | `/analytics` | Platform insights |
| Settings | `/settings` | Admin profile and preferences |

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: 'hsl(var(--primary))',  // Purple by default
  // ... add your colors
}
```

### Components

All UI components are in `components/ui/` and follow Shadcn UI patterns.

### Constants

Update `config/constants.ts` for:
- Status badges
- Category labels
- Zone names
- Event types

## 🔐 Authentication

The admin portal requires authentication:

1. Configure OIDC in `.env.local`
2. Admin users need proper roles/permissions
3. Tokens are stored in localStorage
4. Unauthorized requests redirect to login

## 📊 API Integration

### Current Setup

```typescript
// lib/api-client.ts
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
  // ... config
});
```

### Making API Calls

```typescript
import apiClient from '@/lib/api-client';

// GET request
const response = await apiClient.get('/admin/users');

// POST request
const response = await apiClient.post('/admin/vendors/:id/approve', {
  reason: 'Verified documents',
});
```

## 🛠️ Development Tips

1. **Hot Reload**: Changes auto-reload in dev mode
2. **Type Safety**: Use TypeScript types for all data
3. **Linting**: Run `yarn lint` before committing
4. **Type Check**: Run `yarn type-check` to verify types

## 📦 Build & Deploy

```bash
# Build for production
yarn build

# Start production server
yarn start

# Or use a platform like Vercel
vercel deploy
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Change port in package.json or use:
yarn dev -p 4001
```

### Module not found
```bash
yarn install
```

### Type errors
```bash
yarn type-check
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)

## 🤝 Support

For issues or questions:
1. Check existing documentation
2. Review API documentation
3. Contact development team

---

**Happy Coding! 🎉**

