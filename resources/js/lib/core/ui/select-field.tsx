import * as React from 'react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

const SelectField = React.memo(({
    options,
    value,
    onChange,
    placeholder = 'Sélectionner...',
    label,
    error,
    helperText,
    disabled,
    required,
    className,
}: SelectFieldProps) => {
    const inputId = React.useId();

    return (
        <div className="space-y-2">
            {label && (
                <Label htmlFor={inputId}>
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            )}
            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger
                    id={inputId}
                    className={cn(error && 'border-destructive', className)}
                    aria-invalid={!!error}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {(error || helperText) && (
                <p className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});
SelectField.displayName = 'SelectField';

export { SelectField };
export type { SelectFieldProps };
