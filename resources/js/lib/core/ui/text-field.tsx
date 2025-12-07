import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextFieldProps extends React.ComponentProps<'input'> {
    label?: string;
    error?: string;
    helperText?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
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
                <Input
                    id={inputId}
                    ref={ref}
                    className={cn(error && 'border-destructive', className)}
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
TextField.displayName = 'TextField';

export { TextField };
export type { TextFieldProps };
