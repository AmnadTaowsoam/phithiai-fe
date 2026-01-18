import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency, formatDate, getInitials } from '@/lib/utils';
import { Booking } from '@/types';

interface RecentBookingsProps {
  bookings: Booking[];
}

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  confirmed: 'success',
  pending_deposit: 'warning',
  completed: 'default',
  cancelled: 'error',
  disputed: 'error',
};

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={booking.user?.avatar} />
                  <AvatarFallback>
                    {getInitials(
                      `${booking.user?.firstName} ${booking.user?.lastName}`
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {booking.user?.firstName} {booking.user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {booking.vendor?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(booking.eventDate)}
                  </p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-semibold">
                  {formatCurrency(booking.total)}
                </p>
                <Badge variant={statusColors[booking.status] || 'default'}>
                  {booking.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

