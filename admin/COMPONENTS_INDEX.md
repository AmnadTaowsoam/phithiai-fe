# Components Index

รายการ Components ทั้งหมดที่สร้างไว้ใน Admin Portal

## 📂 UI Components (`components/ui/`)

### Basic Components

#### `button.tsx`
```tsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

#### `card.tsx`
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

#### `badge.tsx`
```tsx
import { Badge } from '@/components/ui/badge';

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="error">Error</Badge>
```

#### `input.tsx`
```tsx
import { Input } from '@/components/ui/input';

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

#### `label.tsx`
```tsx
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

#### `avatar.tsx`
```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

#### `skeleton.tsx`
```tsx
import { Skeleton } from '@/components/ui/skeleton';

<Skeleton className="h-4 w-full" />
<Skeleton className="h-12 w-12 rounded-full" />
```

### Table Components

#### `table.tsx`
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

<Table>
  <TableCaption>A list of items</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## 📊 Dashboard Components (`components/dashboard/`)

### `stat-card.tsx`
```tsx
import { StatCard } from '@/components/dashboard/stat-card';
import { DollarSign } from 'lucide-react';

<StatCard
  title="Total Revenue"
  value={1500000}
  change={12.5}
  trend="up"
  icon={DollarSign}
  formatType="currency"
  iconColor="text-green-500"
/>

// formatType options: 'currency' | 'number' | 'percent' | 'none'
// trend options: 'up' | 'down' | 'stable'
```

### `revenue-chart.tsx`
```tsx
import { RevenueChart } from '@/components/dashboard/revenue-chart';

const data = [
  { date: 'Jan', revenue: 120000, gmv: 1200000 },
  { date: 'Feb', revenue: 150000, gmv: 1500000 },
  // ...
];

<RevenueChart data={data} />
```

### `booking-status-chart.tsx`
```tsx
import { BookingStatusChart } from '@/components/dashboard/booking-status-chart';

const data = [
  { name: 'Confirmed', value: 45, color: '#10b981' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  // ...
];

<BookingStatusChart data={data} />
```

### `recent-bookings.tsx`
```tsx
import { RecentBookings } from '@/components/dashboard/recent-bookings';

<RecentBookings bookings={bookings} />
```

## 🎨 Layout Components (`components/layout/`)

### `sidebar.tsx`
```tsx
import { Sidebar } from '@/components/layout/sidebar';

// Navigation sidebar with:
// - Logo
// - Navigation menu
// - Active page highlighting
// - Footer info
```

### `header.tsx`
```tsx
import { Header } from '@/components/layout/header';

// Top header with:
// - Search bar
// - Notification bell (with badge)
// - User menu with avatar
```

### `page-header.tsx`
```tsx
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';

<PageHeader
  title="Users"
  description="Manage all users on the platform"
  actions={
    <Button>Add User</Button>
  }
/>
```

## 🛠️ Utility Functions (`lib/utils.ts`)

```tsx
import {
  cn,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatDate,
  formatRelativeTime,
  truncate,
  getInitials,
} from '@/lib/utils';

// Combine classNames
const className = cn('text-base', isActive && 'font-bold');

// Format currency (THB)
formatCurrency(50000) // "฿50,000"

// Format number with commas
formatNumber(1234567) // "1,234,567"

// Format percentage
formatPercent(12.5, 1) // "12.5%"

// Format date
formatDate('2025-01-15') // "15 ม.ค. 2568" (Thai locale)
formatDate(new Date(), 'long') // "15 มกราคม 2568, 10:30"

// Relative time
formatRelativeTime('2025-01-15T10:00:00Z') // "2 ชั่วโมงที่แล้ว"

// Truncate text
truncate('Long text here...', 20) // "Long text here..."

// Get initials
getInitials('สมชาย ใจดี') // "สใ"
```

## 🌐 API Client (`lib/api-client.ts`)

```tsx
import apiClient from '@/lib/api-client';

// GET request
const response = await apiClient.get('/admin/users');
const users = response.data;

// POST request
const response = await apiClient.post('/admin/users', {
  email: 'user@example.com',
  firstName: 'John',
});

// PATCH request
const response = await apiClient.patch('/admin/users/123', {
  status: 'active',
});

// DELETE request
await apiClient.delete('/admin/users/123');
```

## 📋 TypeScript Types (`types/index.ts`)

```tsx
import type {
  User,
  Vendor,
  Booking,
  Dispute,
  PricingRule,
  FeatureFlag,
  DashboardMetrics,
  AdminUser,
  AdminRole,
  AuditLog,
} from '@/types';

// Example usage
const user: User = {
  id: '1',
  email: 'user@example.com',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  role: 'buyer',
  status: 'active',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
};
```

## 🎯 Constants (`config/constants.ts`)

```tsx
import {
  ROUTES,
  VENDOR_CATEGORIES,
  ZONES,
  EVENT_TYPES,
  BOOKING_STATUSES,
  DISPUTE_TYPES,
  DISPUTE_STATUSES,
  FEATURE_FLAG_STATES,
  USER_ROLES,
  USER_STATUSES,
  VENDOR_STATUSES,
} from '@/config/constants';

// Routes
ROUTES.DASHBOARD // '/dashboard'
ROUTES.USERS     // '/users'

// Categories
VENDOR_CATEGORIES.map(cat => cat.label) 
// ['สถานที่จัดงาน', 'ช่างภาพ', ...]

// Status colors
const statusColor = BOOKING_STATUSES.find(
  s => s.value === 'confirmed'
)?.color; // 'success'
```

## 🎨 Example Usage Patterns

### Loading State
```tsx
import { Skeleton } from '@/components/ui/skeleton';

{isLoading ? (
  <Skeleton className="h-12 w-full" />
) : (
  <div>Content here</div>
)}
```

### Status Badge
```tsx
import { Badge } from '@/components/ui/badge';

const statusColors = {
  active: 'success',
  pending: 'warning',
  suspended: 'error',
};

<Badge variant={statusColors[user.status]}>
  {user.status}
</Badge>
```

### Search with Icon
```tsx
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
  <Input placeholder="Search..." className="pl-10" />
</div>
```

### Data Table
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';

<Card>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map(user => (
        <TableRow key={user.id}>
          <TableCell>{user.firstName}</TableCell>
          <TableCell>{user.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Card>
```

## 🎉 All Components Ready!

ทุก Component พร้อมใช้งาน ตามตัวอย่างข้างบน!

**Happy Coding! 🚀**

