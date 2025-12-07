import * as React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextareaFieldProps extends React.ComponentProps<'textarea'> {
    label?: string;
    error?: string;
    helperText?: string;
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
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
                <textarea
                    id={inputId}
                    ref={ref}
                    className={cn(
                        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex min-h-[120px] w-full rounded-2xl border bg-transparent px-5 py-3.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none',
                        error && 'border-destructive',
                        className
                    )}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    {...props}
                />
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
TextareaField.displayName = 'TextareaField';

export { TextareaField };
export type { TextareaFieldProps };
