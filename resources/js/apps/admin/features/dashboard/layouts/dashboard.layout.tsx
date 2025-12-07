import { PropsWithChildren } from 'react';
import { AdminLayout } from './admin.layout';

interface DashboardLayoutProps extends PropsWithChildren {
    title?: string;
    actions?: React.ReactNode;
}

export function DashboardLayout({ children, title, actions }: DashboardLayoutProps) {
    return (
        <AdminLayout title={title}>
            <div className="space-y-6">
                {(title || actions) && (
                    <div className="flex items-center justify-between">
                        {title && <h1 className="text-2xl font-bold">{title}</h1>}
                        {actions && <div className="flex items-center gap-3">{actions}</div>}
                    </div>
                )}
                {children}
            </div>
        </AdminLayout>
    );
}
