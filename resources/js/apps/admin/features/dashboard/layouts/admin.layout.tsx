import { PropsWithChildren } from 'react';
import { AdminSidebar } from '@/apps/admin/features/dashboard/components/admin-sidebar';
import { AdminHeader } from '@/apps/admin/features/dashboard/components/admin-header';

interface AdminLayoutProps extends PropsWithChildren {
    title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <AdminSidebar />

            <div className="lg:pl-72">
                <AdminHeader title={title} />
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
