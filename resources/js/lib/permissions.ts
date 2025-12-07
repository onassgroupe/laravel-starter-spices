import { usePage } from '@inertiajs/react';

export function usePermissions() {
    const { auth } = usePage().props as any;
    const permissions = auth?.permissions ?? [];

    const can = (permission: string): boolean => {
        return permissions.includes(permission);
    };

    const canAny = (perms: string[]): boolean => {
        return perms.some((p) => permissions.includes(p));
    };

    const canAll = (perms: string[]): boolean => {
        return perms.every((p) => permissions.includes(p));
    };

    return { can, canAny, canAll, permissions };
}
