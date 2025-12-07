import { usePage } from '@inertiajs/react';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    permissions?: string[];
}

export function useAuth() {
    const { auth } = usePage().props as { auth: { user: AuthUser } };
    const user = auth?.user;
    const permissions = user?.permissions ?? [];

    const can = (permission: string): boolean => permissions.includes(permission);
    const canAny = (perms: string[]): boolean => perms.some(p => permissions.includes(p));
    const canAll = (perms: string[]): boolean => perms.every(p => permissions.includes(p));

    return { user, can, canAny, canAll, isAuthenticated: !!user };
}
