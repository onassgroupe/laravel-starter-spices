import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CheckboxFieldProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}

const CheckboxField = React.forwardRef<HTMLButtonElement, CheckboxFieldProps>(
    ({ checked = false, onChange, label, description, error, disabled, className }, ref) => {
        const inputId = React.useId();

        return (
            <div className={cn('flex items-start gap-3', className)}>
                <Checkbox
                    ref={ref}
                    id={inputId}
                    checked={checked}
                    onCheckedChange={onChange}
                    disabled={disabled}
                    aria-invalid={!!error}
                    className={cn(error && 'border-destructive')}
                />
                {(label || description) && (
                    <div className="space-y-1">
                        {label && (
                            <Label htmlFor={inputId} className="cursor-pointer">
                                {label}
                            </Label>
                        )}
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                )}
            </div>
        );
    }
);
CheckboxField.displayName = 'CheckboxField';

export { CheckboxField };
export type { CheckboxFieldProps };
