import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn, formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  formatType?: 'currency' | 'number' | 'percent' | 'none';
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = 'stable',
  icon: Icon,
  formatType = 'none',
  iconColor = 'text-primary',
}: StatCardProps) {
  const formattedValue =
    formatType === 'currency'
      ? formatCurrency(Number(value))
      : formatType === 'number'
      ? formatNumber(Number(value))
      : formatType === 'percent'
      ? formatPercent(Number(value))
      : value;

  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn('h-4 w-4', iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        {change !== undefined && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
            <TrendIcon
              className={cn(
                'h-3 w-3',
                trend === 'up' && 'text-green-500',
                trend === 'down' && 'text-red-500'
              )}
            />
            <span
              className={cn(
                trend === 'up' && 'text-green-500',
                trend === 'down' && 'text-red-500'
              )}
            >
              {change > 0 ? '+' : ''}
              {formatPercent(change, 1)}
            </span>
            <span>from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

