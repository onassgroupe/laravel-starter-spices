import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface NumberFieldProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'onChange'> {
    label?: string;
    error?: string;
    helperText?: string;
    value?: number;
    onChange?: (value: number | undefined) => void;
    min?: number;
    max?: number;
    step?: number;
}

const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
    ({ className, label, error, helperText, required, id, value, onChange, min, max, step, ...props }, ref) => {
        const inputId = id || React.useId();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (val === '') {
                onChange?.(undefined);
            } else {
                const num = parseFloat(val);
                if (!isNaN(num)) {
                    onChange?.(num);
                }
            }
        };

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
                    type="number"
                    value={value ?? ''}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
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
NumberField.displayName = 'NumberField';

export { NumberField };
export type { NumberFieldProps };
