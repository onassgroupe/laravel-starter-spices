import { cn } from '@/lib/core/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon?: LucideIcon;
    className?: string;
}

export function StatsCard({ title, value, change, changeLabel, icon: Icon, className }: StatsCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <div className={cn(
            'relative p-6 rounded-2xl overflow-hidden',
            'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl',
            'border border-white/20 dark:border-gray-700/50',
            'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
            'hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300',
            className
        )}>
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                    {change !== undefined && (
                        <div className="flex items-center gap-1.5">
                            {isPositive && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
                            <span className={cn(
                                'text-sm font-medium',
                                isPositive && 'text-green-500',
                                isNegative && 'text-red-500'
                            )}>
                                {isPositive && '+'}{change}%
                            </span>
                            {changeLabel && (
                                <span className="text-sm text-muted-foreground">{changeLabel}</span>
                            )}
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className="p-3 rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                )}
            </div>
        </div>
    );
}
