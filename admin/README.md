# phithiai Admin Portal

Admin dashboard for managing the phithiai event platform.

## 🚀 Features

- **Dashboard**: Overview of platform metrics, GMV, revenue, bookings, and user statistics
- **User Management**: View and manage all users (buyers, vendors, admins)
- **Vendor Management**: Approve/reject vendors, verify accounts, manage vendor profiles
- **Bookings**: Monitor all bookings, manage status actions, and drill into guest/payment details
- **Disputes**: Resolve disputes between users and vendors
- **Pricing Rules**: Configure take-rate and pricing strategies
- **Feature Flags**: Control feature rollouts and A/B testing
- **Analytics**: Platform insights with interactive charts and metrics
- **Settings**: Admin profile and system configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Charts**: Recharts
- **State Management**: Zustand
- **API Client**: Axios
- **Package Manager**: Yarn

## 📦 Installation

```bash
# Install dependencies
yarn install

# Copy environment variables
cp .env.local.example .env.local

# Update .env.local with your configuration
# NEXT_PUBLIC_API_URL=http://localhost:3000/api
# NEXT_PUBLIC_ADMIN_API_URL=http://localhost:3014/admin
```

## 🏃 Development

```bash
# Run development server (default port: 4000)
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Type check
yarn type-check

# Lint code
yarn lint
```

The admin portal will be available at: `http://localhost:4000`

## 📁 Project Structure

```
admin/
├── app/                      # Next.js App Router
│   ├── (dashboard)/         # Dashboard layout group
│   │   ├── dashboard/       # Dashboard page
│   │   ├── users/           # User management
│   │   ├── vendors/         # Vendor management
│   │   ├── bookings/        # Bookings management + detail flows
│   │   ├── disputes/        # Disputes resolution
│   │   ├── pricing/         # Pricing rules
│   │   ├── feature-flags/   # Feature flags
│   │   ├── analytics/       # Analytics
│   │   └── settings/        # Settings
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home (redirects to dashboard)
│
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── stat-card.tsx
│   │   ├── revenue-chart.tsx
│   │   ├── booking-status-chart.tsx
│   │   └── recent-bookings.tsx
│   ├── layout/              # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── page-header.tsx
│   └── ui/                  # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── table.tsx
│       ├── input.tsx
│       ├── avatar.tsx
│       ├── skeleton.tsx
│       └── label.tsx
│
├── lib/
│   ├── utils.ts             # Utility functions
│   └── api-client.ts        # API client configuration
│
├── types/
│   └── index.ts             # TypeScript type definitions
│
├── config/
│   └── constants.ts         # App constants and configurations
│
├── styles/
│   └── globals.css          # Global styles
│
└── hooks/                   # Custom React hooks
```

## 🎨 Design System

### Colors

The admin portal uses a professional purple-pink gradient theme:

- **Primary**: Purple (#8b5cf6)
- **Secondary**: Pink (#ec4899)
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red

### Components

All UI components follow the Shadcn UI design system with Tailwind CSS for styling.

## 🔐 Authentication

The admin portal uses SSO/OIDC for authentication:

1. Configure OIDC settings in `.env.local`
2. Admin users must have appropriate roles and permissions
3. JWT tokens are stored in localStorage
4. Unauthorized access redirects to login page

## 📊 API Integration

The admin portal communicates with the Admin Service (Port 3014):

```typescript
// Example API call
import apiClient from '@/lib/api-client';

const response = await apiClient.get('/admin/users');
const users = response.data;
```

API endpoints are defined in the Admin Service documentation.

## 🌐 Pages Overview

### Dashboard
- Platform metrics (GMV, Revenue, Bookings, Users, Vendors)
- Revenue charts
- Booking status distribution
- Recent bookings list

### Users
- List all users with search and filters
- View user details
- Suspend/activate user accounts
- Filter by role and status

### Vendors
- List all vendors
- Approve/reject pending vendors
- Verify vendor accounts
- View vendor details and reviews

### Bookings
- Monitor all bookings
- View booking details
- Filter by status, event type, and date
- Track payment milestones

### Disputes
- View all disputes
- Assign disputes to admins
- Resolve disputes with notes
- Track dispute status

### Pricing
- Manage take-rate rules
- Configure pricing strategies
- Set promotional discounts
- Define rule filters

### Feature Flags
- Control feature rollouts
- Toggle feature states (OFF/BETA/ON)
- Configure segment targeting
- Manage A/B tests

### Analytics
- User growth trends
- Revenue by category
- Conversion funnel
- KPI metrics

### Settings
- Admin profile management
- Notification preferences
- Security settings
- System configuration

## 🎯 Best Practices

1. **Code Organization**: Keep components small and focused
2. **Type Safety**: Use TypeScript types for all data
3. **Error Handling**: Handle API errors gracefully
4. **Loading States**: Show loading indicators for async operations
5. **Accessibility**: Follow WCAG guidelines
6. **Performance**: Optimize images and lazy load components

## 🚧 Future Enhancements

- [ ] Real-time notifications via WebSocket
- [ ] Advanced filtering and sorting
- [ ] Bulk operations
- [ ] Export data to CSV/Excel
- [ ] Advanced analytics with custom date ranges
- [ ] User activity logs
- [ ] Role-based permissions UI
- [ ] Dark mode toggle
- [ ] Multi-language support

## 📝 Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ADMIN_API_URL=http://localhost:3014/admin
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# Authentication
NEXTAUTH_URL=http://localhost:4000
NEXTAUTH_SECRET=your-secret-here
OIDC_ISSUER=your-oidc-issuer
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret

# Feature Flags
NEXT_PUBLIC_ENABLE_DEBUG=false
```

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for all new code
3. Follow Tailwind CSS conventions
4. Test on multiple screen sizes
5. Update documentation as needed

## 📄 License

Proprietary - phithiai Platform

---

**Admin Portal Version**: 1.0.0  
**Last Updated**: January 2025
