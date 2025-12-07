import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps extends Omit<React.ComponentProps<'input'>, 'type'> {
    label?: string;
    error?: string;
    helperText?: string;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
    ({ className, label, error, helperText, required, id, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
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
                    <Input
                        id={inputId}
                        ref={ref}
                        type={showPassword ? 'text' : 'password'}
                        className={cn('pr-10', error && 'border-destructive', className)}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
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
PasswordField.displayName = 'PasswordField';

export { PasswordField };
export type { PasswordFieldProps };
