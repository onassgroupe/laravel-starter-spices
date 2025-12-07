import { useForm } from '@inertiajs/react';
import { TextField, PasswordField } from '@/lib/core/ui';
import { RegisterData } from '../types/auth.types';

interface RegisterFormProps {
    onSubmit?: () => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
    const { data, setData, post, processing, errors } = useForm<RegisterData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', { onSuccess: onSubmit });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
                label="Nom"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
                required
                autoComplete="name"
            />

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
                autoComplete="new-password"
            />

            <PasswordField
                label="Confirmer le mot de passe"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
                required
                autoComplete="new-password"
            />

            <button
                type="submit"
                disabled={processing}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50"
            >
                {processing ? 'Inscription...' : "S'inscrire"}
            </button>
        </form>
    );
}
