import { useForm } from '@inertiajs/react';
import { TextField, PasswordField, CheckboxField } from '@/lib/core/ui';
import { LoginCredentials } from '../types/auth.types';

interface LoginFormProps {
    onSubmit?: () => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const { data, setData, post, processing, errors } = useForm<LoginCredentials>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', { onSuccess: onSubmit });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
                required
                autoComplete="email"
            />

            <PasswordField
                label="Mot de passe"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
                required
                autoComplete="current-password"
            />

            <CheckboxField
                checked={data.remember}
                onChange={(checked) => setData('remember', checked)}
                label="Se souvenir de moi"
            />

            <button
                type="submit"
                disabled={processing}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50"
            >
                {processing ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
    );
}
