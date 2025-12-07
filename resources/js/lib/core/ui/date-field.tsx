import * as React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

interface DateFieldProps extends Omit<React.ComponentProps<'input'>, 'type'> {
    label?: string;
    error?: string;
    helperText?: string;
}

const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
    ({ className, label, error, helperText, required, id, ...props }, ref) => {
        const inputId = id || React.useId();

        return (
            <div className="space-y-2">
                {label && (
                    <Label htmlFor={inputId}>
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                )}
                <div className="relative">
                    <input
                        id={inputId}
                        ref={ref}
                        type="date"
                        className={cn(
                            'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-12 w-full min-w-0 rounded-full border bg-transparent px-5 py-3.5 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                            '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer',
                            error && 'border-destructive',
                            className
                        )}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        {...props}
                    />
                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                </div>
                {(error || helperText) && (
                    <p
                        id={error ? `${inputId}-error` : undefined}
                        className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);
DateField.displayName = 'DateField';

export { DateField };
export type { DateFieldProps };
